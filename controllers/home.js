const { promotionInfo } = require('../services/promotionInfo');
const { eventInfo } = require('../services/eventInfo');

async function homeController(req, res) {
  try {
    // 2

    const promotion_list = await promotionInfo();
    const event_list = await eventInfo();

    return res.status(201).json({ promotion_list, event_list }); // 5
  } catch (err) {
    // 2
    console.log(err);
    return res.status(err.statusCode).json({ message: err.message });
  }
}

module.exports = { homeController };
