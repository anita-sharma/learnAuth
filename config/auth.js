module.exports={
	checkAuthenticate:(req,res,next)=>{
		if(req.isAuthenticated())
		{
			return next();
		}
		req.flash("error","login to access that resource")
		res.redirect("/user/login")
	},
	checkNotAuthenticate:(req,res,next)=>{
		if(req.isAuthenticated())
		{
			return res.redirect("/dashboard")
		}
		next();
	}
}