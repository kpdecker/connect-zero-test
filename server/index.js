var Hapi = require('hapi');

var server = Hapi.createServer('localhost', 8000);

server.route({
  method: 'GET',
  path: '/log',
  handler: function(request, reply) {
    console.log(request.query.log);

    reply(new Hapi.response.Empty());
  }
});

server.route({
  method: 'GET',
  path: '/{path*}',
  handler: {
    directory: {
      path: 'static'
    }
  }
});

server.start();
