var navigationTests = {
  'Location': [
    function(contentWindow) {
      logPhase('assign location');
      contentWindow.location = '/blank.html';
    },
    'back',
    'forward',
    'back',
    function(contentWindow) {
      logPhase('replace location');
      contentWindow.location.replace('/blank.html');
    }
  ],
  'Hash': [
    function(contentWindow) {
      logPhase('assign hash');
      contentWindow.hash = '#foo';
    },
    'back',
    'forward',
    'back',
    function(contentWindow) {
      logPhase('replace location');
      contentWindow.location.replace(contentWindow.location + '#foo');
    }
  ],
  'Push State': [
    function(contentWindow) {
      logPhase('pushState');
      contentWindow.history.pushState(undefined, 'foo', 'foo');
    },
    'back',
    'forward',
    'back',
    function(contentWindow) {
      logPhase('replaceState');
      contentWindow.history.replaceState(undefined, 'foo', 'foo');
    }
  ],
  'Form Submission': [
    function(contentWindow) {
      logPhase('submit form');
      var form = contentWindow.document.createElement('form');
      form.action = '/blank.html';
      form.submit();
    },
    'back',
    'forward'
  ],
  'Page Refresh': [
    function(contentWindow) {
      logPhase('reload');
      contentWindow.location.reload();
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
      (window.opener || window).completeNavTest();

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

