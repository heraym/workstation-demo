var express = require('express');
const hostname = '0.0.0.0';
const port = 8080
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const path = require('path');

app.use(express.static('public'));

app.get('/frontend', function(req,res,next) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(port, hostname, () => {
    console.log('Server running at http://%s:%s/', hostname, port);
});