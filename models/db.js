const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/AmazingDB', {useNewUrlParser : true, useUnifiedTopology: true}, (err)=>{
    if (!err){
        console.log('Connection MongoDB Berhasil')
    } else{
        console.log('Connection Error'+ err)
    } // Bikin Kondisi Tidak Error
});

require('./amazing.model')