setTimeout(function() {
  var img = document.createElement('img');

  // Most of these do not apply per the spec, but this is exploratory so throw them all in.
  var events = ['abort', 'error', 'cancel', 'change', 'close', 'ended',
    'invalid', 'load', 'loadeddata', 'loadedmetadata',
    'loadstart', 'pause', 'progress', 'reset', 'stalled',
    'suspend', 'waiting'];

  for (var i = 0; i < events.length; i++) {
    (function(name) {
      img['on' + name] = function() {
        logStep(name, testOptions.url);
      };
    })(events[i]);
  }

  logStep('img-request', testOptions.url);
  img.width = 32;
  img.height = 32;
  img.src = testOptions.url;
  document.body.appendChild(img);
}, 100);

function abortRequest() {
  var img = document.querySelector('img');
  img.parentNode.removeChild(img);
}
