require("dotenv").config();

const express = require("express");
const server = express();
const cors = require("cors");
const db = require("./database");

const router = require("./apiRoutes");

server.use(express.json());
server.use(cors());


server.use(router);


server.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando http://localhost:${process.env.PORT}`);
})