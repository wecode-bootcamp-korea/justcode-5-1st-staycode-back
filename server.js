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

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

//reservation get

app.get('/reservation', async (req, res) => {
  const checkINData =
    await prisma.$queryRaw`SELECT reservation_start FROM reservation;`;
  res.send(JSON.stringify({ checkINData }));
  console.log(checkINData);
});

//reservation post

app.post('/reservation', async (req, res) => {
  const {
    room_id,
    reservation_start,
    reservation_end,
    price,
    guest,
    special_requests,
    booker,
    phone,
    email,
  } = req.body;
  try {
    const findUserId =
      await prisma.$queryRaw`SELECT id FROM users WHERE email=${email}`;

    const createdReservation = await prisma.$queryRaw`
    INSERT INTO reservation(room_id,user_id,
    reservation_start,
    reservation_end,
    price,
    guest,
    special_requests,
    booker,
    phone,
    email
    ) VALUES (${room_id},${findUserId[0].id},
    ${reservation_start},
    ${reservation_end},
    ${price},
    ${guest},
    ${special_requests},
    ${booker},
    ${phone},
    ${email});`;
    return res.status(201).json({ message: 'RESERVATION_SUCCESS' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode).json({ message: err.message });
  }
});

app.use(accomodationRouter);
app.use(roomRouter);

const server = http.createServer(app);
const PORT = process.env.PORT || 10010;

// console.log(PORT);

const start = async () => {
  // 서버를 시작하는 함수입니다.
  try {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
    await prisma.$disconnect(); // 에러가 발생했을 시에 database 연결을 종료합니다.
  }
};

start();
