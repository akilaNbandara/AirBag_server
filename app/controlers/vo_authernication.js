var Vehicle_owner = require('../models/vehicle_owner');
var authConfig = require('../../config/auth'); 
var jwt = require('jsonwebtoken');  


function generateToken(user){
    return jwt.sign(user,authConfig.secret,{
        expiresIn:10080
    })
}

function setUserInfo(request){
    return {
        _id: request._id,
        name: request.name,
        primary_vehi:request.primary_vehi,
        vehi:request.vehi,     
        tele:request.tele,
        email: request.email}
               
}


exports.postVehicle_owner = function(req, res) {
        
        var vo = new Vehicle_owner(); 
             // create a new instance of the Bear model
        vo.name = req.body.username;
        
        vo.password=req.body.password;
        vo.primary_vehi=req.body.primary_vehicle;
        if (req.body.tele){     
        vo.tele=req.body.tele;} 

        if (req.body.email){
        vo.email= req.body.email;}
        // save the bear and check for errors
        vo.save(function(err) {
            if (err)
                return res.send(err);

            res.json({ message: 'vehicle_owner created!' });
        });

        
        
    }

exports.addVehicle = function(req, res) {

        Vehicle_owner.update({name:req.body.username},
            {$push:{"vehi":
                {
                    brand:req.body.brand, 
                    type:req.body.type,     
                    modelNumber:req.body.modelNo, 
                    year:req.body.year
                }}
            },{safe:true, new:true},
                (err,route)=>{
                    if (err)
                        res.send(err);
                    res.send({message:"add a vehicle"});
                });

    }

exports.getVehicle_owners= function(req,res){
        
        Vehicle_owner.find(function(err,vehicle_owner){
            if (err)
                res.send(err);

            res.json(vehicle_owner);
        });
    }


exports.login = function(req, res, next){

    console.log('local login call with'+ req.body.name);
 
    Vehicle_owner.findOne({
        name: req.body.name
    }, function(err, user){
 
        if(err){
            return next(err);
        }
 
        if(!user){
            return next(null, false, {error: 'Login failed. Please try again.'});

        }
       console.log("yes yes find you user: "+ user)
 
            if(user.password!=req.body.password){
                return next(null, false, {error: 'Login failed. Please try again.'});
            }
            var userInfo = setUserInfo(user);
    // `req.user` contains the authenticated user.
 
            res.status(200).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            }); 

            //return next(null,false, user)      
 
       
 
    });
 
    
}
