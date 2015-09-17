/*
Here we are going to update a document in the users collection.

The database name will be accessible via process.argv[2].

Say we have a user defined like:

    {
      "name": "Tina",
      "age": 30,
      "username": "tinatime"
    }

We want to change Tina's age from 30 to 40.

For the purpose of this lesson, assume that the username property is unique.

-------------------------------------------------------------------------------

## HINTS

To update a document, one would need to call update() on the collection.

Ex.


    // document
    // { a: 2, b: 3 }

    collection.update({
      a: 2
    }, {
      $set: {
        b: 1
      }
    }, callback)

    // document was updated
    // { a: 2, b: 1 }

The first argument to update() is the query. This query is what filters the documents that we are wanting to update. The second argument is an object of the properties to update. Pay close attention to the $set property. If we were to omit $set, the document would be replaced with the object represented by the second argument.

If your program does not finish executing, you may have forgotten to
close the db. That can be done by calling db.close() after you
have finished.
*/

var mongo = require('mongodb').MongoClient

// URL to the database for this exercise
var url = 'mongodb://localhost:27017/' + process.argv[2]

const USERNAME = 'tinatime'

mongo.connect(url, function(err, db) {
	// db gives access to the database
	if (err) {
		console.log(err)
		return
	}
	// collection returns a named collection
	db.collection('users')
		// updates the items with the given username
		.update({
      'username': USERNAME
    }, {
      // updates only the named properties with the desired value
      $set: {
        'age': 40
      }
    }, function(err, data) {
      // don't forget to close the db connection
			db.close()
		})
})
