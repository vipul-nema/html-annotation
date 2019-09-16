// server.js

var express = require('express');

var app = express();

var PORT = 5000;
app.use(express.static('./'))

app.get('/', function (req, res) {
    // res.status(200).send('Hello world');
    res.sendFile('index.html', { root: __dirname })
});


app.listen(PORT, function () {
    console.log('Server is running on PORT:', PORT);
});