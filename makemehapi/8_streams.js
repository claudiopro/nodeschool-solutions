/*
Create a hapi server which responds to GET requests to / by streaming a ROT13'd version of a file that contains:

    The Pursuit of Hapi-ness

Output should look like:

    Gur Chefhvg bs Uncv-arff

-------------------------------------------------------------------------------
##HINTS

### Stream

The hapi handler reply function can accept a stream as an argument.

### File

The fs module has a createReadStream(pathToFile) function that would be useful.

### Simple ROT13

In this exercise, we'll be using rot13-transform. To install rot13-transform:

    npm install rot13-transform
*/

var server = new (require('hapi').Server)()
var vision = require('vision')
var fs = require('fs')
var path = require('path')
var rot13 = require('rot13-transform')

server.connection({
  host: 'localhost'
  , port: Number(process.argv[2] || 8080)
})

server.route({
  path: '/'
  , method:'GET'
  , handler: read_rot13_file
})

server.start(function() {
  console.log('Server running at:', server.info.uri)
})

// hoisted
function read_rot13_file(request, reply) {
  var filename = path.join(__dirname, 'hapiness.txt')
  reply(fs.createReadStream(filename).pipe(rot13()))
}
