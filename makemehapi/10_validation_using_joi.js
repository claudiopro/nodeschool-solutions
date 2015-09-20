/*
By using a Joi object we can specify highly customizable validation rules in paths, request payloads, and responses.

Create a server exposing a login endpoint and reply with "login successful" when an HTTP POST request is sent to /login.

The endpoint will accept following payload variables:

isGuest       (boolean)
username      (string)
accessToken   (alphanumeric)
password      (alphanumeric)

Validation should consist of following conditions:

i)   if isGuest is false, a username is required.
ii)  password cannot appear together with accessToken.
iii) if any other parameters than specified above are sent, they should pass the validation.

-------------------------------------------------------------------------------
##HINTS

Create a server that listens on port 8080 with the following code:


    var routeConfig = {
        path: '/a/path/',
        method: 'POST',
        handler: myHandler,
        config: {
            validate: {
               payload: Joi.object({
                    username: Joi.string(),
                    password: Joi.string().alphanum(),
                    accessToken: Joi.string().alphanum(),
                    birthyear: Joi.number().integer().min(1900).max(2013),
                    email: Joi.string().email()
               })
               .options({allowUnknown: true})
               .with('username', 'birthyear')
               .without('password', 'accessToken')
            }
        }
    }

All route information can be found here:

    file:///usr/local/lib/node_modules/makemehapi/node_modules/hapi/API.md

Joi information can be found here:

    file:///usr/local/lib/node_modules/makemehapi/node_modules/joi/README.md
*/

var server = new (require('hapi').Server)()
var joi = require('joi')

server.connection({
  host: 'localhost'
  , port: Number(process.argv[2] || 8080)
})

server.route({
  path: '/login'
  , method:'POST'
  , handler: function(request, reply) {
    reply('login successful')
  }
  , config: {
    validate: {
      payload: joi.object({
        isGuest: joi.boolean()
        , username: joi.string().when('isGuest', { is: false, then: joi.required() })
        , password: joi.string().alphanum()
        , accessToken: joi.string().alphanum()
      })
      .options({allowUnknown: true})
      .without('password', 'accessToken')
    }
  }
})

server.start(function() {
  console.log('Server running at:', server.info.uri)
})
