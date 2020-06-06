const express=require("express");
const router=express.Router();
const {checkAuthenticate ,checkNotAuthenticate}=require("../config/auth")

//first page
router.get("/",checkNotAuthenticate,(req,res)=>{
	res.redirect("/user/register");
})

// dashboard
router.get("/dashboard",checkAuthenticate,(req,res)=>{
	res.render("dashboard",{
		name:req.user.name
	})
})

//logout

router.get("/logout",checkAuthenticate,(req,res)=>{
	req.flash("success_msg","you are successfully logged out");
	req.logout();
	res.redirect("/user/login")
})


module.exports=router;