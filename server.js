const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionstring: process.env.DATABASE_URL,
        ssl: true
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/',(req, res) => {
    res.send("It's working");
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:userId', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImagePut(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res, db) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running in port ${process.env.PORT}`);
})
