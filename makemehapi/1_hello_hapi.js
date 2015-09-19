/*
Create a hapi server that listens on a port passed from the command line and
replies with "Hello hapi" when an HTTP GET request is sent to / .

The workshop will execute requests against the server and verify the output.

-------------------------------------------------------------------------------
##HINTS

Create a server that listens on port 8080 , if none is passed from the command
line, with the following code:

    var Hapi = require('hapi');
    var server = new Hapi.Server();

    server.connection({
        host: 'localhost',
        port: Number(process.argv[2] || 8080)
    });

Routes are added via the route function:

    server.route({path: '/', method:'GET', handler: anonOrYourFunction});

Handlers can be anonymous functions or separately declared (just like in javascript :P), but all of them should have this signature:

    function handler(request, reply) {

        //request has all information
        //reply handles client response

        reply({mustFlow:true});
    }

Calling the start function gets a server listening on the assigned port. Note
that a callback is required when calling start:

    server.start(function () {
      console.log('Server running at:', server.info.uri);
    });
*/

var server = new (require('hapi').Server)()

server.connection({
  host: 'localhost'
  , port: Number(process.argv[2] || 8080)
})

server.route({
  path: '/'
  , method:'GET'
  , handler: root_handler
})

server.start(function() {
  console.log('Server running at:', server.info.uri)
})

function root_handler(request, reply) {
  reply('Hello hapi')
}
