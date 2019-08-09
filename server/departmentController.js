let express = require('express');
let router = express.Router();
let Department = require('./department');

router.post('/', function(request, response){
    console.log(request.body);
    let d = new Department({name: request.body.name});
    d.save((err, dep) =>{
        if(err){
            response.status(500).send(err);
        }
        else{
            response.status(200).send(dep);
        }
    })
})

