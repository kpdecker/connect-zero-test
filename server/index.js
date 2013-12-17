var Hapi = require('hapi');

var server = Hapi.createServer('localhost', 8000);

server.route({
  method: 'GET',
  path: '/partial',
  handler: function(request, reply) {
    console.log(new Date(), 'partial');
    request.raw.res.writeHead(200);
    request.raw.res.socket.end();
    reply.close();
  }
});

server.route({
  method: 'GET',
  path: '/close',
  handler: function(request, reply) {
    console.log(new Date(), 'close');
    request.raw.res.socket.end();
    reply.close();
  }
});

server.route({
  method: 'GET',
  path: '/hang',
  handler: function(request, reply) {
    console.log(new Date(), 'hang');
  }
});

server.route({
  method: 'GET',
  path: '/log',
  handler: function(request, reply) {
    console.log(new Date(), 'log');
    console.log(request.headers['user-agent']);
    console.log(request.query.log);
    console.log();
    console.log();

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
