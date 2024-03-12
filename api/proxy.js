// api/proxy.js
const axios = require('axios');

module.exports = async (req, res) => {
  const url = 'https://i.scdn.co' + req.url.replace(/^\/api\/proxy/, '');

  try {
    const { data } = await axios.get(url, {
      responseType: 'arraybuffer',
    });

    res.setHeader('Content-Type', 'image/jpeg');
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching image' });
  }
};