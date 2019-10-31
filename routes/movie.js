const express=require('express');

const router=express.Router();

const movieControllers = require('../controllers/movie');

router.get('/search',movieControllers.searchMovieForReview);

module.exports=router;