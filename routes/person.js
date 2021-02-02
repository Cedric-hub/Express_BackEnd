var express = require('express');
var router = express.Router();
var personneController = require('../controllers/personne.controller');


router.get('/search', function (req, res) {
    res.send('recherche personne');
});

router.post('/add', function (req, res) {
    res.send('Ajout personne');
});

router.put('/edit', function (req, res) {
    res.send('Mise à jour personne');
});

router.delete('/delete', function (req, res) {
    res.send('Suppression personne');
});

router.get('/', (req, res) => {
    var persons = [
        { nom: 'Wick', prenom: 'John', age: 40 },
        { nom: 'Doe', prenom: 'John', age: 50 },
        { nom: 'Bat', prenom: 'Jean', age: 30 },
    ];
    var personTitle = "Liste de personnes";
    res.render('index.ejs', {
        personTitle,
        persons,
        nom : req.params.nom
        // ou
        // nom : "chaussette"
    })
});

// // http://localhost:8080/hello/John
// router.get('/hello/:nom', (req,res) =>{
//     var persons = [
//         {nom : 'Wick', prenom : 'John', age : 40},
//         {nom : 'Doe', prenom : 'John', age : 50},
//         {nom : 'Bat', prenom : 'Jean', age : 30},
//     ];
//     var personTitle = "Liste de personnes";
//     res.render('index.ejs', {
//         personTitle, 
//         persons, 
//         nom : req.params.nom
//     })
//     res.render('index.ejs', { nom : req.params.nom})
// });

router.get('/forms', personneController.show);


///////////////////////////////


// app.get('/forms', (req, res) => {
//     res.render('forms.ejs');
// });

// app.post('/', (req, res) => {
//     res.render('presentation.ejs', {
//         prenom: req.body.prenom,
//         nom: req.body.nom
//     });
// });

router.post('/ajoutPersonne', (req, res) => {


    if (req.body.txtId == 0) {
        var data = {
            nom: req.body.txtNom,
            prenom: req.body.txtPrenom
        };
        db.query("Insert into personne set ? ", data,
            function (err, rows) {
                if (err) throw err;
                console.log("Insertion reussie");
                res.redirect('/person/forms');
            });
    }
    else {
        var data = {
            id: req.body.txtId,
            nom: req.body.txtNom,
            prenom: req.body.txtPrenom
        };
        db.query('UPDATE personne SET ? WHERE id = ' + data.id, data,
            function (err, rows) {
                if (err) throw err;
                console.log("Mise à jour reussie");
                res.redirect('/person/forms');
            });
    }
});

router.get('/editPersonne/:id', (req, res) => {

    var id = req.params.id;


    db.query('SELECT * FROM personne WHERE id = "' + id + '"',
        function (err, rows) {
            if (err) throw err;

            res.render('forms.ejs', {
                personList: [],
                txtId: rows[0].id,
                txtNom: rows[0].nom,
                txtPrenom: rows[0].prenom,
            });
        });
});


router.get('/deletePersonne/:id', (req, res) => {

    var id = req.params.id;

    db.query('DELETE FROM personne WHERE id = "' + id + '"',
        function (err, rows) {
            if (err) throw err;
            console.log("Suppression reussie");
            res.redirect('/person/forms');
        });
});

module.exports = router;