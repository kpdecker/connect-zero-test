function testOptions() {
  var selected = _.pluck($('.js-options').serializeArray(), 'name');
  selected = _.object(selected, _.map(selected, function() { return true; }));

  selected.type = $('[name="test-type"]').val();

  try {
    sessionStorage.setItem('selected-logs', JSON.stringify(selected));
  } catch (err) { /* NOP */ }
  return selected;
}

(function() {
  var availableTestOptions = {
    iframe: 'Run in iframe',
  };
  var availableLogOptions = {
    error: 'window error events',
    beforeunload: 'beforeunload',
    pagehide: 'pagehide',
    unload: 'unload',
    hashchange: 'hashchange',
    popstate: 'popstate'
  };

  var selected;
  try {
    selected = JSON.parse(sessionStorage.getItem('selected-logs'));
  } catch (err) { /* NOP */ }

  function render(parent, options, defaultCheck) {
    _.each(options, function(display, key) {
      var checked = ((defaultCheck && !selected) || selected[key]) ? ' checked' : '';

      $(parent).append(
          $('<label><input type="checkbox" name="' + key + '"' + checked + '>' + display));
    });
  }
  render('.js-test-options', availableTestOptions);
  render('.js-logging-options', availableLogOptions, true);

  if (selected) {
    $('[name="test-type"]').val(selected.type);
  }
})();
