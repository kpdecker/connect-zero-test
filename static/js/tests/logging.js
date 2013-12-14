var priorLocation;

function logStep() {
  if (priorLocation != window.location) {
    priorLocation = window.location + '';
    if (arguments[0] !== 'location-change') {
      window.top.recordLog(['location-change', priorLocation]);
    }
  }
  window.top.recordLog(Array.prototype.slice.call(arguments));
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

eventListeners();
logStep('location-change', window.location+'');
