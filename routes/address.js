var express = require ('express');
var router = express.Router();

router.get('/search', function (req, res) {
    res.send('Recherche adresse');
});

router.post('/add', function (req, res) {
    res.send('Ajout adresse');
});

router.put('/edit', function (req, res) {
    res.send('Mise à jour adresse');
});

router.delete('/delete', function (req, res) {
    res.send('Suppression adresse');
});


module.exports = router;
