const express = require('express')
const router = express.Router()
const User =  require('../models/Users')


router.get('/api/users/register', async (req, res) => {
    try {
        const { username , email , password } = req.body
        
        if ( !username || !email || !password ) {
            res.status(400).json({
                message : 'Plese give a username, email and password'
            })
        }

    const existingUser = await User.findOne({ email})
    if (existingUser) {
        return res.status(400).json({
            message: 'This emailed has already been registered'
        })
    }

    constnewUser = new User({
        username , email , password
    })

    const savedUser = await newUser.save()

    const userResponse = {
        id: savedUser._id,
        username: savedUser.username,
        email:savedUser.email,
        createAt: savedUser.createAt
    }

    res.status(201).json(userResponse)

  } catch (error) { 
    console.error(error)
    res.status(500).json({message: 'error occured while saving!'})
    
  }
})

module.exports = router