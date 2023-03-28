const { utils } = require('../../services');
const jwt = require('jsonwebtoken');

const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  const { id } = jwt.verify(refreshToken, process.env.SECRET_KEY);
  const accessToken = utils.createAccessToken({ id });

  res.status(200).json({
    status: 'success',
    code: '200',
    data: {
      user: {
        accessToken,
      },
    },
  });
};

module.exports = refreshAccessToken;
