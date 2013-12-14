# connect-zero-test

Browser connection error behavior tester.

Currently browser error handling on the network stack is a bit piss poor. Using the XHR1 api, for example, you generally only get a `status` of 0 to signify many different classes of errors.

Worse browsers will premptively abort requests based on user navigation in order to save bandwidth. When it occurs the error cases are still about the same.

This project aims to provide a cross-browser test that will help us publically document the behaviors.

## Running

```sh
npm install
npm start
open http://localhost:8000/
```

## Tests

The following permutations of tests are (planed to be) supported:

Request Types:
- XHR
- script tags
- img tags

Error Cases:
- Navigation
  - Reload
  - History back/forward APIs
  - History pushState APIs
  - Metarefresh
  - Location modify w/ different URL
  - Location modify w/ only hash
- Network connection error
  - Closed connection
  - Partial response
  - Server unreachable
  - DNS failure
  - Timeout
- Initiating element removed from document

Page States:
- Page loaded
- Page still loading

Monitoring:
- XHR2 events
- error event
- beforeunload event
- unload event
- pagehide event

## Contributing

See a test case that we are missing? An event or signal that can be used to help differentiate errors on the device? Please let us [know][https://github.com/kpdecker/connect-zero-test/issues/new]!
