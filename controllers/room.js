const { getRoomService } = require('../services/room');

async function getRoomController(req, res) {
  const roomId = req.params.id;
  try {
    const room = await getRoomService(roomId);
    console.log(room);
    res.json({ data: room });
    return;
  } catch (err) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  // prisma 는 프로미스 객체이기 때문에 await async를 쓰거나 then을 통해서 값을 가져와야됨

  res.status(201).json({ message: 'get_room_success' });
}

module.exports = { getRoomController };
