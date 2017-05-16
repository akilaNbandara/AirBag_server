var BrandControler = require('./controlers/Brand_c'),  
    stationControler = require('./controlers/Service_stations'),
    voControler = require('./controlers/vo_authernication'),
    postCtrl = require('./controlers/postController')
    express = require('express'),
    ssoControler= require('./controlers/authenication')
    passportService = require('../config/passport'),
    passport = require('passport');
 
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
 
module.exports = function(apiRoutes){
 
    var routes = express.Router(),
        //apiRoutes=express.Router(),
        sscRoute= express.Route();
        //todoRoutes = express.Router();


     

 
    // Auth Routes
    
   
    

    apiRoutes.get('/Brands', BrandControler.getBrands);
    apiRoutes.post('/Brands', BrandControler.postBrand);
    apiRoutes.get('/Types', BrandControler.getTypes);
    apiRoutes.get('/Service_types', BrandControler.getService_types);


    apiRoutes.post('/maped_station', stationControler.postMaped_station);
    apiRoutes.get('/maped_station', stationControler.getMaped_stations);


    apiRoutes.get('/vehicle_owner', voControler.getVehicle_owners);
    apiRoutes.post('/vehicle', voControler.addVehicle);
    apiRoutes.post('/vehicle_owner', voControler.postVehicle_owner);
    apiRoutes.post('/vehicle_owner/login', voControler.login);
    //apiRoutes.post('/vehicle_owner/login', voControler.)


    apiRoutes.post('/station_owner', ssoControler.registerSSO);
    apiRoutes.get('/station_owner', ssoControler.getSSOs);
    apiRoutes.post('/station_owner/login', ssoControler.login);
    apiRoutes.get('/station_owner/protected',  requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });


    apiRoutes.post('/addPost', postCtrl.postPost);
    apiRoutes.get('/addPost', postCtrl.getAllPosts);
    apiRoutes.post('/getPosts', postCtrl.getPosts);
    apiRoutes.post('/addReply', postCtrl.addReply);


 
    //authRoutes.get('/protected', requireAuth, function(req, res){
      //  res.send({ content: 'Success'});
    //});
 
    // Todo Routes
    //apiRoutes.use('/todos', todoRoutes);
 
    //todoRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), TodoController.getTodos);
    //todoRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['creator','editor']), TodoController.createTodo);
    //todoRoutes.delete('/:todo_id', requireAuth, AuthenticationController.roleAuthorization(['editor']), TodoController.deleteTodo);
 
    // Set up routes
    //app.use('/api', apiRoutes);
  
   
    


 
}