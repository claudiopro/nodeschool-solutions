/*
Route configuration offers lots of ways to customize each endpoint offered by your hapi application.
One of those ways is through validation.

Validation can happen in parameters in the path, in inbound payload validation, and outbound response.
Objects for validation are defined
in the Joi validation framework.

Create a server that has a route configuration exposing an endpoint for
chickens. Specifically:

    /chickens

Within the route, add a path parameter named breed which has an attached validation within the route's configuration.
The solution will just check that a Validation object exists within the configuration for breed, not any specific validation.

-------------------------------------------------------------------------------
##HINTS

Create a server that listens on port 8080 with the following code:

    var routeConfig = {
        path: '/a/path/{with}/{parameters}',
        method: 'GET',
        handler: myHandler,
        config: {
            validate: {
                params: {
                    with: Joi.string().required(),
                    parameters: Joi.string().required()
                }
            }
        }
    }

All route information can be found here:

    file:///usr/local/lib/node_modules/makemehapi/node_modules/hapi/API.md

Joi information can be found here:

    file:///usr/local/lib/node_modules/makemehapi/node_modules/joi/README.md
*/

var server = new (require('hapi').Server)()
var vision = require('vision')
var joi = require('joi')

server.connection({
  host: 'localhost'
  , port: Number(process.argv[2] || 8080)
})

server.route({
  path: '/chickens/{breed}'
  , method:'GET'
  , handler: function(request, reply) {
    // no-op
  }
  , config: {
    validate: {
      params: {
        breed: joi.required()
      }
    }
  }
})

server.start(function() {
  console.log('Server running at:', server.info.uri)
})
