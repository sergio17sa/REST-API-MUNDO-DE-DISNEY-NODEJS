const express = require('express');
const morgan = require('morgan'); // me permite ver información de la solicitud http en la consola
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');

const server = express();
server.name = 'API';


//MIDDLEWARES EXPRESS

server.use(bodyParser.json({ limit: '50mb' }));  // me permite acceder al payload o contenido de la solicitud parseandola a un formato json
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); // me permite introducir texto de consulta en una url sin que el navegador lo confunda con la ruta
server.use(morgan('dev'));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

server.use('/', routes);


module.exports = server;