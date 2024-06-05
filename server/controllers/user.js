const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const authUser = (req, res) => {
    const { token } = req.query;
    if (!token) return res.json({
        type: 'danger',
        msg: 'Session expired!'
    });
    jwt.verify(token, 'SECRET%msg%', (err, decode) => {
        if (err) {
            res.json({
                type: 'danger',
                msg: 'Session expired!'
            })
        } else {
            res.json({
                myToken: token,
                type: 'success',
                msg: ''
            })
        }
    })
}

const createToken = (req, res) => {
    const {name} = req.query;
    const {myID, type} = req.body;
    const token = jwt.sign({
        myID,
        type,
        name
    },
        'SECRET%msg%',
        { expiresIn: '1h' })
        res.json({
            token
        })
}

const registerUser = (req, res) => {
    const { myID, name, email, password, type } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            User.create({
                myID,
                name,
                email,
                password: hash,
                type
            }).then(() => {
                const token = jwt.sign({ myID, type, name }, 'SECRET%msg%', { expiresIn: '1h' })
                res.json({
                    myToken: token,
                    type: 'success',
                    msg: 'registered !'
                })
            }).catch(err => console.log(err))
        })
    })
}

const loginUser = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }).then((found) => {
        if (!found) return res.json({
            type: 'danger',
            msg: 'no account was found'
        });
        bcrypt.compare(password, found.password).then((result) => {
            if (!result) return res.json({
                type: 'danger',
                msg: 'wrong password !'
            });
            const token = jwt.sign({ name: found.name, myID: found.myID, type: found.type }, 'SECRET%msg%', { expiresIn: '1h' });
            res.json({
                myToken: token,
                type: 'success',
                msg: 'logged In'
            })
        })
    }).catch(err => console.log(err))
}
const updateUser = (req, res) => {
    const { myID } = req.query;
    const {
        name,
        lastname,
        email,
        location
    } = req.body;
    User.findOneAndUpdate({ myID },
        {
            name,
            lastname,
            email,
            location
        }).then(() => res.json({ msg: 'updated', type: 'success' })).catch(() => res.json({ msg: 'something went wrong', type: 'danger' }))
}
const getUser = (req, res) => {
    const { myID } = req.query;
    User.findOne({ myID }).then((result) => {
        res.json({ result })
    }).catch(err => console.log(err));
}
module.exports = {
    createToken,
    getUser,
    updateUser,
    authUser,
    registerUser,
    loginUser
}