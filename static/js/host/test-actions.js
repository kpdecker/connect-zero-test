function createTestFrame(testName, resourceUrl, delay, callback) {
  if (!callback) {
    callback = delay;
    delay = undefined;
  }

  $('iframe').remove();

  var url = $('[name="test-type"]').val() + '?url=' + resourceUrl,
      frame = $('<iframe width="320px" height="480px" src="' + url + '"></iframe>')[0];

  testLog = [];
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

function backForward(callback) {
  waitForFrame(function(frame) {
    logPhase('back');
    frame.contentWindow.history.back();

    waitForFrame(function(frame) {
      setTimeout(function() {
        logPhase('forward');
        frame.contentWindow.history.forward();

        callback(frame);
      }, 500);
    });
  });
}
function completeTest() {
  logPhase();
  console.log(JSON.stringify(testLog, undefined, 2));

  // Do not remove until after as this will cause logging we don't care about for this test
  $('iframe').remove();
}
