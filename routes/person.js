var express = require('express');
var router = express.Router();

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

module.exports = router;