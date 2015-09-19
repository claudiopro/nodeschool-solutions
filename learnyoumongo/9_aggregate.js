/*
Next up is aggregation. Aggregation allows one to do things like
calculate the sum of a field of multiple documents or the average
of a field of documents meeting particular criteria.

Say you have a collection named prices. Each price document is modeled
like so:

    {
      "name": "Tshirt",
      "size": "S",
      "price": 10,
      "quantity": 12
      "meta": {
        "vendor": "hanes",
        "location": "US"
      }
    }

In this exercise, we need to calculate the average price for all documents in prices
that have the size that will be passed as the first argument to your script.

Use console.log() to print the average price rounded to 2 decimal places
to stdout after you have found it.

-------------------------------------------------------------------------------

## HINTS

To use the aggregate() function, one first needs the collection.
The aggregate() function takes an array of objects as the first argument.

This array will contain the different pipelines for the aggregation.
To read more about pipelines, please visit [Aggregation](http://docs.mongodb.org/manual/core/aggregation-introduction/).

The two main pipeline stages we will use will be $match and $group.

### $match

$match is used similar to the way a query is done. It allows us to select
the documents that meet certain criteria.

Ex.

    var match = { $match: { status: 'A' } }

The above example will match all of the documents that have a status
property equal to A.

### $group

$group is what allows us to run operations on certain properties.

So, say we wanted to get the sum of the values of the property value
where status is equal to A and have it placed in the total property.

Ex.

    // [
    //  { status: 'A', value: 1 },
    //  { status: 'B', value: 2 },
    //  { status: 'A', value: 10 }
    // ]

    collection.aggregate([
      { $match: { status: 'A' }}
    , { $group: {
        _id: 'total' // This can be an arbitrary string in this case
      , total: {
          // $sum is the operator used here
          $sum: '$value'
        }
      }}
    ]).toArray(function(err, results) {
      // handle error
      console.log(results)
      // => [
      // =>   { _id: 'total', total: 11 }
      // => ]
    })

Other operators used in the $group stage include:

  * `$avg`
  * `$first`
  * `$last`
  * `$max`
  * `$min`
  * `$push`
  * `$addToSet`

# Rounding

The Number prototype contains a function toFixed(), which accepts the
number of decimal places you would like to round to, and returns a string
representation.

      var value = "1"
      Number(value).toFixed(5)
      // => '1.00000'

If your program does not finish executing, you may have forgotten to
close the db. That can be done by calling db.close() after you
have finished.
*/

var mongo = require('mongodb').MongoClient

// URL to the database for this exercise
var url = 'mongodb://localhost:27017/learnyoumongo'
// read the size from stdin
var size = process.argv[2]
mongo.connect(url, function(err, db) {
	// db gives access to the database
	if (err) {
		console.log(err)
		return
	}
	// collection returns a named collection
	db.collection('prices')
		// aggregate on match on size
		.aggregate([{
      $match: {
        'size' : size
      }
		}, {
      $group: {
        _id: 'total',
        avg: {
          $avg: '$price'
        }
      }
    }]).toArray(function(err, results) {
			// print the results
			console.log(results[0].avg.toFixed(2))
			// don't forget to close the db connection
			db.close()
		})
})
