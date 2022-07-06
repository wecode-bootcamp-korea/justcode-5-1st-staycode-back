const { Prisma } = require('@prisma/client');
const prismaClient = require('./prisma-client');

async function readStay(condition, stay, priceRange, cnt, page) {
  let stay_type_list = [];
  let theme_type_list = [];
  if (condition.stay_type) {
    stay_type_list = condition.stay_type.split(',');
  }
  if (condition.theme) {
    theme_type_list = condition.theme.split(',');
  }
  const list = Prisma.sql`(SELECT accomodation.id, accomodation.name, city, stay_type, theme, JSON_ARRAYAGG(price) AS prices, images FROM accomodation
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
     1)fl`;
  console.log(page);
  const page_list =
    await prismaClient.$queryRawUnsafe`SELECT * FROM ${list} LIMIT 4 OFFSET ${
      (page - 1) * 4
    }`;
  console.log(page_list);
  return page_list;
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

/*return Prisma.sql`JOIN (select room.id, room.accomodation_id, room.price, room.max_guest from room 
  left join reservation on room.id = reservation.room_id 
  where (reservation.reservation_start not between ${stay.check_in} and ${stay.check_out}
  and reservation.reservation_end not between ${stay.check_in} and ${stay.check_out}
  or reservation.reservation_start is null and reservation.reservation_end is null)
  and room.price between ${priceRange.min_price} and ${priceRange.max_price}
  and room.max_guest >= ${cnt})ar on accomodation.id = ar.accomodation_id
  group by accomodation.id`;*/

/*function filterByHaving(condition) {
  const filter = [];
  if (condition.stay_type) {
    filter.push(`stay_type = '${condition.stay_type}'`);
  }
  if (condition.city) {
    filter.push(`city = '${condition.city}'`);
  }
  if (condition.theme) {
    filter.push(`theme = '${condition.theme}'`);
  }
  if (filter.length) {
    return Prisma.query`having ${filter.join(' and ')}`;
  } else {
    return Prisma.empty;
  }
}*/

module.exports = { readStay };
