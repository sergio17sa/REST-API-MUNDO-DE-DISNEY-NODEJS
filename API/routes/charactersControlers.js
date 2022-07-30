const { Characters, Movies, Genre, Movies_Characters } = require('../db');
const { v4: uuidv4 } = require('uuid');



/**
 * If the query parameters are empty, then return all characters with their names and pictures. 
 * If the query parameters are not empty, then return the characters that match the query parameters.
 * @param req - The request object.
 * @param res - the response object
 */
const get_character = async (req, res) => {

    const { name, age, weight, movies } = req.query;

    try {

        if (!name && !age && !weight && !movies) {

            const allCharacters = await Characters.findAll({
                attributes: ['Name', 'Picture']
            });

            // const charactersName_Picture = allCharacters.map(c => {
            //     return {
            //         Name: c.Name,
            //         Picture: c.Picture
            //     }
            // });

            res.status(201).json(allCharacters)

        } else {

            if (name) {

                const findCharacterByName = await Characters.findAll({
                    where: {
                        Name: name.toLowerCase()
                    },
                    include: {
                        model: Movies,
                        attributes: ['Title'],
                        through: {
                            attributes: [],
                        },
                    }
                });

                findCharacterByName.length > 0 ? res.status(201).send(findCharacterByName)
                    : res.status(200).send({ msg: 'Character does not exist' })
            }

            if (age) {

                const filterCharactersByAge = await Characters.findAll({
                    where: {
                        Age: age
                    },
                    include: {
                        model: Movies,
                        attributes: ['Title'],
                        through: {
                            attributes: [],
                        },
                    }
                });

                filterCharactersByAge.length > 0 ? res.status(201).send(filterCharactersByAge)
                    : res.status(200).send({ msg: `There are not characters with ${age} years old` })
            }

            if (weight) {

                const filterCharactersByWeight = await Characters.findAll({
                    where: {
                        Weight: weight
                    },
                    include: {
                        model: Movies,
                        attributes: ['Title'],
                        through: {
                            attributes: [],
                        },
                    }
                });

                filterCharactersByWeight.length > 0 ? res.status(201).send(filterCharactersByWeight)
                    : res.status(200).send({ msg: `There are not characters with weight ${weight}` })
            }

            if (movies) {

                if (movies.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)) {

                    const findmovies = await Movies.findAll({
                        where: {
                            id: movies
                        },
                        include: {
                            model: Characters,
                            attributes: ['Name'],
                            through: {
                                attributes: [],
                            }
                        }
                    });

                    const movieCharacters = findmovies.map(el => {
                        return el.Characters.map(el => el.Name)
                    });

                    movieCharacters.length > 0 ? res.status(201).send(movieCharacters)
                        : res.status(200).send({ msg: `There are not movies with id ${movies}` })

                } else {
                    res.status(200).send({ msg: ` id ${movies} is not uuid` })
                }
            }
        }

    } catch (error) {
        res.send({ error: 'no fue posible obtener los personajes' })
    }
};



/**
 * It creates a character and then creates a movie and then creates a genre and then adds the genre to
 * the movie and then adds the movie to the character.
 * </code>
 * @param req - {
 * @param res - {
 */
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


/**
 * It takes a character object, and updates the character in the database. If the character has movies,
 * it will add the movies to the database if they don't exist, and then add the movies to the
 * character.
 * @param req - the request object
 * @param res - the response object
 */
const updateCharacter = async (req, res) => {

    const { Name, Picture, History, Age, Weight, movies } = req.body;
    const { id } = req.params;

    try {
        const character = await Characters.findByPk(id)
        await character.update({
            Name: Name.toLowerCase(),
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

        res.status(201).send(character)

    } catch (error) {
        res.status(404).send("character update failed")
    }
};


/**
 * It takes the id of the character to be deleted from the request parameters, finds the character in
 * the database, and if it exists, deletes it.
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
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



const getCharacterDetail = async (req, res) => {

    const { id } = req.params;

    try {
        const getOneCharacter = await Characters.findOne({
            where: {
                id: id
            },
            include: {
                model: Movies,
                attributes: ['Title'],
                through: {
                    attributes: [],
                },
            }
        })

        if (getOneCharacter) {
            res.status(201).send(getOneCharacter)
        } else {
            res.status(200).send({ msj: 'Character does not exists' })
        }

    } catch (error) {
        res.status(404).send({ msg: 'Failed to find character' })
    }
};


module.exports = {
    create_character,
    get_character,
    updateCharacter,
    deleteCharacter,
    getCharacterDetail
};