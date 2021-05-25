const express = require('express');
const Post = require('../models/posts');
const router = express.Router();

//Get all posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message: err});
    }

});

//Submit Post
router.post('/', async(req, res) => {
    console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        user: req.body.user
    });

    try{
        const savePost = await post.save();
        res.json(savePost)
    }catch(err){
        message: err
    }
    

    // .then(data => {
    //     res.json(data)
    // })
    // .catch(err => {
    //     res.json({message: err})
    // });

});

//Get Specific posts
router.get('/:postId', async(req, res)=> {
    console.log(req.params.postId);
    try{
        const search = await Post.findById(req.params.postId);
        res.json(search);
    }catch(err){
        res.json({message: err});
    }
    
});

//Delete Post
router.delete('/:postId', async (req, res) => {
    try{
        const deletePost = await Post.remove({_id: req.params.postId});
        res.json(deletePost);
    }catch(err){
        res.json({message: err});
    }
});

//Update Post Title
router.patch('/title/:postId', async (req, res) => {
    try{
        const patchPost = await Post.updateOne(
            {_id: req.params.postId}, 
            {$set: {title: req.body.title}
        });
        res.json(patchPost);
    }catch(err){
        res.json({message: err});
    }
});

//Update Post description
router.patch('/desc/:postId', async(req, res) =>{
    try{
        const patchDesc = await Post.updateOne({
            _id: req.params.postId
        },
        {
            $set: {description: req.body.description}
        });
    }catch (err){
        res.json({message: err});
    }
});

module.exports = router;