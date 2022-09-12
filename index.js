// Import the express lirbary
const express = require('express')
const axios = require('axios').default;
const app = express();

app.use(express.static("public"))

app.get('/api/v1/auth/', async (req, res) => {

  const code = req.query.code;
  const clientID = req.query.clientID;
  const clientSecret = req.query.clientSecret;
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
    headers: {
         accept: 'application/json'
    }
  }).then((response) => {
    res.json(response.data);
  }).catch(error => {
    res.json(error);
  })
});
// Start the server on port 8080

app.listen(process.env.PORT || 8080);
