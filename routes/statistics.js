const express = require('express');
const router = express.Router();
const Study = require('../models/Study');
const verification = require ('./verifyToken');