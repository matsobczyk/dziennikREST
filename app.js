const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const studiesRoute = require('./routes/studies');
require('dotenv/config');

app.use(bodyParser.json());
app.use('/studies', studiesRoute);

mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true }, 
    () =>
    console.log('connected to db')
    );

app.get('/', (req, res) => {
    res.send('this is home')
})

app.listen(3000)