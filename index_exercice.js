// EXERCICE
// Creer un projet Express qui permet d’ecrire et d’afficher des
// commentaires


const { response, request } = require('express');
var express = require('express');
var app = express();
app.set('engine_view', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


let comments = [];

app.get('/comments', (req, res) => {
    res.render('comment.ejs', {
        comments
    });
});

app.post('/', (req, res) => {
    let comment = {
        title: req.body.title,
        comment: req.body.comment,
        date: new Date(Date.now())
    };
    comments.push(comment);
    res.render('comment.ejs', {
        comments
    });
});

app.listen(8080, function () {
    console.log("Express en attente");
});