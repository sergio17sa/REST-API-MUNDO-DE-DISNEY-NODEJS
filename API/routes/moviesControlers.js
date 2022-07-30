const { Characters, Movies, Genre, Movies_Characters } = require('../db');
const { v4: uuidv4 } = require('uuid');


const get_movies = async (req, res) => {

    const { name, genre, order } = req.query



   /* This is a function that is used to get all the movies from the database. */
    try {

        if (!name && !genre && !order) {

            const allMovies = await Movies.findAll({
                attributes: ['Title', 'Picture', 'CreateDate']

            });

            res.status(201).send(allMovies)
        } else {

            if (name) {

                const movieByName = await Movies.findAll({
                    where: {
                        Title: name.toLowerCase()
                    },
                    include: {
                        model: Characters,
                        attributes: ['Name'],
                        through: {
                            attributes: [],
                        },
                    }
                })

                res.status(201).send(movieByName)
            }

            if (genre) {

                if (genre.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)) {

                    const movieById = await Movies.findAll({
                        where: {
                            id: genre
                        },
                        include: {
                            model: Characters,
                            attributes: ['Name'],
                            through: {
                                attributes: [],
                            },
                        }
                    })

                    movieById.length > 0 ? res.status(201).send(movieById) :
                        res.status(200).send(`there are not movies with genre ${genre}`)
                } else {
                    res.status(200).send({ msg: `id ${genre} is not uuid` })
                }
            }

            if (order) {

                const SortMovieByDate = await Movies.findAll({})

                if (order === "DESC") {
                    const ascending = SortMovieByDate.sort((a, b) => (a.CreateDate > b.CreateDate) ? -1
                        : (b.CreateDate > a.CreateDate) ? 1 : 0)
                    res.status(201).send(ascending)

                } else {
                    const Descending = SortMovieByDate.sort((a, b) => (a.CreateDate > b.CreateDate) ? 1
                        : (b.CreateDate > a.CreateDate) ? -1 : 0)
                        res.status(201).send(Descending)
                }
            }
        }

    } catch (error) {
        res.status(404).send({ msg: 'not was possible to find movies ' })
    }
};


const getMovieById = async (req, res) => {

    const { id } = req.params;

    try {

        const movieDetail = await Movies.findOne({
            where: {
                id: id
            },
            include: {
                model: Characters,
                attributes: ['Age'],
                through: {
                    attributes: [],
                },
                model: Genre,
                attributes: ['Name'],
                through: {
                    attributes: [],
                },
            },

        })

        res.status(201).send(movieDetail)

    } catch (error) {
        res.status(404).send({ msg: 'not was possible to find movies ' })
    }
};


/**
 * It creates a movie and then creates a genre if it doesn't exist and then adds the genre to the
 * movie.
 * @param req - the request object
 * @param res - {
 */
const createMovie = async (req, res) => {

    const { Title, Rating, Picture, CreateDate, genres } = req.body

    try {

        const newMovie = await Movies.create({
            Title,
            Picture,
            Rating,
            CreateDate,
            id: uuidv4()
        });

        genres?.forEach(async ele => {
            const [newGenres] = await Genre.findOrCreate({
                where: {
                    Name: ele.Name
                },
                defaults: {
                    Picture: ele.Picture,
                    id: uuidv4()
                }
            });

            newMovie.addGenre(newGenres)
        })

        res.status(201).send('Movie created successful')

    } catch (error) {
        res.status(404).send({ error: 'Check movie information' })
    }
};

/**
 * It takes a movie object and updates it in the database.
 * @param req - The request object.
 * @param res - The response object.
 */
const updateMovie = async (req, res) => {


    const { Title, Rating, Picture, CreateDate, genres } = req.body
    const { id } = req.params;

    try {
        const movie = await Movies.findByPk(id)
        await movie.update({
            Title: Title.toLowerCase(),
            Picture,
            Rating,
            CreateDate,
        });

        genres?.forEach(async ele => {

            const genre = await Genre.findOne({
                where: {
                    Name: ele.Name
                }
            })


            if (genre) {
                await movie.addGenre(genre);
                console.log('genre add to movie successfull')
            } else {
                let [newGenre] = await Genre.findOrCreate({
                    where: {
                        Name: ele.Name,
                    },
                    defaults: {
                        Picture: ele.Picture,
                        id: uuidv4()
                    }
                });

                await movie.setGenres(newGenre);
                console.log('Genre created and add to movie successfull')
            }
        })

        res.status(201).send(movie)

    } catch (error) {
        res.status(404).send("movie update failed")
    }
};


/**
 * It deletes a movie from the database.
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const deleteMovie = async (req, res) => {

    const { id } = req.params;

    try {
        const movie = await Movies.findByPk(id);

        if (movie) {
            await movie.destroy();
            res.status(200).json({ msg: 'movie delete successfull' });
        } else {
            res.status(200).json({ msg: 'movie does not exists' });
        }

    } catch (error) {
        res.status(404).send('movie delete failed');
    }
};





module.exports = {

    get_movies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie

};
