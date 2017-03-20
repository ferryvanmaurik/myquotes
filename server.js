/*
var http = require('http')
 var port = process.env.PORT || 1337;
 http.createServer(function(req, res) {
   res.writeHead(200, { 'Content-Type': 'text/plain' });
   res.end('Hello World\n');
 }).listen(port);
*/


const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoClient = require('mongodb').MongoClient

var port = process.env.PORT || 3000
var db = mongoClient.connect('mongodb://myquotesdb:TJYSp0zMmkrdkEY8K0JrXj0Sr2PoH13dyvTFrJj8m3UePIEeyxs337uG1CVkbNqq22aRzBPjAPTP9BrvUyrXdg==@myquotesdb.documents.azure.com:10250/?ssl=true', function (err, database){
    if (err) return console.log(err)
    db = database
    app.listen(port, function () {
        console.log('Listen on port' + port)
    })
})


app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', function (req, res) {
    db.collection('quotes').save(req.body, function (err, result) {
        if(err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })
    console.log(req.body)
})





