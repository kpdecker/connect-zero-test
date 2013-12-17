function testOptions() {
  var selected = _.pluck($('.js-log-options').serializeArray(), 'name');
  try {
    sessionStorage.setItem('selected-logs', JSON.stringify(selected));
  } catch (err) { /* NOP */ }

  return _.object(selected, _.map(selected, function() { return true; }));
}

(function() {
  var availableOptions = {
    xhr1: 'XHR1 Event',
    xhr2: 'XHR2 Events',
    error: 'window error events',
    beforeunload: 'beforeunload',
    pagehide: 'pagehide',
    unload: 'unload',
    hashchange: 'hashchange',
    popstate: 'popstate'
  };

  var selected = [];
  try {
    selected = JSON.parse(sessionStorage.getItem('selected-logs')) || [];
  } catch (err) { /* NOP */ }

  _.each(availableOptions, function(display, key) {
    var checked = (!selected.length || _.contains(selected, key)) ? ' checked' : '';

    $('.js-log-options').append(
        $('<label><input type="checkbox" name="' + key + '"' + checked + '>' + display));
  });
})();
