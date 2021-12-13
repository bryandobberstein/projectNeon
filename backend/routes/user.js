const bcrypt = require('bcrypt');
const env = require('dotenv').config;
const { Router } = require('express');
const jwt = require('jsonwebtoken');


const userRouter = Router();

//user signup (post)
module.exports = userRouter;
