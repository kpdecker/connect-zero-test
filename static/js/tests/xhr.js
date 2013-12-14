(function() {
  var xhr = new XMLHttpRequest();

  if (testOptions.all || testOptions.xhr2) {
    xhr.onloadstart = function() {
      logStep('loadstart', testOptions.url);
    };
    xhr.onprogress = function() {
      logStep('progress', testOptions.url);
    };
    xhr.onabort = function() {
      logStep('abort', testOptions.url);
    };
    xhr.onerror = function() {
      logStep('error', testOptions.url);
    };
    xhr.onload = function() {
      logStep('load', testOptions.url);
    };
    xhr.ontimeout = function() {
      logStep('timeout', testOptions.url);
    };
    xhr.onloadend = function() {
      logStep('loadend', testOptions.url);
    };
  }
  if (testOptions.all || testOptions.xhr1) {
    xhr.onreadystatechange = function(){
      logStep('readystatechange', xhr.readyState, 'status:', xhr.readyState > 1 && xhr.status);
    };
  }

  xhr.open('GET', testOptions.url, true);
  xhr.send(null);

  return xhr;
})();
