const {conn} = require('./api/db.js');
const server = require('./api/app.js');

conn.sync({force:true}).then(()=> {
    server.listen(3001, () => {
        console.log('listening in port 3001');
    });
});









































// require('dotenv').config();
// const {Sequelize} = require('sequelize');
// const fs = require('fs')
// const path = require('path')
// const {
// DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
// } = process.env


// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
//     logging: true,
    
// });


// sequelize.authenticate()
// .then(()=>{
//     console.log('conectado exitosa a db');
// })
// .catch(()=>{
//     console.log('conexion a db falló');
// })


// const basename = path.basename(__filename); // devuelve una string con el nombre final del archivo en una ruta especifica 


// const modelsdb = [];

// // en esta parte leemos los archivos de la carpeta models, los requerimos y los ingresamos al array modelsdb

// fs.readdirSync('api/models') // leo los archivos que estan en el directorio api en la carpeta modelos 
// .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')) // filtro solo los archivos correspondientes a los modelos
// .forEach(file => {
//    modelsdb.push(require(path.join(  __dirname, 'api/models', file))) // ingreso los modelos a al array modelsdb
// });


// // ahora sequelice.models es un objeto con las propiedades de los modelos 
// modelsdb.forEach(model => model(sequelize));



// // hago destructuring de los modelos dentro de sequelize.models para poder hacer las relaciones 
// const {Genero , Peliculas , Personajes} = sequelize.models;

// //relaciones 
// Personajes.belongsToMany(Peliculas, {through: 'Peliculas_Personajes'});
// Peliculas.belongsToMany(Personajes, {through: 'Personajes_Peliculas'});
// Peliculas.belongsTo(Genero);
// Genero.belongsToMany(Peliculas, {through: 'Peliculas_Genero'});


// module.exports = {
//     ...sequelize.models, // para importar los modelos const { Personajes, Peliculas, Genero } = require('./db.js');
//     conn: sequelize   // para inportar la conexion { conn} = require('./db.js')
// }; 



