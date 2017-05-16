var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var station_ownerSchema   = new Schema({
    name: {
        type:String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location:{lat:Number,lng:Number},

    address: {
        type: String,
        required: true,
    },

    service_type: {
        type: String,
        required: true
    },

    tele:{type: String, trim: true, index: true, unique: true, sparse: true},
    email:{type: String, trim: true, index: true, unique: true, sparse: true},

   },{
    timestamps: true
   }
   );

module.exports = mongoose.model('station_owner', station_ownerSchema);

station_ownerSchema.pre('save', function(next){
 
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
 
station_ownerSchema.methods.comparePassword = function(passwordAttempt, cb){
 
    bcrypt.compare(passwordAttempt, this.password, function(err, isMatch){
 
        if(err){
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
 
}
