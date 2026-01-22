const express = require('express')
const router = express.Router()
const User =  require('../models/Users')

router.post('/', async(req, res ) =>{
    try {
        const newUser = await User.create(req.body)
        res.status(201).json(newUser)
        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/api/users/register', async (req, res) => {
  try {
    const { username , email , password } = req.body
  } catch (error) {
    
  }
});