var Hapi = require('hapi');

var server = Hapi.createServer('localhost', 8000);

server.route({
  method: 'GET',
  path: '/hang',
  handler: function(request, reply) {
    console.log(new Date(), 'hang');

    if (request.query.duration) {
      setTimeout(function() {
        reply(new Hapi.response.Empty());
      }, parseInt(request.query.duration, 10));
    }
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
