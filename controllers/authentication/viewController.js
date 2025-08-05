const viewController = {
  signUp(req, res, next){
    res.render('authentication/SignUp')
  },
  signIn(req, res, next){
    res.render('authentication/SignIn')
  },
  apiAuth(req, res, next){
    res.json({user: req.user, token: res.locals.data.token})
  },
  redirectToLogin(req, res, next){
    res.redirect('/users/login')
  }

}

module.exports = viewController