setTimeout(function() {
  var script = document.createElement('script');

  // Most of these do not apply per the spec, but this is exploratory so throw them all in.
  var events = ['abort', 'error', 'cancel', 'change', 'close', 'ended',
    'invalid', 'load', 'loadeddata', 'loadedmetadata',
    'loadstart', 'pause', 'progress', 'reset', 'stalled',
    'suspend', 'waiting'];

  for (var i = 0; i < events.length; i++) {
    (function(name) {
      script['on' + name] = function() {
        logStep(name, testOptions.url);
      };
    })(events[i]);
  }

  logStep('script-request', testOptions.url);
  script.src = testOptions.url;
  document.body.appendChild(script);
}, 100);

function abortRequest() {
  var scripts = document.querySelectorAll('script'),
      script = scripts[scripts.length - 1];
  script.parentNode.removeChild(script);
}
