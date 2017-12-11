var mongoose = require('mongoose');

var storeSchema = mongoose.Schema({
    name: String,
    desc: String,
    address: [
    {
        city: String,
        state: String,
        zip: Number
    }],
    items: [{
        name: String,
        desc: String,
        price: Number,
        available: Boolean
    }]
});
storeSchema.index({name: 'text', desc: 'text'});

var Store = mongoose.model('Store', storeSchema);
module.exports = Store;


/*
let models = function(options){
    let foodSchema = options.mongoose.Schema({
    name: String,
    onDiet: Boolean
    )
};
let foodModel = options.mongoose.model('Food', )
let foodSchema = options.

let newBasket = new models.basket

app.use( require('body-parser').json() );


//FOR ADDING AN ITEM TO THE BASKET
models.Store.find({_id: req.params.id}, function (err, basket;){
    store[0].contents.push(req.body);
    
    store[0].save(fucntion (err){
        if(err){
            console.log(err);
            res.json({
                status: "An error has occured"
                
            });
        }
        else{
            res.json({
            status: "success"
                
            });
        }
        }
    }
}



// Gets a list of all stores in system. A query string should be used to search store names.
app.get('/store/search', function(req, res) {

    let searchTerm = req.query.q;
    let pensacola = zipcodes.lookup(32501);

	if(req.query.q){
		  models.Store.find({"contents.name": searchTerm} function(err, store){
		  		res.json({
					status: "success", 
					data: store
				});
		  });
	} else {
				res.json({
					status: "error", 
					data:"Query is required."
				});
	}
	

});

IN POSTMAN
store/search?q

*/