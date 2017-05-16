var post = require('../models/post');

exports.postPost = function(req, res) {
        
        var p = new post();      // create a new instance 

        p.name = req.body.name;
        p.brand= req.body.brand;
        p.type=req.body.type; 
        p.title=req.body.title;
        p.dis=req.body.dis;

        p.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'post created!' });
        });
        
    }
exports.getAllPosts = function(req,res,next){
	post.find((err,brand)=> {
		if (err)
			res.send(err);
		res.json(brand);
	})
}

exports.getPosts=function(req,res){
	post.find({
		$and:[{brand:req.body.brand},{type:req.body.type}]
		}).sort('-updatedAt').exec((err,top_post)=>{
			if(err){
				res.send(err);
			}else{
				post.find({
					$or:[
							{$and:[{brand:req.body.brand},{type:{$ne:req.body.type}}]},
							{$and:[{brand:{$ne:req.body.brand}},{type:req.body.type}]}
						]
				}).sort('-updatedAt').exec(function(err,nor_post){
					if(err){
						res.send(err);
					}else{
						var post= top_post.concat(nor_post);
						res.json(post);
					}
				});
				
			};
		});
}

exports.addReply= function(req,res){
	post.update({_id:req.body.id},
            {$push:{"reply":
                {
                    name:req.body.name, 
                    rep:req.body.reply
                }}
            },{safe:true, new:true},
                (err,route)=>{
                    if (err)
                        res.send(err);
                    res.send({message:"add a reply"});
                });
}