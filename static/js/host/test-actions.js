function createTestFrame(testName, resourceUrl, delay, callback) {
  if (!callback) {
    callback = delay;
    delay = undefined;
  }

  $('iframe').remove();

  var options = testOptions();
  options.url = resourceUrl;
  localStorage.setItem('test-options', JSON.stringify(options));

  var url = $('[name="test-type"]').val(),
      frame = $('<iframe width="320px" height="480px" src="' + url + '"></iframe>')[0];

  logPhase('Init ' + testName);

  document.body.appendChild(frame);

  waitForFrame(delay, function(frame) {
    setTimeout(function() {
      callback(frame);
    }, 500);
  });
}

function waitForFrame(delay, callback) {
  if (!callback) {
    callback = delay;
    delay = undefined;
  }

  var frame = $('iframe')[0];

  // Use custom polling for startup check so we can start the tests before the document
  // is loaded
  var interval = setInterval(function() {
    if (frame.contentDocument.getElementById('continue-tests')) {
      clearInterval(interval);

      setTimeout(function() {
        callback(frame);
      }, delay || 500);
    }
  }, 50);
}
