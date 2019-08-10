var express = require('express');
var router = express.Router();
var Product = require('./products');

router.post('/', function(req, res) {
   let p = new Product({
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        departments: req.body.departments
    });

   p.save((err, prod) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(dep);
   })
})

router.get('/', function(req, res) {
    Department.find().exec((err, deps) => {
         if (err)
             res.status(500).send(err);
         else
             res.status(200).send(deps);
    })
})


module.exports = router;
