const { Prisma } = require('@prisma/client');
const prismaClient = require('./prisma-client');

async function readStay(condition, stay, priceRange, cnt, page, search, order) {
  let stay_type_list = [];
  let theme_type_list = [];
  if (condition.stay_type) {
    stay_type_list = condition.stay_type.split(',');
  }
  if (condition.theme) {
    theme_type_list = condition.theme.split(',');
  }
  const list_sql = Prisma.sql`SELECT accomodation.id, accomodation.name, city, stay_type, theme, JSON_ARRAYAGG(max_guest) AS guests, JSON_ARRAYAGG(price) AS prices, MAX(price) as max_price, images FROM accomodation
  JOIN (SELECT accomodation_id, JSON_ARRAYAGG(image_url) AS images FROM accomodation_images GROUP BY accomodation_id)ig
  ON accomodation.id = ig.accomodation_id ${
    condition.stay_type
      ? Prisma.sql`AND stay_type IN (${Prisma.join(stay_type_list)})`
      : Prisma.empty
  } ${
    condition.theme
      ? Prisma.sql`AND theme IN (${Prisma.join(theme_type_list)})`
      : Prisma.empty
  }
  ${availableRoom(stay, priceRange, cnt)} HAVING 
    ${condition.city ? Prisma.sql`city = ${condition.city} AND` : Prisma.empty}
     1`;
  if (search) {
    const str = '%';
    const search2 = str.concat(search, str);
    const search_list = Prisma.sql`SELECT * FROM (${list_sql})fl WHERE stay_type LIKE ${search2} or city LIKE ${search2} or fl.name LIKE ${search2} `;
    const order_list = Prisma.sql`${search_list} ${
      order === 'high' ? Prisma.sql`ORDER BY max_price DESC` : Prisma.empty
    } ${order === 'low' ? Prisma.sql`ORDER BY max_price ASC` : Prisma.empty}`;
    const all_list = await prismaClient.$queryRawUnsafe`${order_list}`;
    const length = all_list.length;
    const list =
      await prismaClient.$queryRawUnsafe`SELECT * FROM (${order_list})sl LIMIT 4 OFFSET ${
        (page - 1) * 4
      }`;
    return { length, list };
  } else {
    const order_list = Prisma.sql`${list_sql} ${
      order === 'high' ? Prisma.sql`ORDER BY max_price DESC` : Prisma.empty
    } ${order === 'low' ? Prisma.sql`ORDER BY max_price ASC` : Prisma.empty}`;
    const all_list = await prismaClient.$queryRawUnsafe`${order_list}`;
    const length = all_list.length;
    const list =
      await prismaClient.$queryRawUnsafe`SELECT * FROM (${order_list})fl LIMIT 4 OFFSET ${
        (page - 1) * 4
      }`;
    return { length, list };
  }
}

function availableRoom(stay, priceRange, cnt) {
  if (!stay.check_in || !stay.check_out) {
    stay = {
      check_in: '1990-01-01',
      check_out: '1990-01-02',
    };
  }
  if (!priceRange.min_price || !priceRange.max_price) {
    priceRange = {
      min_price: 0,
      max_price: 1000000,
    };
  }
  if (!cnt) {
    cnt = 0;
  }
  return Prisma.sql`JOIN (select room.id, room.accomodation_id, room.price, room.max_guest from room 
  left join reservation on room.id = reservation.room_id 
  where ( reservation.reservation_end < ${stay.check_in} or reservation.reservation_start > ${stay.check_out} 
  or reservation.reservation_start is null and reservation.reservation_end is null)
  and room.price between ${priceRange.min_price} and ${priceRange.max_price}
  and room.max_guest >= ${cnt})ar on accomodation.id = ar.accomodation_id
  group by accomodation.id`;
}

module.exports = { readStay };
