// ! express basic code
const express = require ('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
require('dotenv').config()
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'))
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));

const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT;

const User = require('./models/cred');
const Chat = require('../MongoProject/models/chat');

app.listen(PORT, ()=>{
    console.log("Server is up and working on port", PORT)
})

function asyncwrap(fn){
    return function(req, res, next){
        fn(req, res, next).catch((err)=> next(err))
    }
}

main().then((r)=>{ console.log(`Connected with database!`)})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(DB_URL+DB_NAME);
}

app.post('/user', asyncwrap (async (req, res)=>{
    let { obj } = req.body;
    let r = await User.insertOne(obj)
    console.log(obj)
    res.render('welcome.ejs', {obj})
    // let r = await User.deleteMany({})
    // res.send(r)
}))



app.get('/', (req, res)=>{
    console.log("Root route working ✅")
})

app.get('/user/new', (req, res)=>{
    res.render('new.ejs')
})

