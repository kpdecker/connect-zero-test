function logStep() {
  window.top.recordLog([].concat(Array.prototype.slice.call(arguments), ['href', window.location]));
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
