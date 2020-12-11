const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
var knex = require('knex');

//Controllers
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//Initialize Server-Db connection
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'akshayd261',
      database : 'smartbrain'
    }
  });


const app = express();

//Running middleware
app.use(express.json());
app.use(cors());

//Psueodo DB using object array (used when creating backend & testing)
// const db = {
//     users: [
//         {
//             id: "1",
//             name: 'Test',
//             email: 'test@gmail.com',
//             password: 'user',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: "2",
//             name: 'User',
//             email: 'user@gmail.com',
//             password: 'test',
//             entries: 0,
//             joined: new Date()
//         }
//     ],
//     login : [
//         {
//             id: '987',
//             hash: '',
//             email: '...'
//         }
//     ]
// }

// app.get('/', (req, res) => {
//     res.send(db.users);
// });

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
//Can be expanded on (front-end) when developing more features for application.
app.get('/profile/:id', (req, res) => {profile.handleGetProfile(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, () => {
    console.log('Yerr')
});

//Route Planning
/*

/ --> response = this is working!
/signin --> POST (will response w/) = success/fail
/register --> POST (will add new user data) = (return) user
/profile/:userID --> GET = user data
/image --> PUT = return updated user object

*/

//instead of body parser use:
// app.use(express.urlencoded({extended: false}));
// app.use(express.json());