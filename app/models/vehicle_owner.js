var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var vehicle_ownerSchema   = new Schema({
    name: {
        type:String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    vehi: [
    /*{
    	brand:String,
    	type:String,
    	modelNumber:Number
    }*/
    ],

    primary_vehi: {
        type: Schema.Types.Mixed,
        //required: true,
        defalt: 'defalt_vehicle'

    },

    tele:{type: String, trim: true, index: true, unique: true, sparse: true},
    email:{type: String, trim: true, index: true, unique: true, sparse: true}
        

});

module.exports = mongoose.model('vehicle_owner', vehicle_ownerSchema);
/*vehicle_ownerSchema.pre('save', function(next){
 
    var user = this;
    var SALT_FACTOR = 5;
 
    if(!user.isModified('password')){
        return next();
    } 
 
    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
 
        if(err){
            return next(err);
        }
 
        bcrypt.hash(user.password, salt, null, function(err, hash){
 
            if(err){
                return next(err);
            }
 
            user.password = hash;
            next();
 
        });
 
    });
 
});
 
vehicle_ownerSchema.methods.comparePassword = function(passwordAttempt, cb){
 
    bcrypt.compare(passwordAttempt, this.password, function(err, isMatch){
 
        if(err){
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
 
}*/


