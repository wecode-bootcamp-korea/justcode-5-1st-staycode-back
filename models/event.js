const { Prisma } = require('@prisma/client');
const prismaClient = require('./prisma-client');

async function readEvent() {
  const list =
    await prismaClient.$queryRawUnsafe`select event.id, event.title, event.content, event.event_detail_image_url, event_start, event_end, accomodation.city, event.accomodation_id from event join accomodation
  on event.accomodation_id = accomodation.id;`;
  return list;
}

module.exports = { readEvent };
