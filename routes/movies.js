const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre } = require('../models/genre');
const { Movie } = require('../models/movie');

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.get('/:id', async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      res.send(movie);
    } catch (ex) {
      if (ex) res.status(404).send('No such Movie');
    }

})

router.post('/', [auth], async (req, res) => {
  if (!req.body.title) res.status(400).send('Bad request. Movie needs a title');
  
  const genre = await Genre.findById(req.body.genre);
  if (!genre) return res.status(400).send('Invalid genre');
  
  let movie = await new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    liked: req.body.liked
  });
  
  movie = await movie.save();
  
  res.send(movie);
});

router.put('/:id', [auth, admin], async (req, res) => {
  if (!req.body.title) res.status(400).send('Bad request. Movie needs a title');
  
  const genre = await Genre.findById(req.body.genre);
      if (!genre) return res.status(400).send('Invalid genre');

      const movie = await Movie.findByIdAndUpdate(req.params.id, { 
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        liked: req.body.liked
      }, { new: true });
      
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    
    res.send(movie);



});

router.delete('/:id', [auth, admin], async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
    res.send(movie);
  });

module.exports = router; 