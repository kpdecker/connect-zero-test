var priorLocation;

function logInit() {
  localStorage.setItem('test-log', '');
}

function logPhase() {
  var log = localStorage.getItem('test-log') || '';
  log += '\n' + Array.prototype.slice.call(arguments).join(' ') + '\n';
  localStorage.setItem('test-log', log);
}
function logStep() {
  var log = localStorage.getItem('test-log') || '';

  if (priorLocation != window.location) {
    priorLocation = window.location + '';
    if (arguments[0] !== 'location-change') {
      log += '  location-change ' + priorLocation + '\n';
    }
  }

  log += '  ' + Array.prototype.slice.call(arguments).join(' ') + '\n';

  localStorage.setItem('test-log', log);
}

function logFlush() {
  console.log(localStorage.getItem('test-log'));
  $.ajax({
    url: '/log',
    data: {
      log: localStorage.getItem('test-log')
    }
  });
  localStorage.removeItem('test-log');
}


function eventListeners() {
  if (testOptions.all || testOptions.beforeunload) {
    window.addEventListener('beforeunload', function() {
      logStep('beforeunload');
    });
  }

  if (testOptions.all || testOptions.pagehide) {
    window.addEventListener('pagehide', function() {
      logStep('pagehide');
    });
  }

  if (testOptions.all || testOptions.unload) {
    window.addEventListener('unload', function() {
      logStep('unload');
    });
  }

  if (testOptions.all || testOptions.hashchange) {
    // TODO : Is this working?
    window.addEventListener('hashchange', function() {
      logStep('hashchange');
    });
  }

  if (testOptions.all || testOptions.popstate) {
    window.addEventListener('popstate', function() {
      logStep('popstate');
    });
  }

  if (testOptions.all || testOptions.error) {
    window.addEventListener('error', function() {
      logStep('capturing error');
    }, true);
  }
}

if (window.testOptions) {
  eventListeners();
}
logStep('location-change', window.location+'');
