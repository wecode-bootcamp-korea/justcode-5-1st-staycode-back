require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const { PrismaClient } = require('@prisma/client');

const accomodationRouter = require('./routes/accomodation');
const roomRouter = require('./routes/room');

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use(accomodationRouter);
app.use(roomRouter);

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});



  if(err){
    res.status(err.statusCode || 500).json({ message: "err"});
    return;
  }
});

const server = http.createServer(app);

server.listen(10010, ()=>{
    console.log("server start : http://localhost:10010");
});
