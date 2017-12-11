const express = require('express');
let credentials = require('./credentials.js');
let	Store = require('./models/store.js');
let zipcodes = require('zipcodes');
let app = express();

app.set('port', process.env.PORT || 3000);


// create application/json parser
let bodyParser = require('body-parser');
app.use(bodyParser.json());

// database configuration
var mongoose = require('mongoose');
var options = {
    server: {
       socketOptions: { keepAlive: 1 } 
    }
};
mongoose.connect(credentials.mongo.connectionString, options);

app.get('/', function(req, res) {

});

// Gets a list of all stores in system. A query string should be used to search store names.
app.get('/store', function(req, res) {

	if(req.query.q){
		  Store.find({$text: {$search: req.query.q}}, function(err, store){
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

// Puts a new store into the system
app.post('/store', function(req, res) {
	let storeStarter = new Store(req.body).save(function(err, newStore){
			if(err){
				
				res.json({
					status: "error", 
					data:"Store was not saved."
				});
			}
			else{
				res.json({
					status: "success",
					data: newStore
			});}
	});
});

//  Updates an existing store, including its inventory
app.put('/store/:id', function(req, res) {
	Store.update(req.body, function(err, modStore){
			res.json({
				status: "success",
				data: modStore
			});
	})
});

// Delete a store
app.delete('/store/:id', function(req, res) {
	
	Store.remove({_id: req.params.id}, function(err){
			res.json({
				status: "success"
			});
	})

});


// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.json({status: "error", message: "This file could not be found."});
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.json({status: "error", message: "A server error occurred."});
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});


/*
LOOK UP ZIPCODES

var hills = zipcodes.lookup(90210);

{ zip: '90210',
  latitude: 34.088808,
  longitude: -118.406125,
  city: 'Beverly Hills',
  state: 'CA',
  country: 'US' }


*/

