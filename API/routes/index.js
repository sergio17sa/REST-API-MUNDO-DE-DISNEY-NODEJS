const { Router } = require('express');
const {create_character, get_character} = require('./controlers')


const router = Router();


router.get('/characters', get_character); // debe mostrar listado de personas nombre - imagen 
router.post('/characters', create_character);
router.put('/characters');
router.delete('/characters');

// DETALLE DE PERSONAJE POR PARAMS
router.get('/characters:id');// obtener el detalle de un personaje por id


// BUSQUEDAS y fILTRAR PERSONAJES POR QUERY 

router.get('characters?name=nombre');  // busquedad por nombre 
router.get('characters?age=edad'); // por edad
router.get('characters?movies=idMvie'); // busquedad por peliculas en la que participado 


router.get('/movies',); // debe mostrar listado de personas nombre - imagen 
router.post('/movies');
router.put('/movies');
router.delete('/movies');

router.get('/movies') // listado de peliculas, debe mostrar nombre e imagen y fecha
router.get('/movie:id');// obtener todos los datos de una pelicula por su id - junto los personajes de la misma 

// BUSQUEDAS y fILTRAR PELICULAS POR QUERY 

router.get('movies?name=nombre');  // busquedad peliculas por nombre 
router.get('movies?genre=idGenero'); // buscar peliculas por genero 
router.get('movies?order=ASC | DESC'); // filtrar resultados por fecha de creación y ordenarlos asc - des 



module.exports = router;