const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Amazing = mongoose.model('Amazing');

router.get('/', (req, res)=>{
    res.render("amazing/addOrEdit",{
        viewTitle : "Insert Amazing"
    })
});

router.post('/', (req, res) => {
    if (req.body._id == ''){
        insertRecord(req, res);
    } else{
        updateRecord(req, res);
    }
});

function updateRecord(req, res) {
    Amazing.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, docs)=>{
        if (!err) {
            res.redirect('amazing/list')
        } else {
            if (err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("amazing/addOrEdit",{
                    viewTitle: "Update Amazing",
                    amazing: req.body
                });
            }else {
                console.log('Error During Record Update :' + err)
            }
        }
    })
}

function insertRecord(req, res) {
    var amazing = new Amazing();
    amazing.code_product = req.body.code_product;
    amazing.name_store = req.body.name_store;
    amazing.name_product = req.body.name_product;
    amazing.price = req.body.price;
    amazing.save((err, doc) =>{
        if (!err)
            res.redirect('amazing/list');
        else {
            if (err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("amazing/addOrEdit", {
                    viewTitle : "Insert Amazing",
                    amazing : req.body
                })
            }else
                console.log("Error During Insertion :" + err)
        }
    })
}

router.get('/list', (req, res) => {   // Membuat Mapping
    Amazing.find( (err, docs) =>{
        if (!err){
            res.render("amazing/list",{
                list : docs
            })
        }else {
            console.log("Error Ketika Menuju Amazing List :" + err)
        }
    })
})

function handleValidationError(err, body) {
    for (field in err.errors){
        switch (err.errors[field].path) {
            case 'code_product' :
                body['code_productError'] = err.errors[field].message;
                break;
            case 'name_store' :
                body['name_storeError'] = err.errors[field].message;
                break;
            case 'name_product' :
                body['name_productError'] = err.errors[field].message;
                break;
            case 'price' :
                body['priceError'] = err.errors[field].message;
                break;
            default :
                break;
        }
    }
}



router.get('/:id', (req, res) =>{ // Untuk GET / Ambil Data
    Amazing.findById(req.params.id, (err, docs) => {
        if (!err){
            res.render('amazing/addOrEdit',{
                viewTitle : "Update Amazing.Com",
                amazing : docs
            })
        }
    })
})

router.get('/delete/:id', (req, res)=>{
    Amazing.findByIdAndRemove(req.params.id, (err, docs) =>{
        if (!err){
            res.redirect('/amazing/list');
        } else {
            console.log("Error Saat Menghapus Data :" + err)
        }
    })
})



module.exports = router;