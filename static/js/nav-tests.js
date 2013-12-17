var navigationTests = {
  'Page Change': [
    function(contentWindow) {
      logPhase('assign location', document.readyState);
      contentWindow.location = '/blank.html';
    },
    'back',
    'forward',
    'back',
    function(contentWindow) {
      logPhase('replace location', document.readyState);
      contentWindow.location.replace('/blank.html');
    },
    function(contentWindow) {
      logPhase('restore location', document.readyState);
      contentWindow.location = testOptions.type;
    },
    function(contentWindow) {
      logPhase('submit form', document.readyState);
      var form = contentWindow.document.createElement('form');
      form.action = '/blank.html';
      form.submit();
    }
  ],
  'Single Page': [
    function(contentWindow) {
      logPhase('assign hash location', document.readyState);
      contentWindow.location = contentWindow.location + '#foo';
    },
    'back',
    'forward',
    'back',
    function(contentWindow) {
      logPhase('assign hash', document.readyState);
      contentWindow.hash = '#hash-foo';
    },
    'back',
    'forward',
    function(contentWindow) {
      logPhase('replace location', document.readyState);
      contentWindow.location.replace(contentWindow.location + '#bar');
    },

    'back',
    'forward',

    function(contentWindow) {
      logPhase('pushState', document.readyState);
      contentWindow.history.pushState(undefined, 'foo', 'foo');
    },
    'back',
    'forward',
    function(contentWindow) {
      logPhase('replaceState', document.readyState);
      contentWindow.history.replaceState(undefined, 'foo', 'foo');
    },
    function(contentWindow) {
      logPhase('abort request', document.readyState);
      contentWindow.abortRequest();
    }
  ]
};

// Defer do the page is loaded as some of these operations behave differently
// if run while the page is still loading.
setTimeout(function testStep() {
  var running = localStorage.getItem('test-running') === 'true';
  if (running) {
    var suite = navigationTests[localStorage.getItem('test-name')],
        step = parseInt(localStorage.getItem('test-step'), 10);

    localStorage.setItem('test-step', step + 1 + '');

    step = suite[step];

    if (!step) {
      (window.opener || window.top).completeNavTest();

      if (window.opener) {
        window.close();
      }
    } else if (step === 'back') {
      logPhase('back');
      history.back();
    } else if (step === 'forward') {
      logPhase('forward');
      history.forward();
    } else {
      step(window);
    }

    // Handle tests that don't replace the context
    //
    // This will be terminated if we are on a test that leaves the page
    // context
    setTimeout(function() {
      var interval = setInterval(function() {
        if (window.document.getElementById('continue-tests')) {
          clearInterval(interval);

          testStep();
        }
      }, 50);
    }, 500);
  }
}, 100);

