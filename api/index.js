//IMPORT -> PACKAGE
const express = require('express');
//APP USES
const cors = require('cors');
//CONFIGERATION
const connectDB = require('./config/database');
const dev = require('./config/index');

const app = express();
const port = dev.app.port; //set config...

//IMPORT -> ROUTER
const productRoute = require('./Router/products.router');
const stripeRoute = require('./Router/stripe.router');

//PACKAGE USES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//ROUTER USES
app.use('/api/v1/product', productRoute); // PRODUCT
app.use('/api/v1/stripe', stripeRoute);

//SERVER RUNING ON
app.listen(port, async () => {
  console.log(`server runing http://localhost:${port}`);
  await connectDB();
});
