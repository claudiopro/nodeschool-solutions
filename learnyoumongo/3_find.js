/*
Here we will learn how to search for documents.

For all of the exercises, the database is learnyoumongo.
So, the url would be something like: mongodb://localhost:27017/learnyoumongo

Use the parrots collection to find all documents where age
is greater than the first argument passed to your script.

Using console.log, print the documents to stdout.

-------------------------------------------------------------------------------

## HINTS

To connect to the database, one can use something like this:

    var mongo = require('mongodb').MongoClient
    mongo.connect(url, function(err, db) {
      // db gives access to the database
    })

To get a collection, one can use db.collection('<collection name>').

To find a document or documents, one needs to call find() on the collection.

Find is a little bit different than what we are used to seeing.

Keep in mind, process.argv is an array of strings. To convert to an integer, you could use parseInt()

Here is an example:

    collection.find({
      name: 'foo'
    }).toArray(function(err, documents) {
    
    })

If your program does not finish executing, you may have forgotten to
close the db. That can be done by calling db.close() after you
have finished.

*/

var mongo = require('mongodb').MongoClient
// URL to the database for this exercise
var url = 'mongodb://localhost:27017/learnyoumongo'
// 
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
		})
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
