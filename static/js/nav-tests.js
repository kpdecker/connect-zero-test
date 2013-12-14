(function() {
  "use strict";

  var navigationTests = [
    {
      name: 'Location Change',
      exec: function(frame) {
        frame.contentWindow.location = '/blank.html';

        backForward(function() {
          waitForFrame(completeTest);
        });
      }
    },
    {
      name: 'Location Replace',
      exec: function(frame) {
        frame.contentWindow.location.replace('/blank.html');

        setTimeout(completeTest, 1000);
      }
    },
    {
      name: 'Hash Change',
      exec: function(frame) {
        frame.contentWindow.hash = '#foo';

        backForward(function() {
          waitForFrame(completeTest);
        });
      }
    },
    {
      name: 'Replace Hash',
      exec: function(frame) {
        frame.contentWindow.location.replace(frame.contentWindow.location + '#foo');

        setTimeout(completeTest, 1000);
      }
    },
    {
      name: 'Push State',
      exec: function(frame) {
        frame.contentWindow.history.pushState(undefined, 'foo', 'foo');

        backForward(function() {
          waitForFrame(completeTest);
        });
      }
    },
    {
      name: 'Replate State',
      exec: function(frame) {
        frame.contentWindow.history.replaceState(undefined, 'foo', 'foo');

        setTimeout(completeTest, 1000);
      }
    },
    {
      name: 'Form Submission',
      exec: function(frame) {
        var form = frame.contentDocument.createElement('form');
        form.action = '/blank.html';
        form.submit();

        backForward(function() {
          waitForFrame(completeTest);
        });
      }
    },
    {
      name: 'Page Refresh',
      exec: function(frame) {
        frame.contentWindow.location.reload();

        setTimeout(completeTest, 1000);
      }
    }
  ];

  $(document).on('click', '[data-test-id]', function() {
    var test = navigationTests[this.getAttribute('data-test-id')];

    createTestFrame(test.name, '/hang', function(frame) {
      logPhase(test.name);
      test.exec(frame);
    });

    return false;
  });

  _.each(navigationTests, function(test, index) {
    $('#nav-cancel').append($('<li><button type="button" data-test-id="' + index + '">' + test.name));
  });
})();
