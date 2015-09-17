/*
Here we will learn how to count the number of documents that
meet certain criteria.

Use the parrots collection to count all documents where age
is greater than the first argument passed to your script.

Using console.log, print the number to stdout.

-------------------------------------------------------------------------------

## HINTS

To count the number of documents meeting certain criteria,
we must use the collection.count() function.

Here is an example:

    collection.count({
      name: 'foo'
    }, function(err, count) {

    })

If your program does not finish executing, you may have forgotten to
close the db. That can be done by calling db.close() after you
have finished.
*/

var mongo = require('mongodb').MongoClient

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
		// counts results
		.count({
      'age' : {
        // $gt performs a query `greater than`
        $gt: minAge
      }
		}, function(err, count) {
			// print the results
			console.log(count)
			// don't forget to close the db connection
			db.close()
		})
})
