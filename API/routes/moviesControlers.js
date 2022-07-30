const { Characters, Movies, Genre, Movies_Characters } = require('../db');
const { v4: uuidv4 } = require('uuid');


const get_movies = async (req, res) => {

    try {

        const allMovies = await Movies.findAll({
            attributes: ['Title', 'Picture', 'CreateDate']

        });

        res.status(201).send(allMovies)

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
