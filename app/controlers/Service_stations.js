var Maped_station = require('../models/maped_station');


exports.postMaped_station = function(req, res) {
        
        var ms = new Maped_station();      // create a new instance of the Bear model
        ms.name = req.body.name;
        ms.location=req.body.location;
        ms.tele=req.body.tele;
        ms.validation=req.body.validation; // set the bears name (comes from the request)

        // save the bear and check for errors
        ms.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'maped created!' });
        });
        
    }


exports.getMaped_stations = function(req,res){
        
        Maped_station.find(function(err,maped_stations){
            if (err)
                res.send(err);

            res.json(maped_stations);
        });
    }