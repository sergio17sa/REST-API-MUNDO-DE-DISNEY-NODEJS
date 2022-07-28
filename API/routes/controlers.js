const { Characters, Movies, Genre } = require('../db');
const { v4: uuidv4 } = require('uuid');




const get_character = async (req, res) => {

try {
    
const allCharacters = await Characters.findAll({})

res.status(201).json(allCharacters)


} catch (error) {
    res.send({error: 'no fue posible obtener los personajes'})
}

};



const create_character = async (req, res) => {

    const { Name, Picture, Age, Weight, History, movies, genres} = req.body;

    //movies = [{Titulo, Imagen, echa_de_creación, Calificacion}, {Titulo, Imagen, echa_de_creación, Calificacion}]
    //genres = [{Nombre, Imagen},{Nombre, Imagen},{Nombre, Imagen}]
    
   // try {

        const newCharacter = await Characters.create({
            Name,
            Picture,
            Age,
            Weight,
            History,
            id: uuidv4()
        });


    movies?.forEach( async ele => {

        let genresMovies = []
        const genresMovie = ele.genres.forEach(async genre => {
 
            var [dbgenres] = await Genre.findOrCreate({
                where:{
                    Name: genre.Name
                },
                defaults:{
                    Picture: genre.Picture,
                    id: uuidv4()
                }
            });
            console.log(dbgenres)
            genresMovies.push(dbgenres)
        })
        
        
        
        let [dbmovies] = await Movies.findOrCreate({
            where:{
                Title: ele.Title, 
            },
            defaults:{
                Picture: ele.Picture,
                Rating: ele.Rating,
                CreateDate: ele.CreateDate,
                id: uuidv4()
            }
            
        });
        
        console.log(dbmovies)
                 dbmovies.addGenre(genresMovies)
                 newCharacter.addMovies(dbmovies)
            });

       
        res.status(201).send('Personaje creado con exito')

   // } catch (error) {

       // res.status(404).send({ error: 'valida la información del personaje' })

   // }

};

module.exports = {
    create_character,
    get_character
};