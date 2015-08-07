var util = require('util');
var EventEmitter = require('events').EventEmitter;

function EventLoopMonitor(timeoutMillis) {
  this.timeoutMillis = timeoutMillis;
  this._watchLag = this._watchLag.bind(this);
  this._stopped = true;
  this._startTime = null;
  this._totalLag = 0;
}

util.inherits(EventLoopMonitor, EventEmitter);
modules.exports = EventLoopMonitor;

this.start = function() {
  this.on('lag', this._watchLag);
  this._startLoopMonitor();

  this._stopped = false;
  this._lastWatchTime = null;
  this._startTime = Date.now();
  this._totalLag = 0;
};

this.stop = function() {
  this._stopped = true;
  this.removeAllListeners('lag');
};

this.status = function() {
  var timeElapsed = this._lastWatchTime - this._startTime;
  var lagPct = (this._totalLag / timeElapsed) * 100;

  this._startTime = this._lastWatchTime;
  this._totalLag = 0;

  var statusObject = {
    lagPct: lagPct
  };

  return statusObject;
};

this._watchLag = function(lag) {
  this._lastWatchTime = Date.now();
  this._totalLag += lag;
};

this._startLoopMonitor = function() {
  var self = this;
  var start = Date.now();
  setTimeout(function() {
    var end = Date.now();
    var lag  = Math.max(0, end - start - self.timeoutMillis);
    if(!self._stopped) {
      self.emit('lag', lag)
      self._startLoopMonitor();
    }
  }, timeoutMillis);
};
