const express =require('express')
const registerUser = require('../controller/registerUser')

const router= express.Router()

//create user API
router.post('/register',registerUser);

module.exports= router;