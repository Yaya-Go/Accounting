const express = require('express');
const cors = require('cors');

const arrayOfValidOrigins = [
    'http://localhost:4200'
];

const APP = express();

APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));
APP.use(cors({ origin: true }));
APP.options('*', cors({ origin: true }));

APP.use((req, res, next) => {
    const origin = req.headers.origin;
    // arrayOfValidOrigins is an array of all the URL from where you want to allow 
    // to accept requests. In your case: ['http://localhost:3000'].
    // In case you want to accept requests from everywhere, set:
    // res.setHeader('Access-Control-Allow-Origin', '*');
    if (arrayOfValidOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  
    // Here allow all the HTTP methods you want
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,HEAD,PUT,OPTIONS');
    // Here you allow the headers for the HTTP requests to your server
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // Method to reference to the next Node.js function in your flow
    next();
  });


const tagRouter = require('./routers/tags.router');
const authRouter = require('./routers/auth.router');
const categoryRouter = require('./routers/category.router');

APP.use('/auth', authRouter);
APP.use('/tags', tagRouter);
APP.use('/category', categoryRouter)

APP.use('/', async (req, res) => {
    return res.json({ message: 'Welcome' });
});

module.exports = APP;