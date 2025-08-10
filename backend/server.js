require('dotenv').config();
const express = require('express');

const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pg = require('pg');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database Sanction


const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });



app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Information API page
const informationAPI = require('./routes/informationAPI.js');
app.use('/information',informationAPI);


// Auth Users
const auth = require('./routes/auth.js');
app.use('/users',auth);


//-------------------------------------------------
app.use((req ,res) =>{
  res.status(404).send('Page Not Found');
  // res.status(404).send("<a href='/home'> back </a>");
  //res.redirect('/home'); 
});


//------------------------------------------------
const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}`);
// });

pool.connect()
  .then((client) => {    
    return client.query("SELECT current_database(), current_user")
      
      .then((res) => {
        client.release();
        const dbName = res.rows[0].current_database;
        const dbUser = res.rows[0].current_user;
        console.log(`Connected to PostgreSQL as user '${dbUser}' on database '${dbName}'`);

        console.log(`App listening on port http://localhost:${port}`);
      });
  })

  .then(() => {
    app.listen(port);
  })

  .catch((err) => {
    console.error("Could not connect to database:", err);
  });

