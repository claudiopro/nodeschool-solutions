/*
Create a server which responds to requests to /?name=Helping&suffix=! using
the template from the VIEWS exercise.

Instead of placing the query parameter directly in the template, create a helper
at helpers/helper.js and use this helper in the template to output the name
query parameter.

    <html>
        <head><title>Hello Helping!</title></head>
        <body>
            Hello Helping!
        </body>
    </html>

The helper should concatenate the name and suffix query parameters.

-------------------------------------------------------------------------------
##HINTS

Be sure to register the vision plugin when attempting to render the template.

Helpers are functions used within templates to perform transformations and other
data manipulations using the template context or other inputs.

You can define a helpers path in the server options. All .js files in this
directory will be loaded and the file name will be used as the helper name.

    var options = {
        views: {
            ...
            helpersPath: 'helpers'
        }
    };

Each file must export a single method with the signature function(context) and
return a string.

    module.exports = function(context) {
        return context.data.root.query.foo;
    }

The helper function can then be used in the template.

    <div>{{helper}}</div>
*/

var server = new (require('hapi').Server)()
var vision = require('vision')

server.connection({
  host: 'localhost'
  , port: Number(process.argv[2] || 8080)
})

server.register(vision, function (err) {
  if (err) throw err
})

server.views({
  engines: {
    html: require('handlebars')
  }
  , relativeTo: __dirname
  , path: './templates'
  , helpersPath: './helpers'
})

server.route({
  path: '/'
  , method:'GET'
  , handler: {
    view: 'helping.html'
  }
})

server.start(function() {
  console.log('Server running at:', server.info.uri)
})
