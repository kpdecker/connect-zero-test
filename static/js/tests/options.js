var testOptions = {};

if (location.search) {
  var search = location.search.replace(/^\?/, '').split(/&/g),
      hasOthers = false;

  for (var i = 0; i < search.length; i++) {
    if (/^url=(.*)/.exec(search[i])) {
      testOptions.url = RegExp.$1;
    } else {
      testOptions[search[i]] = true;
      hasOthers = true;
    }
  }

  if (!hasOthers) {
    testOptions.all = true;
  }
}
