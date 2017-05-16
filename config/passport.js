var passport = require('passport');
var User = require('../app/models/station_owner');
var config = require('./auth');

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var LocalStrategy = require('passport-local').Strategy;


var localLogin = new LocalStrategy( function(owner, done){
    console.log('local login call with'+ owner);
 
    User.findOne({
        name: owner.name
    }, function(err, user){
 
        if(err){
            return done(err);
        }
 
        if(!user){
            return done(null, false, {error: 'Login failed. Please try again.'});
        }
 
        user.comparePassword(owner.password, function(err, isMatch){
 
            if(err){
                return done(err);
            }
 
            if(!isMatch){
                return done(null, false, {error: 'Login failed. Please try again.'});
            }
 
            return done(null, user);
 
        });
 
    });
 
});

/*jwtFromRequest:(REQUIRED) Function 
that accepts a request as the only parameter and returns
either the JWT as a string or null.
secretOrKey : REQUIRED string or buffer containing the secret
(symmetric) or PEM-encoded public key (asymmetric) for verifying the token's signature.*/
var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(), 
    secretOrKey: config.secret
};

/*jwt_payload is an object literal containing the decoded JWT payload.
done is a passport error first callback accepting arguments done(error, user, info)*/

var jwtLogin=new JwtStrategy(jwtOptions,(payload,done)=>{
	User.findById(payload._id,(err,user)=>{
		if(err){
			return done(err);
		}
		if(user){
			done(null,user);
		}else{
			done(null,false);
		}
	});
});

passport.use(jwtLogin);
passport.use(localLogin);