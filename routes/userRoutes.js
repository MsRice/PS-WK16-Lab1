const express = require('express')
const router = express.Router()
const User =  require('../models/Users')
const jwt = require('jsonwebtoken')


router.post('/register', async (req, res) => {
    try {
        const { username , email , password } = req.body
        
        if ( !username || !email || !password ) {
            return res.status(400).json({
                message : 'Plese give a username, email and password'
            })
        }

    const existingUser = await User.findOne({ email})
    if (existingUser) {
        return res.status(400).json({
            message: 'This emailed has already been registered'
        })
    }

    const newUser = new User({
        username , email , password
    })

    const savedUser = await newUser.save()

    const userResponse = {
        id: savedUser._id,
        username: savedUser.username,
        email:savedUser.email,
        createdAt: savedUser.createdAt
    }

    res.status(201).json(userResponse)

  } catch (error) { 
    
  }
})

router.post('/login' , async (req, res) => {
    try {
        const { email , password} = req.body

        if (!email || !password ){
            return res.status(400).json({
                message: 'Incorrect email or password'
            })
        }
        
        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({
                message: 'Incorrect email or password'
            })
        }
        
        const isValidPass = await user.isCorrectPassword(password)
        if(!isValidPass){
            return res.status(400).json({
                message: 'Incorrect email or password'
            })
        }

        const payload = {
            id: user._id,
            username: user.username
        }

        const token  = jwt.sign(payload , process.env.JWT_SECRET, {expiresIn : '1h'})

        res.json({
            token,
            user:{
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error logging in'
        })
        
    }
})


module.exports = router
