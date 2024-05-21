const express = require('express');
const router = express.Router();
const User = require('../db/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.use(express.json());

router.get('/users',async(req,res) =>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(error){
        res.status(300).send(error);
    }
    
})

router.get('/users/:id', async(req,res) => {
    try{
        const user = await User.findOne({_id: req.params.id})
        res.json(user);
    }catch(error){
        res.status(300).send(error);
    }
})

router.post('/login', async(req,res) => {
    const userfront = req.body;
    try{
        const user = await User.findOne({username: userfront.username});
        if(!user){
            res.status(400).send({message: 'Username is not existed'})
            return;
        }
        if(user.password !== userfront.password){
            res.status(400).send({message: 'Wrong password'})
            return;
        }
        jwt.sign({user}, process.env.key, {expiresIn: '1h'}, (err,token) => {
            if(err){
                res.status(500).send('Error generating token');
            }else{
                res.status(200).send({message:'login ok', token : token});
            }
        })
        

    }catch(error){
        res.status(401).send(error);
    }
})

router.get('/home', verifyToken, (req,res) => {
    const fullname = req.user;
    res.json(req.user)
})

function verifyToken(req,res,next){
    const token = req.headers['authorization'];
    if(typeof token !== 'undefined'){
        jwt.verify(token.split(' ')[1], process.env.key, (err, decoded) => {
            if(err){
                res.status(403).send('Invalid token');
            }else{
                req.user = decoded.user;
                next();
            }
        })
    }else{
        res.status(401).send('Unauthorized')
    }
}

router.post('/signup', async(req,res) => {
    const infor = req.body;
    
    try{
        const user = await User.findOne({username: infor.username});
        if(user){
            res.status(400).send('Username has been used!');
            return;
        }

        const newuser = new User(infor);
        try{
            await newuser.save()
        }catch(error){
            res.status(400).send(error)// lỗi db
        }
    }catch(error){
        res.status(400).send(error)
    }
    
    res.send('signup ok')
})



module.exports = router;