/**
  redirect and user sessions
*/

//creates 
exports.createSession = function(req,res,newUser) {
  //creates a new session
  return req.session.regenerate(function(err) {
    if (!err) {
      req.session.user = newUser;
      res.redirect('/');
    } else {
      throw (err);
    }
  });
};

//returns boolean of whether user is logged in or not
exports.isLoggedIn = function(req,res) {
  return req.session ? !!req.session.user : false;
};

exports.checkUser = function(req,res,next) {
  if (!exports.isLoggedIn(req)) {
    res.redirect('/login');
  } else {
    next();
  }
};