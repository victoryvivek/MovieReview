const express=require('express');

const router=express.Router();

const movieControllers = require('../controllers/movie');


router.get('/all', movieControllers.getAllMovies);
router.get('/specific/:movieId', movieControllers.getSpecificMovie);
router.put('/add/:movieId',movieControllers.addMovie);
router.delete('/delete/:movieId',movieControllers.deleteMovie);
router.put('/add/review/:movieId/:userId',movieControllers.addReview);

module.exports=router;