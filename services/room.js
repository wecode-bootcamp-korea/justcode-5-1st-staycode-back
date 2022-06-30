const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getRoomService(id) {
  if (id) {
    try {
      const room = await prisma.$queryRaw`
      SELECT 
      room.*
        ,  JSON_ARRAYAGG(
        JSON_OBJECT(
        "id", room_images.id,
        "image_url", room_images.image_url
        )
        ) AS images
      FROM room
      JOIN room_images ON room.id = room_images.room_id
      WHERE room.id=${id}
      GROUP BY room.id
              `;

      return room;
    } catch (err) {
      console.log(err);
      return null;
    }
  } else {
    try {
      const room = await prisma.$queryRaw`
                SELECT
                    *
                FROM room;
              `;
      return room;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = { getRoomService };
