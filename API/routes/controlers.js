const { Characters, Movies, Genre } = require('../db');
const { v4: uuidv4 } = require('uuid');




const get_character = async (req, res) => {

    try {

        const allCharacters = await Characters.findAll({})

        const charactersName_Picture = allCharacters.map(c => {
            return {
                Name: c.Name,
                Picture: c.Picture
            }

        })

        res.status(201).json(charactersName_Picture)


    } catch (error) {
        res.send({ error: 'no fue posible obtener los personajes' })
    }

};



const create_character = async (req, res) => {

    const { Name, Picture, Age, Weight, History, movies } = req.body;

    //movies = [{Titulo, Imagen, fecha_de_creación, Calificacion}, {Titulo, Imagen, echa_de_creación, Calificacion}]
    //genres = [{Nombre, Imagen},{Nombre, Imagen},{Nombre, Imagen}]

    try {

        const newCharacter = await Characters.create({
            Name,
            Picture,
            Age,
            Weight,
            History,
            id: uuidv4()
        });


        movies?.forEach(async ele => {

            let genres = []
            const genresMovie = ele.genres.forEach(async genre => {

                var [dbgenres] = await Genre.findOrCreate({
                    where: {
                        Name: genre.Name
                    },
                    defaults: {
                        Picture: genre.Picture,
                        id: uuidv4()
                    }
                });
                genres.push(dbgenres)
            })


            let [dbmovies] = await Movies.findOrCreate({
                where: {
                    Title: ele.Title,
                },
                defaults: {
                    Picture: ele.Picture,
                    Rating: ele.Rating,
                    CreateDate: ele.CreateDate,
                    id: uuidv4()
                }
            });

            dbmovies.addGenre(genres)
            newCharacter.addMovies(dbmovies)
        });

        res.status(201).send('Character created successful')

    } catch (error) {
        res.status(404).send({ error: 'Check character information' })
    }

};


const updateCharacter = async (req, res) => {

    const { Name, Picture, History, Age, Weight, movies } = req.body;

    const { id } = req.params;

    try {

        const character = await Characters.findByPk(id)

        await character.update({
            Name,
            Picture,
            History,
            Age,
            Weight
        });

        movies?.forEach(async ele => {

            let genres = []
            const genresMovie = ele.genres.forEach(async genre => {

                var [dbgenres] = await Genre.findOrCreate({
                    where: {
                        Name: genre.Name
                    },
                    defaults: {
                        Picture: genre.Picture,
                        id: uuidv4()
                    }
                });
                genres.push(dbgenres)
            })

            const movie = await Movies.findOne({
                where: {
                    Title: ele.Title
                }
            })

            if (movie) {

                await character.setMovies(movie);
                console.log('movie add to character successfull')

            } else {

                let [newmovie] = await Movies.findOrCreate({
                    where: {
                        Title: ele.Title,
                    },
                    defaults: {
                        Picture: ele.Picture,
                        Rating: ele.Rating,
                        CreateDate: ele.CreateDate,
                        id: uuidv4()
                    }
                });

                newmovie.addGenre(genres)
                await character.setMovies(newmovie);
                console.log('movie created and add to character successfull')
            }
        })

        res.send(character)

    } catch (error) {
        res.status(404).send("character update failed")
    }
};


const deleteCharacter = async (req, res) => {

    const { id } = req.params;

    try {

        const character = await Characters.findByPk(id);

        if (character) {
            await character.destroy();
            res.status(200).json({ msg: 'character delete successfull' });

        } else {
            res.status(200).json({ msg: 'character does not exists' });
        }

    } catch (error) {
        res.status(404).send('character delete failed');
    }

};



module.exports = {
    create_character,
    get_character,
    updateCharacter,
    deleteCharacter
};