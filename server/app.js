const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const departmentController = require('./departmentController');
const productController = require('./productController');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect(
    'mongodb://localhost:27017/http_app', 
    {useNewUrlParser: true});
    
app.use('/areas', departmentController);
app.use('/sabores', productController);

app.listen(3000);