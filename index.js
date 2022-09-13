// Import the express lirbary
const express = require('express')
var cors = require('cors')
const axios = require('axios').default;
const app = express();
const lyricsFinder = require('lyrics-finder');

app.use(express.static("public"))
app.use(cors());
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

app.get('/lyrics', async (req, res) => {
  const artist = req.query.artist;
  const title = req.query.title;
  (async function(artist, title) {
    let lyrics = await lyricsFinder(artist, title) || "Not Found!";
    res.json(lyrics);
})(artist, title)
});
// Start the server on port 8080

app.listen(process.env.PORT || 8080);
