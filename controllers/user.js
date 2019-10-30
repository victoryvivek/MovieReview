const UserModel=require('../models/user');
const UserAboutModel=require('../models/user_about');
const bcrypt=require('bcrypt');

exports.registerUser = (req, res, next) => {
    const firstName=req.body.first_name;
    const lastName = req.body.last_name;
    const userName = req.body.user_name;
    const password = req.body.user_password;
    const email = req.body.email;
    const contactNo = req.body.contact_no;

    bcrypt.hash(password,12).then(encryptedPassword=>{
        const user=new UserModel({firstName:firstName,lastName:lastName,userName:userName,
            password:encryptedPassword,email:email,contactNo:contactNo});
        return user.save();
    }).then(user=>{
        const aboutUser=new UserAboutModel({userId:user._id});
        aboutUser.save();
        return res.redirect('/home?id='+user._id);
    }).catch(err=>{
        console.log("Error: "+err);
        res.render('registration',{message:'Error occured in registering....Try Again'});
    });
};

exports.loginUser = (req, res, next) => {
    const userName=req.body.user_name;
    const password=req.body.user_password;
    let currentUser;

    UserModel.findOne({userName:userName}).then(user=>{
        if(!user){
            return res.render('login',{message:'Invalid username...Try Again'});
        }
        currentUser=user;
        return bcrypt.compare(password,user.password);
    }).then(isEqual=>{
        if(!isEqual){
            return res.render('login', {
                message: 'Wrong Password...Try Again'
            });
        }
        return res.redirect('/home?id=' + currentUser._id);
    }).catch(err=>{
        console.log("Error: " + err);
        res.render('login', {
            message: 'Error occured in Logging in....Try Again'
        });
    });
};

exports.renderRegisterPage=(req,res,next)=>{
    res.render('registration');
};

exports.renderLoginPage = (req,res, next) => {
    res.render('login');
};

exports.logoutUser=(req,res,next)=>{
    return res.redirect('/home');
};

exports.userProfile = (req, res, next) => {
    let userId=req.params.userId;
    let firstName,lastName,about,hobbies,favouriteMovies,noOfReviews;
    UserModel.findById(userId).then(user=>{
        firstName=user.firstName;
        lastName = user.lastName;   
        return lastName;
    }).then(lastName=>{
        UserAboutModel.findOne({userId:userId}).then(aboutUser=>{
            about=aboutUser.about;
            hobbies=aboutUser.hobbies;
            favouriteMovies=aboutUser.favouriteMovies;
            noOfReviews=aboutUser.noOfReviews
            return res.render('user_profile',{firstName:firstName,lastName:lastName,
                about:about,hobbies:hobbies,favouriteMovies:favouriteMovies,noOfReviews:noOfReviews});
        }).catch(err=>{
            console.log(err);
            return res.redirect('/home?id=' + userId);
        });
    }).catch(err=>{
        console.log(err);
        return res.redirect('/home?id=' + userId);
    })
    
};
