const express = require("express");
const helmet = require("helmet");
const books_route = require("./books/books_route")
const server = express();

server.use(helmet())
server.use("/books", books_route)

module.exports = server;