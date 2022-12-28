const mongoose = require('mongoose');
const dataschema = new mongoose.Schema({
    name:{type:String,required:true},
    title: {type:String,required:true,unique:true},
    image: {type:String,required:true,unique:true},
    description: {type:String,required:true,unique:true}
})
const data = mongoose.model('dataaa', dataschema);
module.exports = data;



