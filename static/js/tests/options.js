var testOptions = {
  all: true
};

if (location.search) {
  testOptions = {};

  var search = location.search.replace(/^\?/, '').split(/&/g);
  for (var i = 0; i < search.length; i++) {
    testOptions[search[i]] = true;
  }
}
