var mysql2 = require ('mysql2');

// Préparation de la connection à la db formation
// par l'utilisation du module installé mysql2
var db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'formation'
});

// connection à la db formation
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

// l'objet global nous donne une portée (scope) dans l'ensemble du projet
global.db = db;

module.exports = db;

