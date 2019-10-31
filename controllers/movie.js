const MovieModel = require('../models/movie');
const http=require('http');
const request=require('request');

const APIKEY = "e2faa4d0";

exports.searchMovieForReview=(req,res,next)=>{
    let movieName=req.query.movieName;
    let url = "http://www.omdbapi.com/?apikey="+APIKEY+"&t="+movieName;
    console.log('url '+url);
    let data='',parsedData;

    http.get(url,resp=>{
        resp.on('data',chunk=>{
            data+=chunk;
        });
        resp.on('end', () => {
            console.log(JSON.parse(data));
            parsedData = JSON.parse(data);
            console.log(parsedData.Response);
            if(parsedData.Response=='True'){
                let title=parsedData.Title;
                let year = parsedData.Year;
                let ratingArray = parsedData.Ratings;
                let genre=parsedData.Genre;
                let language = parsedData.Language;
                let posterUrl = parsedData.Poster;
                let plot = parsedData.Plot;

            }else{

            }
        });
    }).on("error", (err) => {
        console.log("searchMovieForReview Error: " + err.message);
    });
};