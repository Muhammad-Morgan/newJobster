const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


// Required
const user = require('./routes/user')
const jobs = require('./routes/jobs')

// Routes
app.use('/user', user)
app.use('/jobs', jobs)


app.get('/',(req,res)=>{
    res.send(`<h1>Hello there...</h1>`)
})


mongoose.connect('mongodb+srv://muhammad:helloworld123@jobster.r7jsbjp.mongodb.net/jobsterNew?retryWrites=true&w=majority')
mongoose.connection.once('open', ()=> console.log('Connected to MongoDB...'))

app.listen(5000, ()=> console.log('Listening to Port 5000...'))