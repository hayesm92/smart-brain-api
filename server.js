const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smartbrain' 
    }
});

app.use(bodyParser.json());
app.use(cors());

const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;
const myPlaintextPasswordS = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})
app.get('/', (req,res) => {res.send('it is working')});
//Sign In
app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)})
  
//Register
app.post('/register', (req, res) => { register.handleRegister (req,res,db,bcrypt)})
  
//Profile
app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)})
 
//Image
app.put('/image', (req,res) => {image.handleImage(req,res,db)})
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})
   

