const express=require("express");
const router=express.Router();
const bcrypt=require("bcryptjs")
const User=require("../models/user")
const passport =require("passport")
const {checkAuthenticate ,checkNotAuthenticate}=require("../config/auth")

//register page

router.get("/register",checkNotAuthenticate,(req,res)=>{
	res.render("register")
})
router.get("/login",checkNotAuthenticate,(req,res)=>{
	res.render("login")
})

//registration handling
router.post("/register",(req,res)=>{
	const {name,email,password1,password2}=req.body;
	if(!name || !email || !password1 || !password2)
	{
		return res.render("register",{
			error_msg:"plz fill all fields"
		})
		

	}
	if(password1.length<8)
	{
		return res.render("register",{
			error_msg:"password must have atleast 8 characters"
		})
		
	}
	if(password1!=password2)
	{
		return res.render("register",{
			error_msg:"password dont match"
		})

	}
	User.findOne({
		email:email
	}).then(user=>{
		if(user)
		{
		return res.render("register",{
				error_msg:"this email already registered"
			})	
		}
		else
		{
			bcrypt.genSalt(10,(err,salt)=>{
				if(err) throw err
				bcrypt.hash(password1,salt,(err,hashed)=>{
					if(err) throw err
					const newUser=new User({
						name,
						email,
						password:hashed
					});
				newUser.save();
				.then(user=>{
					req.flash("success_msg","u registered successfully and can login now");
					res.redirect("/user/login")
				})
				.catch((err)=>{
					console.log("error")
				})
				});
			});
		}
	});

})

//login handling usingh passportjs
router.post("/login",(req,res,next)=>{
	passport.authenticate("local",{
		successRedirect:"/dashboard",
		failureRedirect:"/user/login",
		failureFlash:true
	})(req,res,next);
})

module.exports=router;