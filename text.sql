SELECT p.id, p.name AS productName, cg.category, JSON_ARRAYAGG(JSON_OBJECT("id", pa.id, "color", JSON_OBJECT("id", pa.color_id, "color", pa.color), "images", pa.images)) AS colorImage, p.sales_count
FROM (
    SELECT pc.id, product_id, pc.color_id, pi.images, c.color
    FROM product_color pc
    JOIN color c on pc.color_id = c.id
    JOIN (
        SELECT product_color_id AS id, JSON_ARRAYAGG(JSON_OBJECT("id",product_images.id, "url", product_images.url)) AS images
        FROM product_images WHERE MOD(id,2) = 1
        GROUP BY product_color_id
        ) pi on pi.id = pc.id
    ) pa
JOIN products p ON p.id = pa.product_id
JOIN category cg ON cg.id = p.category_id
GROUP BY product_id, sales_count
ORDER BY sales_count DESC limit 20;


SELECT
      accomodation.*,  JSON_ARRAYAGG(
        JSON_OBJECT(
        ‘id’, accomodation_images.id,
        ‘image_url’, accomodation_images.image_url,
        )
        )
      FROM accomodation
      JOIN accomodation_images
      ON accomodation.id = accomodation_images.accomodation_id
      WHERE accomodation.id=${id}
      GROUP BY accomodation_id;



    SELECT
      accomodation.*, JSON_ARRAYAGG(
        JSON_OBJECT(
        "id", accomodation_images.id,
        "image_url", accomodation_images.image_url,
        )
        )
      FROM accomodation 
      JOIN accomodation_images ON accomodation_images.accomodation_id = accomodation.id
      WHERE accomodation.id=${id};



SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT(
              'id', accomodation_images.id,
              'image_url', accomodation_images.image_url
          )
      ) AS images
      FROM accomodation_images
      WHERE accomodation_id = ${id}
      GROUP BY accomodation_id





SELECT 
      accomodation.*
        ,  JSON_ARRAYAGG(
        JSON_OBJECT(
        "id", accomodation_images.id,
        "image_url", accomodation_images.image_url
        )
        ) AS images
        ,  JSON_ARRAYAGG(
        JSON_OBJECT(
        "id", room.id,
        "image_url", room.name
        )
        ) AS rooms
      FROM accomodation
      JOIN accomodation_images ON accomodation.id = accomodation_images.accomodation_id
      JOIN room ON accomodation.id = room.accomodation_id
      WHERE accomodation.id=${id}
      GROUP BY accomodation.id




 SELECT 
       accomodation.*
        ,  JSON_ARRAYAGG(
        JSON_OBJECT(
        "id", accomodation_images.id,
        "image_url", accomodation_images.image_url
        )
        ) AS images
        ,  JSON_ARRAYAGG(
        JSON_OBJECT(
        "id", room.id,
        "image_url", room.name
        )
        ) AS rooms
      FROM accomodation_images, room
      JOIN accomodation ON accomodation.id = room.accomodation_id
      WHERE room.accomodation_id=${id} and accomodation_images.accomodation_id=${id}
      GROUP BY accomodation.id










WITH A AS(
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
                room.id,
                "image_url", 
                room.name
            )
        ) AS rooms
    FROM accomodation
    JOIN room ON accomodation.id = room.accomodation_id
    WHERE accomodation.id=${id}
    GROUP BY accomodation.id
)


SELECT *
FROM A
JOIN B ON A.id = B.id












SELECT 
      accomodation.*
        ,  JSON_ARRAYAGG(
        JSON_OBJECT(
        "id", room.id,
        "name", room.name
        )
        ) AS rooms
      FROM room
      JOIN accomodation ON accomodation.id = room.accomodation_id
      WHERE accomodation.id=${id}
      GROUP BY accomodation.id







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








WITH A AS(
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