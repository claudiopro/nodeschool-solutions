/*
This lesson involves removing a document with the given _id.

The database name will be accessible via process.argv[2].

The collection name will be passed as the second argument to your script.

The _id will be passed as the third argument to your script.

-------------------------------------------------------------------------------

## HINTS

To remove a document, one would need to call remove() on the collection.

Ex.


    collection.remove({
      name: 'foo'
    }, callback)

The first argument to remove() is the query.

If your program does not finish executing, you may have forgotten to
close the db. That can be done by calling db.close() after you
have finished.
*/

var mongo = require('mongodb').MongoClient

// URL to the database for this exercise
var url = 'mongodb://localhost:27017/' + process.argv[2]
var collection_name = process.argv[3]
var _id = process.argv[4]

mongo.connect(url, function(err, db) {
	// db gives access to the database
	if (err) {
		console.log(err)
		return
	}
	// collection returns a named collection
	db.collection(collection_name)
		// removes the item with the given _id
		.remove({
      '_id': _id
    }, function(err, data) {
      // don't forget to close the db connection
			db.close()
		})
})
