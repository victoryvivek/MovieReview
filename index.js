const path=require('path');
const express =require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const app=express();

app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    console.log('Hey');
});

mongoose
    .connect(
        "mongodb+srv://victory_vivek:vivek123@book-cluster-od9xo.mongodb.net/movieDatabase?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(result => {
        app.listen(8000, () => {
            console.log("db connected");
        });

    })
    .catch(err => {
        console.log('Error in code');
        console.log(err);
    });
