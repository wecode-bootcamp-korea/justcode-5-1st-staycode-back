const { Prisma } = require('@prisma/client');
const prismaClient = require('./prisma-client');

async function readAccomodationById(id) {
  const list = await prismaClient.$queryRawUnsafe`WITH A AS(
        SELECT 
            accomodation.*
            , JSON_ARRAYAGG(
                JSON_OBJECT(
                    "id", 
                    accomodation_images.id,
                    "image_url", 
                    accomodation_images.image_url
                )
            ) AS images
        FROM accomodation
        JOIN accomodation_images ON accomodation.id = accomodation_images.accomodation_id
        WHERE accomodation.id=${id}
        GROUP BY accomodation.id
    )
    
    ,B AS(
        SELECT 
            accomodation.*
            , JSON_ARRAYAGG(
                JSON_OBJECT(
                    "id", 
                C.id,
                "name", 
                C.name,
                "content",
                C.content,
                "price",
                C.price,
                "max_guest",
                C.max_guest,
                "size",
                C.size,
                "check_in_time",
                C.check_in_time,
                "check_out_time",
                C.check_out_time,
                "created_at",
                C.created_at,
                "images",
                C.images
                )
            ) AS rooms
        FROM (
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
      GROUP BY room.id
        ) C
        JOIN accomodation ON accomodation.id = C.accomodation_id
        WHERE accomodation.id=${id}
        GROUP BY accomodation.id
    )
    
    
    SELECT *
    FROM A
    JOIN B ON A.id = B.id
          `;
  return list;
}

module.exports = { readAccomodationById };
