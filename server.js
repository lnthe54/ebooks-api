const express = require("express");
const helmet = require("helmet");
const bodyparser = require('body-parser');
const cors = require("cors");
const mongoose = require("mongoose");
const books_route = require("./books/books_route")
const server = express();
const CookiesFbRoute = require('./router/cookies-route');

mongoose.connect('mongodb://localhost:27017/db_book', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Db connection')
})

server.use(helmet())
server.use(cors())
server.use(bodyparser.urlencoded({extended: true}));
server.use(bodyparser.json());
server.use("/books", books_route)
server.use('/api/', CookiesFbRoute)

module.exports = server;