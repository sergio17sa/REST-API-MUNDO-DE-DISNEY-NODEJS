const { Router } = require('express');
const {create_character, get_character,updateCharacter, deleteCharacter, getCharacterDetail} = require('./charactersControlers');
const { get_movies, getMovieById, createMovie, updateMovie, deleteMovie } = require('./moviesControlers');


const router = Router();

// CHARACTERS

router.get('/characters', get_character); // debe mostrar listado de personas nombre - imagen 
router.post('/characters', create_character);
router.put('/characters/:id', updateCharacter);
router.delete('/characters/:id', deleteCharacter);

// DETALLE DE PERSONAJE POR PARAMS
router.get('/characters/:id' ,getCharacterDetail);// obtener el detalle de un personaje por id


// BUSQUEDAS y fILTRAR PERSONAJES POR QUERY 

// router.get('characters?name=nombre');  // busquedad por nombre 
// router.get('characters?age=edad'); // por edad
// router.get('characters?movies=idM0vie'); // busquedad por peliculas en la que participado 

// MOVIES

router.get('/movies', get_movies,); // listado de peliculas, debe mostrar nombre e imagen y fecha
router.post('/movies', createMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

// DETALLE DE PERSONAJE POR PARAMS
router.get('/movies/:id', getMovieById);// obtener todos los datos de una pelicula por su id - junto los personajes de la misma 

// BUSQUEDAS y fILTRAR PELICULAS POR QUERY 

// router.get('movies?name=nombre');  // busquedad peliculas por nombre 
// router.get('movies?genre=idGenero'); // buscar peliculas por genero 
// router.get('movies?order=ASC | DESC'); // filtrar resultados por fecha de creación y ordenarlos asc - des 



module.exports = router;