var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var maped_stationSchema   = new Schema({
    name: String,
    location:{lat:Number,lng:Number},
    tele:Number,
    validation:Number

});

module.exports = mongoose.model('Maped_station', maped_stationSchema);