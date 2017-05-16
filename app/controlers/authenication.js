var jwt = require('jsonwebtoken');  
var station_owner = require('../models/station_owner');
var authConfig = require('../../config/auth');  // auth.js contain the secret 


function generateToken(user){
	return jwt.sign(user,authConfig.secret,{
		expiresIn:10080
	})
}

function setUserInfo(request){
    return {
        _id: request._id,
        name: request.name,
        address:request.address,
        location:request.location,
        service_type:request.service_type,     
        tele:request.tele,
        email: request.email}
       
        
}

exports.login = function(req, res, next){

    console.log('local login call with'+ req.body.name);
 
    station_owner.findOne({
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

            return next(null,false, userInfo)      
 
       
 
    });
 
    
}



exports.registerSSO = function(req, res, next){
 
    var name = req.body.username;      
    var password=req.body.password;
    var address=req.body.address;
    var location=req.body.location;
    var service_type=req.body.service_type;         
    var tele=req.body.tele;       
    var email= req.body.email;
        // save the bear and check for errors
        
 
 
    if(!password){
        return res.status(422).send({error: 'You must enter a password'});
    }

    if(!name){
        return res.status(422).send({error: 'You must enter a username'});
    }


 
    let user = new station_owner({
        name: name,
        password:password,
        address: address,
        location: location,
        service_type: service_type,     
        tele: tele,
        email: email
    });
    user.save((err,user)=>{
        if(err){
            console.log(err)
            return next(null,false,err);
        }
        var userInfo = setUserInfo(user);
        res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
        });
        console.log(null,false, userInfo)
        return (userInfo)

    });
}


exports.getSSOs= function(req,res){
        
        station_owner.find(function(err,vehicle_owner){
            if (err)
                res.send(err);

            res.json(vehicle_owner);
        });
    }

exports.roleAuthorization = function(roles){
 
    return function(req, res, next){
 
        var user = req.station_owner;
 
        User.findById(user._id, function(err, foundUser){
 
            if(err){
                res.status(422).json({error: 'No user found.'});
                return next(err);
            }
 
            if(roles.indexOf(foundUser.role) > -1){
                return next();
            }
 
            res.status(401).json({error: 'Sorry! You are not authorized to view this content'});
            return next('Unauthorized');
 
        });
 
    }
}


