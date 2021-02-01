const { response, request } = require('express');
var express = require('express');
var app = express();

// Appel du module router person.js
var person = require('./routes/person');
var bodyParser = require('body-parser');


// Déclaration de vues Embedded Javascript (EJS)
app.set('engine_view', 'ejs');

// Utilise Body-Parser pour pouvoir lire les entrées d'un formulaire
// le stocke comme un objet JavaScript
// accessible via req.body
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/forms', (req, res) =>{
    res.render('forms.ejs');
});

app.post('/', (req, res) =>{
    res.render('presentation.ejs', {
        prenom : req.body.prenom,
        nom : req.body.nom
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
