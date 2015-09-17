var mongo = require('mongodb').MongoClient

module.exports = function(limit) {
	// URL to the database for this exercise
	var url = 'mongodb://localhost:27017/learnyoumongo'
	// read the min age from stdin
	var minAge = parseInt(process.argv[2], 10)
	mongo.connect(url, function(err, db) {
		// db gives access to the database
		if (err) {
			console.log(err)
			return
		}
		// collection returns a named collection
		db.collection('parrots')
			// find executes a query on the collection
			.find({
			}, limit)
			// toArray converts the results to an array
			.toArray(function(err, docs) {
				// let's create an array to store results
				var ret = []
				// iterate over the array
				docs.forEach(function(doc) {
					if (doc.age > minAge) {
						// if the age is greater than minAge, add this item to the results
						ret.push(doc)
					}
				})
				// print the results
				console.log(ret)
				// don't forget to close the db connection
				db.close()
			})
	})
}
