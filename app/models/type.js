
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var typeSchema   = new Schema({
    name: String,
    brands: []
});

module.exports = mongoose.model('Type', typeSchema);