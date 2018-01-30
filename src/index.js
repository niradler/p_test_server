const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const routes =require('./routes');

const app = express()
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/', routes);

// initialize the server
const _port = process.env.PORT || 8080;
app.listen(_port, () => console.log('App listening on port '+_port))