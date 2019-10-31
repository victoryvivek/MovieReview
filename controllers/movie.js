const MovieModel = require('../models/movie');
const http=require('http');
const request=require('request');

const APIKEY = "e2faa4d0";

exports.searchMovieForReview=(req,res,next)=>{
    let userId=req.params.userId;
    let movieName=req.query.movieName;
    let url = "http://www.omdbapi.com/?apikey="+APIKEY+"&t="+movieName;
    console.log('url '+url);
    let data='',parsedData;
    let isResponse,rating=0;

    http.get(url,resp=>{
        resp.on('data',chunk=>{
            data+=chunk;
        });
        resp.on('end', () => {
            console.log(JSON.parse(data));
            parsedData = JSON.parse(data);
            console.log(parsedData.Response);
            if(parsedData.Response=='True'){
                isResponse=true;
                let title=parsedData.Title;
                let year = parsedData.Year;
                let ratingArray = parsedData.Ratings;
                let genre=parsedData.Genre;
                let language = parsedData.Language;
                let posterUrl = parsedData.Poster;
                let plot = parsedData.Plot;
                let director=parsedData.Director;
                let writer=parsedData.Writer;

                for (let index = 0; index < ratingArray.length; index++) {
                    const element = ratingArray[index];
                    let result = element.Value.split("/");
                    rating += (Number(result[0]) / Number(result[1]))*5;
                }
                
                console.log("Rating "+rating);
                return res.render('movie_page', {
                    isResponse: isResponse,
                    title: title,
                    year: year,
                    genre: genre,
                    language: language,
                    posterUrl: posterUrl,
                    plot: plot,
                    director:director,
                    writer:writer,
                    rating:rating
                });
            }else{
                isResponse=false;
                return res.render('movie_not_found', {
                    userId:userId
                });
            }
        });
    }).on("error", (err) => {
        console.log("searchMovieForReview Error: " + err.message);
    });
};