const express=require("express")
const userrouter=require("./routs/user")
const mongoose=require("mongoose")
const webrouter=require("./routs/index")
const flash=require("connect-flash")
const session=require("express-session")
const layouts=require("express-ejs-layouts")
const passport=require("passport")
const User=require("./models/user")
const initialize=require('./config/passport-config')

//passport
initialize(passport);




//database connecton
mongoose.connect("mongodb://localhost/learnAuth",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
	console.log("database connected")})
.catch((err)=>{
	console.log(err);
})


const app=express();
app.use(express.urlencoded({
	extended:false
}))

app.use(layouts)

app.use(session({
	secret:"mysecret",
	resave:true,
	saveUninitialized:true
}));

app.use(flash());

app.use(passport.initialize()); //this is passport middleware  not our function
app.use(passport.session());

app.set("view engine","ejs")

//global variables
app.use((req,res,next)=>{
	res.locals.success_msg=req.flash("success_msg");
	res.locals.error=req.flash("error")
	next();
});


app.use("/user",userrouter)
app.use("/",webrouter)

app.listen(5000,()=>{
	console.log("server is running")
})