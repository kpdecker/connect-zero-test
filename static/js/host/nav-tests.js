function startNavTest(name) {
  var options = testOptions();
  options.url = '/hang';
  localStorage.setItem('test-options', JSON.stringify(options));

  localStorage.setItem('test-running', 'true');
  localStorage.setItem('test-name', name);
  localStorage.setItem('test-step', '0');
  localStorage.setItem('test-log', '');

  logPhase(name, JSON.stringify(options));

  window.open('/xhr.html');
}
function completeNavTest() {
  logFlush();

  localStorage.removeItem('test-running');
  localStorage.removeItem('test-name');
  localStorage.removeItem('test-step');
  localStorage.removeItem('test-options');
}

$('#nav-cancel').on('click', '[data-test-id]', function() {
  startNavTest(this.getAttribute('data-test-id'));

  return false;
});

_.each(navigationTests, function(test, name) {
  $('#nav-cancel').append($('<li><button type="button" data-test-id="' + name + '">' + name));
});
