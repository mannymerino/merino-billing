'use strict';

// if not in production, 
// load dotenv configuration as early as possible
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const util = require('util');

const schema = require('./schemas/root');
const settings = require('./etc/settings');

const app = express();
module.exports = app; // for testing

const port = process.env.PORT || settings.port;

// allow cross-origin requests
app.use(cors());

// connect to database
mongoose.connect(util.format(process.env.DB_URI, process.env.DB_USERNAME, process.env.DB_PASSWORD), { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('Database connection complete');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log(util.format('Listening for requests on port %d', port));
});