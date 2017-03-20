const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoClient = require('mongodb').MongoClient

var db;
mongoClient.connect('mongodb://myquotesdb:TJYSp0zMmkrdkEY8K0JrXj0Sr2PoH13dyvTFrJj8m3UePIEeyxs337uG1CVkbNqq22aRzBPjAPTP9BrvUyrXdg==@myquotesdb.documents.azure.com:10250/?ssl=true', function (err, database){
    if (err) return console.log(err)
    db = database
    app.listen(3000, function () {
        console.log('Listen on port 3000')
    })
})


app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', function (req, res) {
    db.collections('quotes').save(req.body, function (err, result) {
        if(err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })
    console.log(req.body)
})





