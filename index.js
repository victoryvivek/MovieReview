const path=require('path');
const express =require('express');
const bodyParser=require('body-parser');

const app=express();

app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    console.log('Hey');
});

app.listen(3000,()=>{
    console.log("server runnning");
});