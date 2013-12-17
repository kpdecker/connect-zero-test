var xhr;

(function() {
  xhr = new XMLHttpRequest();

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
  xhr.onreadystatechange = function(){
    logStep('readystatechange', xhr.readyState, 'status:', xhr.readyState > 1 && xhr.status);
  };

  logStep('xhr-request', testOptions.url);
  if (testOptions.timeout) {
    xhr.timeout = testOptions.timeout;
  }
  xhr.open('GET', testOptions.url, !testOptions.sync);
  xhr.send(null);

  return xhr;
})();

function abortRequest() {
  xhr.abort();
}
