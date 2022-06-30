const { Prisma } = require('@prisma/client');
const prismaClient = require('./prisma-client');

async function readPromotion() {
  const list =
    await prismaClient.$queryRawUnsafe`select promotion.id, promotion.title, promotion.accomodation_id, promotion.content, promotion.pro_detail_image_url, promotion.pro_start, promotion.pro_end, ar.name ,ar.city, ar.stay_type, prices, guests
    from promotion
    join (select accomodation.id, accomodation.city, accomodation.name, accomodation.stay_type, prices, guests from accomodation 
    join (select accomodation_id, JSON_ARRAYAGG(price) as prices, JSON_ARRAYAGG(max_guest) as guests from room group by accomodation_id)rm
    on accomodation.id = accomodation_id)ar
    on promotion.accomodation_id = ar.id;`;
  return list;
}

module.exports = { readPromotion };
