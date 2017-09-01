const bodyParser = require('body-parser');
const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/audio-concat', (req, res) => {
    res.send(req.data);
});

app.listen(port, () => {
    console.log('app is running on port', port);
});
