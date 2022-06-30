require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.use((err, req, res, next) => {
  if(String(err.message).startsWith("user")){
    res.status(err.statusCode).json({ message: err.message});
    return;
  }

  if(err){
    res.status(err.statusCode || 500).json({ message: "err"});
    return;
  }
});

const server = http.createServer(app);

server.listen(10010, ()=>{
    console.log("server start : http://localhost:10010");
});
