const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true,
        minlength:3
    },
    email :{
        type:String,
        required:true,
        unique: [true, 'Email ID already exists'],
        validator(value){
            if(!validator.istrue(value)) {
                throw new Error ('Invalid Email ID');
            }
        }
    },
    phone :{
        type:Number,
        min:10,
        required:true,
        unique:true
    },
    address :{
        type:String,
        required:true
    }
});

// we will create a new collection
const Student = new mongoose.model('Student', studentSchema);   

module.exports = Student;   