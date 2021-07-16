const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://coproFormationUser:J11ei7rN8mnQBTcV@clustercoproformation.wwiqj.mongodb.net/coproFormationDB?retryWrites=true&w=majority";

const formationRoutes = require ('./routes/formation');
const userRoutes = require ('./routes/user');
const adminRoutes = require ('./routes/admin');
const sessionRoutes = require ('./routes/session');
const inscriptionRoutes = require ('./routes/inscription');
const sendMailRoutes = require ('./routes/sendMail');

mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify :false })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(cors());

app.use(bodyParser.json());

app.use('/coproformation/formation' , formationRoutes);
app.use('/coproformation/user' , userRoutes);
app.use('/coproformation/admin' , adminRoutes);
app.use('/coproformation/session' , sessionRoutes);
app.use('/coproformation/inscription' , inscriptionRoutes);
app.use('/coproformation/contact' , sendMailRoutes);

module.exports = app;
