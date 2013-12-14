var testLog = [],
    phaseLog = [];

function logPhase() {
  if (phaseLog && phaseLog.length) {
    testLog.push(phaseLog);
    phaseLog = [];
  }
  if (arguments.length) {
    phaseLog = [Array.prototype.slice.call(arguments).join(' ')];
  }
}

function recordLog(log) {
  phaseLog.push(log.join(' '));
}

