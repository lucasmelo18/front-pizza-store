const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const department_controller = require('./departmentController');
const product_controller = require('./productController');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect(
    'mongodb://localhost:27017/http_app', 
    {useNewUrlParser: true});

app.use('/funcionarios', department_controller);
app.use('/sabores', product_controller);

app.listen(3000);