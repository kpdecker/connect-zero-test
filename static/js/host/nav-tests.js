function startNavTest(name) {
  var options = testOptions();
  options.url = '/hang';
  localStorage.setItem('test-options', JSON.stringify(options));

  localStorage.setItem('test-running', 'true');
  localStorage.setItem('test-name', name);
  localStorage.setItem('test-step', '0');

  var $type = $('[name="test-type"]'),
      title = $type.find('option').filter(function(o){ return this.selected }).pluck('text');
  logInit();
  logPhase(title, name, JSON.stringify(options));

  var url = $type.val();

  if (options.iframe) {
    var frame = $('<iframe width="320px" height="480px" src="' + url + '"></iframe>')[0];
    document.body.appendChild(frame);
  } else {
    window.open(url, 'test-win');
  }
}
function completeNavTest() {
  logPhase('close');
  $('iframe').remove();

  setTimeout(function() {
    logFlush();

    localStorage.removeItem('test-running');
    localStorage.removeItem('test-name');
    localStorage.removeItem('test-step');
    localStorage.removeItem('test-options');
  }, 500);
}

$('#nav-cancel').on('click', '[data-test-id]', function() {
  startNavTest(this.getAttribute('data-test-id'));

  return false;
});

_.each(navigationTests, function(test, name) {
  $('#nav-cancel').append($('<li><button type="button" data-test-id="' + name + '">' + name));
});
