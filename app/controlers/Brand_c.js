var Brand = require('../models/Brand');
var Service_types = require('../models/Service_types');
var Type = require('../models/type');


exports.getBrands = function(req,res,next){
	Brand.find((err,brand)=> {
		if (err)
			res.send(err);
		res.json(brand);
	})
}

exports.postBrand = function(req, res) {
        
        var brand = new Brand();      // create a new instance of the Bear model
        brand.name = req.body.name; // set the bears name (comes from the request)

        // save the bear and check for errors
        brand.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Brand created!' });
        });
        
    }



exports.getTypes = function(req, res) {
        Type.find(function(err, Types) {
            if (err)
                res.send(err);

            res.json(Types);
        });
    }


exports.getService_types = function(req,res,next){
	Service_types.find((err,Service_types)=> {
		if (err)
			res.send(err);
		res.json(Service_types);
	})
}


