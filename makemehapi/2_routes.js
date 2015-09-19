var server = new (require('hapi').Server)()

server.connection({
  host: 'localhost'
  , port: Number(process.argv[2] || 8080)
})

server.route({
  path: '/{name}'
  , method:'GET'
  , handler: root_handler
})

server.start(function() {
  console.log('Server running at:', server.info.uri)
})

function root_handler(request, reply) {
  reply('Hello ' + request.params.name)
}
