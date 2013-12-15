(function() {
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

  img.src = testOptions.url;
  document.body.appendChild(img);
})();
