// app/models/brand.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BrandSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Brand', BrandSchema);