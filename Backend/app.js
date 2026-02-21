const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.route');



app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/users', userRoutes);
connectToDb();



app.use(cors());

app.get('/', (req,res)=>{
    res.send('Hello World')
})


module.exports= app
