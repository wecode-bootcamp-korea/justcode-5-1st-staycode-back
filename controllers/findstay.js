const { findstayInfo } = require('../services/findstay');

async function findstayController(req, res) {
  try {
    // 2
    const condition = {
      stay_type: req.query.stay_type,
      city: req.query.city,
      theme: req.query.theme,
    };

    const stay = {
      check_in: req.query.check_in,
      check_out: req.query.check_out,
    };

    const priceRange = {
      min_price: req.query.min_price,
      max_price: req.query.max_price,
    };

    const cnt = req.query.cnt;
    const page = req.query.page;
    const search = req.query.search;
    const order = req.query.order;

    const data = await findstayInfo(
      condition,
      stay,
      priceRange,
      cnt,
      page,
      search,
      order
    );

    return res.status(201).json({ data }); // 5
  } catch (err) {
    // 2
    console.log(err);
    return res.status(err.statusCode).json({ message: err.message });
  }
}

module.exports = { findstayController };
