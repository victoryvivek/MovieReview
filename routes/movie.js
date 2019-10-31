const express=require('express');

const router=express.Router();

const movieControllers = require('../controllers/movie');

router.get('/search',movieControllers.searchMovieForReview);
router.get('/search/:userId', movieControllers.searchMovieForReview);

module.exports=router;