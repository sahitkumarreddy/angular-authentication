const express = require('express')
const User = require('../models/user')
const jwt = require ('jsonwebtoken')
const mongoose = require('mongoose')
const router = express.Router()
const { check, validationResult } = require('express-validator/check');
const db="mongodb+srv://userName:password@cluster0-04xrm.mongodb.net/test?retryWrites=true"
mongoose.connect(db,{ useNewUrlParser: true },err =>{
    if(err){
       console.error("Error::"+err)
    }else{
        console.log('Connection to mongodb successful')
    }
})

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized')
    }

    let token = req.headers.authorization.split(' ')[1]
    if(token === ''){
        return res.status(401).send('Unauthorized')
    }

    let payload = jwt.verify(token,'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized')
    }

    req.userId = payload.subject
    next()
}

router.get('/',(req,res)=>{
    res.send('From API route')
})

router.post('/register',[  check('email')
.isEmail().withMessage('Please enter a valid email address')
.trim()
.normalizeEmail()
.custom(value => {
    return findUserByEmail(value).then(User => {
      //if user email already exists throw an error
  })
}),
check('password','Password cannot be left blank')
    .isLength({ min: 1 })], 
    
    (req,res) => {
        let userData = req.body

    const errors = validationResult(req);

    if (!errors.isEmpty()) {     
        
       res.json({status : "error", message : errors.array()});

    } else {

        hmac = crypto.createHmac("sha1", 'auth secret');
        var encpassword = '';

        if(req.body.password){
          hmac.update(req.body.password);
          encpassword = hmac.digest("hex");
        }

        var document = {
            email:       req.body.email, 
            password:    encpassword
          };

		let user = new User(document)
		user.save((error,registeredUser) => {
			if(error){
				console.error("Error::"+error)
			}else{
                let payload = { subject : registeredUser._id }
                let token = jwt.sign(payload, 'secretKey')
				res.status(200).send({token})
			}
        })
    }
})

router.post('/login', (req,res) =>{
    let userData = req.body

    User.findOne({email:userData.email},(error,user) =>{
        if(error){
            console.error("Error::"+error)
        }else {
            if(!user){
                res.status(401).send('Invalid email')
            }else if (user.password !== userData.password){
                res.status(401).send('Invalid password')
            }else{
                let payload = { subject : user._id }
                let token = jwt.sign(payload, 'secretKey')
				res.status(200).send({token})
            }
        }
    })
})


router.get('/regularevents', (req,res) =>{
    let events = [
        {
            "id":"1",
            "name":"Auto Expo",
            "description": "lorem ipsum",
            "date" : "2018-12-31T18:30:00.000Z"
        },
        {
            "id":"2",
            "name":"Auto Expo",
            "description": "lorem ipsum",
            "date" : "2018-12-31T18:30:00.000Z"
        }
    ]
    res.json(events)
})

router.get('/specialevents', verifyToken, (req,res) =>{
    let events = [
        {
            "id":"1",
            "name":"Auto Expo",
            "description": "lorem ipsum special",
            "date" : "2018-12-31T18:30:00.000Z"
        },
        {
            "id":"2",
            "name":"Auto Expo",
            "description": "lorem ipsum special",
            "date" : "2018-12-31T18:30:00.000Z"
        }
    ]
    res.json(events)
})

function findUserByEmail(email){

    if(email){
        return new Promise((resolve, reject) => {
          User.findOne({ email: email })
            .exec((err, doc) => {
              if (err) return reject(err)
              if (doc) return reject(new Error('This email already exists. Please enter another email.'))
              else return resolve(email)
            })
        })
      }
   }

module.exports = router