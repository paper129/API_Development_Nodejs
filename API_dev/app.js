const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const postRoute = require('./routes/posts');
const userRoute = require('./routes/user');
const favRoute = require('./routes/favourite');

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postRoute);
app.use('/user', userRoute);
app.use('/favs', favRoute);


//Routing
app.get('/', (req, res) => {
    res.send('API Running');
});


//DB Connection
mongoose.connect('mongodb+srv://node_api:leslie_node_hk@cluster0.8shwb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
{ useUnifiedTopology: true },
{useNewUrlParser: true},
() => console.log('Connected to DB')
);

//Listen
app.listen(3000);