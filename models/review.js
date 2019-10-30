const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const reviewSchema=new Schema({
    userId:{
        type:String,
        required:true
    },
    movieReview:{
        type: String,
        required: true
    },
    movieId:{
        type: String,
        required: true
    },
    movieRating:{
        type: String,
        required: true
    }
});

module.exports=mongoose.model('ReviewModel',reviewSchema);