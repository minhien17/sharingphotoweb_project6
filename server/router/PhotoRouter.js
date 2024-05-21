const express = require('express');
const router = express.Router();
const Photo = require('../db/photoModel');
const path = require('path')
router.use(express.json());

const jwt = require('jsonwebtoken');
require('dotenv').config();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.resolve(__dirname, 'D:/web/project6/src/components/images'))
    },
    filename: function (req,file,cb){
        const unique = Date.now();
        cb(null, unique + file.originalname);
    }
})
const upload = multer({storage: storage});

router.get('/',async(req,res) =>{
    res.send('photo')
})

// router.post('/test', upload.single('image'), async(req,res) =>{
//     console.log(req.body);
//     try {
//         const photo = new Photo({file_name: req.file.filename});
//         await photo.save();
//         res.status(200).send('ok')
//     } catch (error) {
//         res.status(400).send(error);
//     }
    
// } )

router.get('/newpost', verifyToken, (req,res)=>{
    const user = req.user;
    res.status(200).send(user);
})

// đăng ảnh - thông tin ảnh, user_id, 
router.post('/newpost',upload.single('image') , async(req,res)=>{
    
    //console.log(photo);

    if(req.file == null){
        res.status(400).send('You need to upload image!')
        return;
    }

    const file_name = req.file.filename
    const photo = {file_name: file_name, user_id: req.body.user_id};

    try {
        const newphoto = new Photo(photo);
        await newphoto.save();
        res.status(200).send('post ok')
        console.log('post ok')
    } catch (error) {
        res.status(400).send(error);
    }
})


router.post('/comment/:photoid',verifyToken ,async(req,res) => {
    const photoid = req.params.photoid;
    const comment = req.body;
    const userown = req.user;

    const newcomment = {comment: comment.comment, date_time: comment.date_time, user_id: userown._id};

    try {
        const photodb = await Photo.findOne({_id: photoid});// kiem tra db
        
        try{
            photodb.comments.push(newcomment);
            await photodb.save();
            console.log('comment ok')
            res.status(200).send('ok')
        }catch(error){
            res.status(400).send('Comment is not null !')
        }

    } catch (error) {
        console.log(error)
    }
})


router.get('/:id',async(req,res) =>{
    try{
        const photos = await Photo.find({user_id: req.params.id});
        res.json(photos);
    }catch(error){
        res.status(300).send(error)
    }
    
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

module.exports = router;