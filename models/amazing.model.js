const mongoose = require('mongoose');

var amazingSchema = new mongoose.Schema({
    code_product : {
        type : String,
        required : "This Field Is Required"
    },
    name_store :   {
        type : String,
        required: "This Field Is Required"
    },
    name_product : {
        type : String,
        required: "This Field Is Required"
    },
    price : {
        type : String,
        required: "This Field Is Required"
    }
})

mongoose.model('Amazing', amazingSchema)