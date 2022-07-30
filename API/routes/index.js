const { Router } = require('express');
const validateUser = require('../middleware/validateUsers');
const {create_character, get_character,updateCharacter, deleteCharacter, getCharacterDetail} = require('./charactersControlers');
const { get_movies, getMovieById, createMovie, updateMovie, deleteMovie } = require('./moviesControlers');
const { loginUser } = require('./userloggin');
const {userRegister} = require('./userRegister');


/* A router. */
const router = Router();

// CHARACTERS

router.get('/characters', validateUser,  get_character); 
router.post('/characters', validateUser, create_character);
router.put('/characters/:id', validateUser, updateCharacter);
router.delete('/characters/:id', validateUser, deleteCharacter);

// DETALLE DE PERSONAJE POR PARAMS
router.get('/characters/:id' ,validateUser, getCharacterDetail);


// BUSQUEDAS y fILTRAR PERSONAJES POR QUERY 

// router.get('characters?name=nombre'); 
// router.get('characters?age=edad'); 
// router.get('characters?movies=idM0vie'); 

// MOVIES

router.get('/movies', validateUser,  get_movies,); 
router.post('/movies', validateUser, createMovie);
router.put('/movies/:id', validateUser, updateMovie);
router.delete('/movies/:id', validateUser, deleteMovie);

// DETALLE DE PERSONAJE POR PARAMS
router.get('/movies/:id', validateUser, getMovieById);

// BUSQUEDAS y fILTRAR PELICULAS POR QUERY 

// router.get('movies?name=nombre');  // busquedad peliculas por nombre 
// router.get('movies?genre=idGenero'); // buscar peliculas por genero 
// router.get('movies?order=ASC | DESC'); // filtrar resultados por fecha de creación y ordenarlos asc - des 


router.post('/auth/register' , userRegister)
router.post('/auth/login' , loginUser)



module.exports = router;