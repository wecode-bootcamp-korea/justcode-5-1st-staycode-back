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

app.get('/findstay', async (req, res) => {
  try {
    const list =
      await prisma.$queryRaw`SELECT accomodation.id, accomodation.name, city, stay_type, images, prices FROM accomodation
      JOIN (SELECT accomodation_id, JSON_ARRAYAGG(image_url) AS images FROM accomodation_images GROUP BY accomodation_id)ig
      ON accomodation.id = ig.accomodation_id
      JOIN (SELECT accomodation_id, JSON_ARRAYAGG(price) AS prices FROM room GROUP BY accomodation_id)rm
      ON accomodation.id = rm.accomodation_id;`;
    return res.json({ list });
  } catch (err) {
    console.log(err);
  }
});

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
