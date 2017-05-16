var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var postSchema   = new Schema({
    name: {
        type:String,
        required: true
    },
    brand: {
        type:String,
        required:true
    },
    type: {
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true
    },

    dis: {
        type: String,
        required: true
    },

    reply: [{
        name: String,
        rep: String
    }],


   },{
    timestamps: true
   }
   );

module.exports = mongoose.model('post', postSchema);


