
var express = require('express');
var app = express();
 const pug = require('pug');
const fs=require('fs');
const port=80;
const bodyparser=require('body-parser')

// moongoose relates stuff

const mongoose = require('mongoose');
const { request } = require('http');
mongoose.connect('mongodb://localhost/Uk', {useNewUrlParser: true, useUnifiedTopology: true});

//defining Schema and pushing to a model
const ApnaUk = new mongoose.Schema({
    name: String,
    age: String,
    email: String,
    number: String,
  });

const Data= mongoose.model('UK', ApnaUk);
// Express related commands
app.use('/images', express.static('images'))
app.use(express.urlencoded());

// Pug realted commands
app.set('view engine', 'pug')
app.set('views','./views')

//Endpoints
app.get('/', (req, res)=>{
   const parameters = {}
   res.render('index.pug',parameters);
})
 // Important for saving to the database
 app.get('/contact', (req, res)=>{
    const parameters = {}
    res.render('form.pug',parameters);
 })
 app.post('/contact', (req, res)=>{
    var myData=new Data(req.body)
    myData.save().then(()=>{
        res.send("Your data has been successfully submitted ! Thank You")
    }).catch(()=>{
        res.status(404).send("Error")
    })
 })

// feeding to server
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});