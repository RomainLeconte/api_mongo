const User = require('../models/users');
const Movie = require('../models/movies');

module.exports = {
    readAll(req, res) {
        User.find()
            .then((users) => {
                res.send(users);
            })
    },
    read(req, res) {
        const { id } = req.params;
        User.findById(id)
            .then((user) => {
                res.send(user);
            })
    },
    create(req, res) {
        const name = req.body.name;
        const age = req.body.age;
        const user = new User({ name, age });
        const movie = new Movie({ title: 'Harry Potter', duration: '98' })
        user.movies.push(movie);
        user.save()
            .then(() => {
                movie.save()
                    .then(() => {
                        res.send({ result: user })
                    })
            })
    },
    delete(req, res) {
        const { id } = req.body;
        User.findByIdAndRemove(id)
            .then((user) => {
                res.send({ result: user })
            })
    },

    oldest(req, res) {
        User.find().sort({ 'age': -1 }).limit(3)
            .then((user) => {
                res.send(user);
            })
    },

    youngest(req, res) {
        User.find().sort({ 'age': 1 }).limit(3)
            .then((user) => {
                res.send(user);
            })
    },
    hasLongestmovie(req, res) {
        User.aggregate([

            { $unwind: "$movies" },
            {
                $lookup: {
                    from: "Movies_Collecion",
                    localField: "movies",
                    foreignField: "_id",
                    as: "movieContent"
                }
            },
            { $unwind: "$movieContent" },
            { $sort: { "movieContent.duration": -1 } },
            { $limit: 1 },
            { $project: { "User name": "$name", "Movie title": "$movieContent.title", "Duration": "$movieContent.duration" } }



        ]).then( (info) => {
            res.send(info);
        });
    }
};