const { getAccomodationService } = require('../services/accomodation');

async function getAccomodationController(req, res) {
  const accomodationId = req.params.id;
  try {
    const accomodation = await getAccomodationService(accomodationId);
    console.log(accomodation);
    res.json({ data: accomodation });
    return;
  } catch (err) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  // prisma 는 프로미스 객체이기 때문에 await async를 쓰거나 then을 통해서 값을 가져와야됨
}

module.exports = { getAccomodationController };
