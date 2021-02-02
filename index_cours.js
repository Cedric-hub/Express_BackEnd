const { response, request } = require('express');
var express = require('express');
var app = express();
var mysql2 = require('mysql2');

// Appel du module router person.js
var person = require('./routes/person');

var bodyParser = require('body-parser');

// Déclaration de vues Embedded Javascript (EJS)
app.set('engine_view', 'ejs');

// Utilise Body-Parser pour pouvoir lire les entrées d'un formulaire
// le stocke comme un objet JavaScript
// accessible via req.body
app.use(bodyParser.urlencoded({ extended: false }));


// //////////////////////////////////////////////


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

app.use('/assets/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

db.query('Select * from personne', function (
    err, rows) {
    if (err) throw (err);
    for (i = 0; i < rows.length; i++)
        console.log(rows[i].prenom + " " + rows[i].nom);
});



// A l'appel de la route http://localhost:8080/forms
// nous affichons dans la vue forms.ejs la liste des personnes
//récupérée dans la db formation
app.get('/forms', (req, res) => {

    // création de la requête
    let query = "Select * from personne";

    // appel de la méthode query() prenant en parametre la requête ici query
    // et une méthode callback nous retournant soit une erreur soit le résultat
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/forms')
        }

        // Renvoie vers la vue forms.ejs avec une variable personList
        // stockant le résultat recupéré du callback
        res.render('forms.ejs', {
            personList: result,
            txtId: '',
            txtNom: '',
            txtPrenom: '',
        });
    });
});





// //////////////////////////////////////////////



app.get('/forms', (req, res) => {
    res.render('forms.ejs');
});

app.post('/', (req, res) => {
    res.render('presentation.ejs', {
        prenom: req.body.prenom,
        nom: req.body.nom
    });
});

app.post('/ajoutPersonne', (req, res) => {

    // var data = {
    //     nom: req.body.txtNom,
    //     prenom: req.body.txtPrenom
    // };

    // db.query("Insert into personne set ?", data,
    //     function (err, rows) {
    //         if (err) throw err;
    //         console.log("Insertion reussie");
    //         res.redirect('/forms');
    //     });

    if (req.body.txtId == 0) {
        var data = {
            nom: req.body.txtNom,
            prenom: req.body.txtPrenom
        };
        db.query("Insert into personne set ? ", data,
            function (err, rows) {
                if (err) throw err;
                console.log("Insertion reussie");
                res.redirect('/forms');
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
                res.redirect('/forms');
            });
    }
});

app.get('/editPersonne/:id', (req, res) => {

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


app.get('/deletePersonne/:id', (req, res) => {

    var id = req.params.id;

    db.query('DELETE FROM personne WHERE id = "' + id + '"',
        function (err, rows) {
            if (err) throw err;
            console.log("Suppression reussie");
            res.redirect('/forms');
        });
});





// Appel des routes déclarées dans person,js à partir de la route /person
// http://localhost:8080/person
// http://localhost:8080/person/add
// http://localhost:8080/person/edit
// http://localhost:8080/person/delete
// http://localhost:8080/person/search
app.use('/person', person);

// Un Middleware est essentiellement une fontion qui recevra les object Request et Response
// et Comme 3eme argument, une autre fonction next() que l'on appelera une fois notre code middleware terminé 
// var middleWare = function (req, res, next) {
//     console.log("middleWare:", req.url);
//     next();
// };
// var middleWare2 = function (req, res, next) {
//     console.log("middleWare2:", req.url);
// };
// app.get('/', (req, res, next) => {
//     console.log("requete recu");
//     res.send('hello world');
//     next();
// }, middleWare, middleWare2
// );
// var myLogger = function (req, res, next) {
//     console.log("Vous êtes connecté");
//     next();
// }
// var requestTime = function(req, res, next) {
//     req.requestTime = new Date(Date.now());
//     next();
// }
// app.use(myLogger);
// app.use(requestTime);
// app.get('/', (req, res) => {
//     var responseText = 'hello world';
//     responseText += ' appelé à :' + req.requestTime + '';
//     res.send(responseText);
// });
// Routage : Interception d'une requête client, via la methode HTTP get()
// puis, redirection vers un composant capable de retourner une reponse
// '/' est la route
// app.get('/', function (req, res) {
//     // Intruction qui nous permet de retourner une reponse au client
//     res.send('Get request to the home page');
// });
// app.post('/', function (req, res) {
//     res.send('Post request to the home page');
// });
// // Precision d'une chaine apres notre route '/' = localhost8080/personne
// app.get('/personne', function (req, res) {
//     res.send('Bonjour personne');
// });


app.listen(8080, function () {
    console.log("Express en attente");
});






// var express = require('express');
// var app = express();
// // Appel du module router person.js
// var person = require('./routes/person')
// var address = require('./routes/address')
// var bodyParser = require('body-parser');

// // Déclarations de vues Embedded JavaScript (EJS)
// app.set('engine_view', 'ejs');

// app.use(bodyParser.urlencoded({ extended: false }));


// // app.get('/', (req, res) => {
// //     var persons = [
// //         { nom: 'Wick', person: 'John', age: 40 },
// //         { nom: 'Doe', person: 'John', age: 50 },
// //         { nom: 'Bat', person: 'Jean', age: 30 },
// //     ];
// //     var personTitle = 'Liste de personnes';
// //     res.render('index.ejs', { personTitle, persons })
// // });

// // http://localhost:8080/hello/John
// app.get('/hello/:nom', (req, res) => {
//     var persons = [
//         { nom: 'Wick', person: 'John', age: 40 },
//         { nom: 'Doe', person: 'John', age: 50 },
//         { nom: 'Bat', person: 'Jean', age: 30 },
//     ];
//     var personTitle = 'Liste de personnes';
//     res.render('index.ejs', { personTitle, persons, nom: req.params.nom })
// });


// // Appel des routes déclarées dans person.js à partir de la route / person
// // http://localhost:8080/person/add
// // http://localhost:8080/person/edit
// // http://localhost:8080/person/delete
// // http://localhost:8080/person/search
// app.use('/person', person);

// // Appel des routes déclarées dans person.js à partir de la route / person
// // http://localhost:8080/address/add
// // http://localhost:8080/address/edit
// // http://localhost:8080/address/delete
// // http://localhost:8080/address/search
// app.use('/address', address);


// // // Hell World :
// // // app.get('/', (req, res) => {
// // //     res.send('hello world');
// // // });

// // // app.listen(8080);


// // // middleWare nécessite un next
// // var middleWare = function (req, res, next) {
// //     console.log("middleWare:", req.url);
// //     next();
// // };

// // app.use(middleWare);

// // app.get('/', function (req, res) {
// //     console.log("requête reçue");
// //     res.send('hello world');
// // });

// // app.listen(8080, function() {
// //     console.log("Express en attente");
// // });



// // EXEMPLE 2
// // var express = require('express');
// // var app = express();

// // // un middleware est essentiellement une fonction qui recevra les objets Request et Response
// // // et comme 3eme argument, une autre fonction next() que l'on appelera une fois notre code
// // // middleWare terminé
// // var middleWare1 = function (req, res, next) {
// //     console.log("middleWare1:", req.url);
// //     next();
// // };

// // var middleWare2 = function (req, res, next) {
// //     console.log("middleWare2:", req.url);
// // };

// // app.get('/', function (req, res, next) {
// //     console.log("requête reçue");
// //     res.send('hello world');
// //     next();
// // }, middleWare1, middleWare2
// // );

// // app.listen(8080, function() {
// //     console.log("Express en attente");
// // });



// // EXEMPLE 3
// // const { request } = require('express');
// // var express = require('express');
// // var app = express();


// // var myLogger = function (req, res, next) {
// //     console.log("Vous êtes connecté");
// //     next();
// // }

// // var requestTime = function (req, res, next) {
// //     req.requestTime = new Date(Date.now());
// //     next();
// // }

// // app.use(myLogger);
// // app.use(requestTime);

// // app.get('/', (req, res) => {
// //     var responseText = 'hello world';
// //     responseText += ' appelé à : ' + req.responseTime + '';
// //     res.send(responseText);
// // });



// // Routage : interception d'un requête client via la méthode HTTP get()
// // puis redirection vers un composant capable de retourner une réponse

// // '/' est la route


// // app.get('/', function (req, res) {
// //     // Instruction  qui nous permet  de retrouver une reponse au client
// //     res.send('Get request to the home page');
// // });

// // app.post('/', function (req, res) {
// //     res.send('Post request to the home page');
// // });

// // // Précision d'une chaîne après notre route '/' = http://localhost:8080/personne
// // app.get('/personne', function (req, res) {
// //     res.send('Bonjour personne');
// // });

// app.listen(8080, function () {
//     console.log("Express en attente");
// });
