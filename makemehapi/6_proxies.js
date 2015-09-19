/*
A proxy lets you relay requests from one server/service to another.

Create a server which listens on a port passed from the command line, takes any
requests to the path /proxy and proxies them to http://localhost:65535/proxy.

-------------------------------------------------------------------------------
##HINTS

This exercise requires you to install the h2o2 module, which is a hapi plugin
for handling proxies. You'll need to register the plugin in your code in
order to use the proxy configuration:

    var H2o2 = require('h2o2');

    server.register(H2o2, function (err) {
        if (err) throw err;
    });

The proxy key can be used to generate a reverse proxy handler.

    handler: {
        proxy: {
            host: '127.0.0.1',
            port: 65535
        }
    }

-------------------------------------------------------------------------------
Background info: en.wikipedia.org/wiki/Proxy_server
*/

var server = new (require('hapi').Server)()
var h2o2 = require('h2o2')

server.connection({
  host: 'localhost'
  , port: Number(process.argv[2] || 8080)
})

server.register(h2o2, function (err) {
  if (err) throw err
})

server.route({
  path: '/proxy'
  , method:'GET'
  , handler: {
    proxy: {
      host: '127.0.0.1'
      , port: 65535
    }
  }
})

server.start(function() {
  console.log('Server running at:', server.info.uri)
})
