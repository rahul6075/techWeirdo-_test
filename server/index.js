'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require("morgan");
require('dotenv').config();
const app = express();


/**
 * @description import routes
 */
 const userRoute = require('./routes/users');
 app.use(morgan("dev"));
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
  })
);

app.get('/', (req, res) => {
    var response = {
      success: 1,
      message: 'api running',
    };
    res.status(200).json(response);
  });

  app.post('/api', (req, res) => {
    console.log(req.body);
    return req.body;
  });


  app.use('/api/profile', userRoute);
/**
 * @description Page NOT FOUND Error
 */
 app.use((req, res) => {
    return res.status(404).json({
      success: 0,
      message: `NOT FOUND ${req.originalUrl}`,
    });
  }); 

const PORT = process.env.HOSTING_PORT || 8080;
const NODE_ENV = process.env.NODE_ENV;


app.listen(PORT, () => {
    console.log(`server is listing in ${NODE_ENV} on ${PORT} `);
});