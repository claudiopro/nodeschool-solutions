/*
Create a server which routes requests to the path /foo/bar/baz/file.html to a
file in a directory, e.g. public/file.html, which contains the following:

    <html>
        <head><title>Hello Directories</title></head>
        <body>
            Hello Directories
        </body>
    </html>

-------------------------------------------------------------------------------
##HINTS

You'll need to require and register the inert plugin in this exercise the
same as in the previous exercise in order to serve the static directory's
contents.

Handlers can be declared as an object with a directory path:

    handler: {
        directory: { path: './public' }
    }

Routes using the directory handler must include a path parameter at the end of
the path string. The path defined for the route does not need to correspond to
the file system directory structure, and the parameter name does not matter.

    path: "/path/to/somewhere/{param}"

Be careful: in practice, you'll need to provide an absolute path to a
public directory in your program's directory.  To achieve this, you'll
probably need the path core module, its join() function, and the
__dirname global variable.
*/

var server = new (require('hapi').Server)()
var inert = require('inert')
var path = require('path')

server.connection({
  host: 'localhost'
  , port: Number(process.argv[2] || 8080)
})

server.register(inert, function (err) {
  if (err) throw err
})

server.route({
  path: '/foo/bar/baz/{file}'
  , method:'GET'
  , handler: {
    directory: {
      path: path.join(__dirname, 'public')
    }
  }
})

server.start(function() {
  console.log('Server running at:', server.info.uri)
})
