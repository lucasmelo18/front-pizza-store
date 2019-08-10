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


router.get('/', function(request, response){
    Department.find().exec((err, deps) =>{
        if(err){
            response.status(500).send(err);
        }
        else{
            response.status(200).send(deps);
        }
    })
})

router.delete('/:id', (req, res) =>{
    let id = req.params.id;
    Department.deleteOne({id: id}, (err) =>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send({});
        }
    })
})

router.patch('/:id', (req, res) =>{
    Department.findById(req.params.id, (err, dep) =>{
        if(err){
            res.status(500).send(err);
        }
        else if(!dep){
            res.status(404).send({});
        }
        else{
            dep.name = req.body.name;
            dep.save()
                .then((d) => res.status(200).send(d))
                .catch((e) => res.status(500).send(e));
        }
    })
})

module.exports = router;