(function() {
  var networkTests = [
    {
      name: 'Incorrect Security Origin/Invalid data',
      url: 'http://www.google.com/'
    },
    {
      name: 'Timeout',
      url: '/hang',
      timeout: 200
    },
    {
      name: 'Partial Response',
      url: '/partial'
    },
    {
      name: 'Closed Connection',
      url: '/close'
    },
    {
      name: 'Error Status',
      url: '/error'
    },
    {
      name: 'No Server',
      url: 'http://' + location.hostname + ':81/does-not-exist'
    },
    {
      name: 'DNS Lookup Failure',
      url: 'http://this.is.really.not.a.domain/does-not-exist'
    }
  ];

  $('#network-errors').on('click', function() {
    var $el = $(this);
    $el.attr('disabled', 'disabled');

    runTests(function() {
      $el.removeAttr('disabled');
    });

    return false;
  });

  function runTests(complete) {
    $('iframe').remove();
    logInit();

    var types = _.keys(testTypes),
        curType = types.shift(),
        curTest = -1;
    (function exec() {
      curTest++;
      var test = networkTests[curTest];

      if (test) {
        runTest(curType, test, exec);
      } else if (types.length) {
        curTest = -1;
        curType = types.shift();
        exec();
      } else {
        complete();
        logFlush();
      }
    })();
  }

  function runTest(curType, test, callback) {
    var options = {
      type: testTypes[curType],
      url: test.url,
      timeout: test.timeout,
      error: true
    };
    localStorage.setItem('test-options', JSON.stringify(options));

    if (test.timeout && options.type !== '/xhr.html') {
      return callback();
    }

    logPhase(curType, test.name);

    var frame = $('<iframe width="320px" height="480px" src="' + options.type + '"></iframe>')[0];
    document.body.appendChild(frame);

    // TODO : Do we have a better option here for detecting completion?
    setTimeout(function() {
      $('iframe').remove();
      callback();
    }, 1000);
  }
})();
