var express = require('express');
var routeHandler = express.Router();
var path = require('path');


var mobileApiRouter = require('./routes/mobile/mobileApiRouter');
var webApiRouter = require('./routes/web/webApiRouter');
var authRouter = require('./routes/web/authRouter');


//serve signup page as default
routeHandler.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

//serve all static files
routeHandler.use(express.static(__dirname + './../client'));


routeHandler.use('/api/mobile', mobileApiRouter);
routeHandler.use('/api/web', webApiRouter);

routeHandler.post('/signup', authRouter.checkSignup);
routeHandler.post('/login', authRouter.checkLogin);
routeHandler.get('/logout', authRouter.checkLogout);


//////////////////////////////TESTS


//Send back sample polygon data
routeHandler.get('/polygontest', function(req, res) {
  var result = [{'region_name':null,'region_id':null,'region_attr':{'coordinates':[{'latitude':37.789632990297335,'longitude':-122.43344306945801},{'latitude':37.78881903702128,'longitude':-122.41988182067871},{'latitude':37.78230708804992,'longitude':-122.4261474609375}],'fill':{'color':'#0C04E0','opacity':0.3},'stroke':{'color':'#0C04E0','weight':3,'opacity':0.3}},'actions':[]},
  {'region_name':null,'region_id':null,'region_attr':{'coordinates':[{'latitude':37.80844468221533,'longitude':-122.43247747421265},{'latitude':37.80340948481957,'longitude':-122.43159770965576},{'latitude':37.80417241558344,'longitude':-122.42537498474121},{'latitude':37.805986463750365,'longitude':-122.42552518844604}],'fill':{'color':'#7EBF71','opacity':0.3},'stroke':{'color':'#7EBF71','weight':3,'opacity':0.3}},'actions':[]}];

  var payload = JSON.stringify(result);
  res.send(200, payload);
});
//Log out sample polygon POST data
routeHandler.post('/polygontest', function(req, res) {
  console.log(req.body);
  res.send(200);
});


///////////////////END TEST

module.exports = routeHandler;
