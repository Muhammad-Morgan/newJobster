const express = require('express')
const router = express.Router();

// Req
const {
    authUser,
    loginUser,
    registerUser,
    updateUser,
    getUser,
    createToken
} = require('../controllers/user')

// Routes
router.post('/createtoken',createToken)
router.get('/auth', authUser)
router.put('/updateuser', updateUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getuser',getUser)
module.exports = router;