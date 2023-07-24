const express = require('express');
const router = express.Router();
const Student = require('../models/students')

// get route
router.get('/', (req, res) => {
    res.send('Hello from the ROOT');
});

// create new students
// app.post('/students', (req, res) => {
    
//     const user = new Student(req.body);
//     user.save().then( () => {
//         return res.status(201).send(user);
//     }).catch( (e) => {
//         return res.status(400).send(e);
//     });
//     console.log(req.body);
// });

// create new students using async await
router.post('/students', async(req, res) => {
    
    try {
        const user = new Student(req.body);
        const createNewUser = await user.save();
        return res.status(201).send(createNewUser);
    } catch (e) {
        return res.status(400).send(e);
    }
});

// read the data of registered students
router.get('/students', async(req, res) => {

    try {
        const studentsData = await Student.find();
        return res.send(studentsData);
    } catch (e) {
        return res.send(e);
    }
});

// read an individual student data
router.get('/students/:id', async(req, res) => {

    try {
        // to find a student by phoneNO and also change the route to /:phone
        // const phoneNO = req.params.phone;
        // const studentData = await Student.findOne({
        //     "phone": phoneNO
        // });
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        if(!studentData) {
            return res.status(404).send();
        }
        return res.send(studentData);
    } catch(e) {
        return res.status(500).send(e);
    }
});

// patch an individual Student data
router.patch('/students/:id', async (req, res) => {

    try {
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body, { new : true });
        return res.status(200).send(updateStudent);
    } catch (e) {
        return res.status(404).send(e);
    }
});

// delete an individual student data
router.delete('/students/:id', async (req, res) => {

    try {
        const _id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(_id);
        if(!deleteStudent) {
            return res.status(404).send();
        }
        return res.send(deleteStudent);
    } catch (e) {
        return res.status(500).send(e);
    }
});

module.exports = router;