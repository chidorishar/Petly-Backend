const { findServices } = require('../../services');
const getServices = async (req, res) => {
  const services = await findServices({});
  res.status(200).json({ services });
};

module.exports = getServices;
