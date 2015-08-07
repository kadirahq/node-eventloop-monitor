var util = require('util');
var now = require("performance-now");
var EventEmitter = require('events').EventEmitter;

function EventLoopMonitor(timeoutMillis) {
  this.timeoutMillis = timeoutMillis || 100;
  this._watchLag = this._watchLag.bind(this);
  this._stopped = true;
  this._startTime = null;
  this._totalLag = 0;
}

util.inherits(EventLoopMonitor, EventEmitter);
module.exports = EventLoopMonitor;

EventLoopMonitor.prototype.start = function() {

  this._stopped = false;
  this._lastWatchTime = null;
  this._startTime = Date.now();
  this._totalLag = 0;

  this.on('lag', this._watchLag);
  this._detectLag();
};

EventLoopMonitor.prototype.stop = function() {
  this._stopped = true;
  this.removeAllListeners('lag');
};

EventLoopMonitor.prototype.status = function() {
  var pctBlock = 0;
  var elapsedTime = 0;
  if(this._lastWatchTime) {
    elapsedTime = this._lastWatchTime - this._startTime;
    pctBlock = (this._totalLag / elapsedTime) * 100;
  }

  this._startTime = this._lastWatchTime;
  this._totalLag = 0;

  var statusObject = {
    pctBlock: pctBlock,
    elapsedTime: elapsedTime
  };

  return statusObject;
};

EventLoopMonitor.prototype._watchLag = function(lag) {
  this._lastWatchTime = Date.now();
  this._totalLag += lag;
};

EventLoopMonitor.prototype._detectLag = function() {
  var self = this;
  var start = now();
  setTimeout(function() {
    var end = now();
    var elapsedTime = end - start;
    var lag  = Math.max(0, elapsedTime - self.timeoutMillis);
    if(!self._stopped) {
      self.emit('lag', lag)
      self._detectLag();
    }
  }, self.timeoutMillis);
};
