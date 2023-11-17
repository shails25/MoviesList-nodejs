require('dotenv').config();

const express = require('express');
const path = require('path');
var https = require('https');
var mysql = require('mysql');

const app = express();
const API_KEY = process.env.API_KEY;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

var con = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASS,
    database: DB_NAME
});

con.connect(function(err) {
    if (err)
        console.log(err);
    else
        console.log("Connected!");
});

app.get('/', (req, res) => {
    res.render('index', {
        moviesList: []
    });
});

app.get('/search', (req, res) => {
    console.log(req.query.m);
    let data = '';

    https.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${req.query.m}`, function(resp){
        resp.on('data', res => {
            data += res;
        })

        resp.on('end', () => {
            res.render('index', {
                moviesList: JSON.parse(data)
            });
        })
    }).on('error', (err) => {
        console.log("error", err)
    }).end();
});

app.get('/liked', function(req, res){
    con.query("SELECT * FROM liked_movies", function (err, result, fields) {
        if (err) throw err;
        res.render('liked', {
            moviesList: result
        });
    });
})

app.post('/liked', function(req, res){

    let insertQuery = `INSERT into liked_movies(Title, Year, Poster, Type) VALUES ('${req.body.Title}', '${req.body.Year}', '${req.body.Poster}', '${req.body.Type}');`;
    let selectQuery = `SELECT * FROM liked_movies WHERE title = '${req.body.Title}';`;

    con.query(selectQuery, function (err, result, fields) {
        console.log(err);
        if (err) throw err;

        if(result.length == 0){
            con.query(insertQuery, function(err, result){
                console.log(err);
                if (err) throw err;
            });
        }
    });

    res.json({
        success: true,
        message: "Liked"
    });
})

const port = 3000 // Port we will listen on
app.listen(port, () => console.log(`This app is listening on port ${port}`));
