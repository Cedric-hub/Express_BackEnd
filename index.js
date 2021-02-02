const { response, request } = require('express');
var express = require('express');
var app = express();
// var mysql2 = require('mysql2');

var sql = require('./db/db');

// Appel du module router person.js
var person = require('./routes/person');

// var personneController = require('./controllers/personne.controller');

var bodyParser = require('body-parser');

// Déclaration de vues Embedded Javascript (EJS)
app.set('engine_view', 'ejs');

// Utilise Body-Parser pour pouvoir lire les entrées d'un formulaire
// le stocke comme un objet JavaScript
// accessible via req.body
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/assets/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

db.query('Select * from personne', function (
    err, rows) {
    if (err) throw (err);
    for (i = 0; i < rows.length; i++)
        console.log(rows[i].prenom + " " + rows[i].nom);
});


app.get('/forms', (req, res) => {
    res.render('forms.ejs');
});

app.post('/', (req, res) => {
    res.render('presentation.ejs', {
        prenom: req.body.prenom,
        nom: req.body.nom
    });
});


// Appel des routes déclarées dans person,js à partir de la route /person
// http://localhost:8080/person/forms
app.use('/person', person);



app.listen(8080, function () {
    console.log("Express en attente");
});



