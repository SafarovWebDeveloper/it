const { Router } = require('express');
const Schema = require('../model/user');
const bcrypt = require('bcryptjs');
const router = Router();
const jwt = require('jsonwebtoken');

router.get('/', (req,res)=>{
    res.send('Method of get');
})

router.post('/register', (req,res)=>{
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err , hash)=>{
        const db = new Schema({
        username,
        password : hash
    })
    const promise = db.save();
    promise.then(data => res.json(data))
        .catch(err => console.log(err))
    })
    
})
router.post('/authenticate', (req,res)=>{
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err , hash)=>{
        const db = new Schema({
        username,
        password : hash
    })
    const promise = db.save();
    promise.then(data => res.json(data))
        .catch(err => console.log(err))
    })
    
})
module.exports = router;