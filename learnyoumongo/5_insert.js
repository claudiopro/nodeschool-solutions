/*
Connect to MongoDB on port 27017.
You should connect to the database named learnyoumongo and insert
a document into the docs collection.

The document should be a json document with the following properties:

  * `firstName`
  * `lastName`

firstName will be passed as the first argument to the lesson.

lastName will be passed as the second argument to the lesson.

Use console.log to print out the object used to create the document.

Make sure you use JSON.stringify convert it to JSON.

-------------------------------------------------------------------------------

## HINTS

Remember, one can access the arguments passed by using process.argv.

In order to use the mongo package, one must first require it like:

    var MongoClient = require('mongodb').MongoClient

To connect, use the connect() function of MongoClient.

Ex.

    MongoClient.connect(url, function(err, db) {
      if (err) throw err

    })

If you get a Connection Refused error, make sure that mongod is still
running.

After you have successfully connected, you will need to specify a collection.
That can be done by calling the collection() function on the db returned
in the callback to connect.

Say you wanted to specify a collection named users:

    var collection = db.collection('users')

To insert a document, one would need to call insert() on the collection, like this:


    // inserting document
    // { a : 2 }
    collection.insert({
      a: 2
    }, function(err, data) {
      // handle error

      // other operations
    })

If your program does not finish executing, you may have forgotten to
close the db. That can be done by calling db.close() after you
have finished.
*/

var mongo = require('mongodb').MongoClient
// populate the object from stdin
var obj = {
  "firstName" : process.argv[2]
  , "lastName" : process.argv[3]
}
// URL to the database for this exercise
var url = 'mongodb://localhost:27017/learnyoumongo'

mongo.connect(url, function(err, db) {
	// db gives access to the database
	if (err) {
		console.log(err)
		return
	}
	// collection returns a named collection
	db.collection('docs')
		// insert an element
		.insert(obj, function(err, data) {
      console.log(JSON.stringify(obj))
      // don't forget to close the db connection
      db.close()
    })
})
