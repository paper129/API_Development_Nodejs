const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

//Get all users
router.get('/all', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.json({message: err});
    }

});

router.post('/signup', (req, res, next) => {
    User.find({email: req.params.email})
        .exec()
        .then(user => {
            if (user.length >= 1){
                return res.status(409).json({
                    message: "Mail Exists."
                });
            }
            else{
                bcrypt.hash(req.body.password, 8, (err, hash) => {
                    if(err) {
                        return res.status(500).json({err: err});
                    }
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            password: hash,
                            email: req.body.email
                        });
                        user
                            .save()
                            .then(result =>{res.status(201).json({message: 'User Craeted'})})
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({message: err})
                            });
                    }
                });

            }
        })
        .catch(); 
})

router.post("/login", (req, res, next) => {
    User.find({ username: req.body.username })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                username: user[0].username,
                userId: user[0]._id
              },
              "process.env.JWT_KEY",
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

router.delete("/:userId", (req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

module.exports = router;
