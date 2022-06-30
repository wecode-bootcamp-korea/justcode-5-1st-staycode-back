const { readEvent } = require('../models/event');

async function eventInfo() {
  const eventList = await readEvent();
  if (!eventList) {
    const error = new Error('EVENT_NOT_FOUND');
    error.statusCode = 404;
    throw error;
  }
  return eventList;
}

module.exports = { eventInfo };
