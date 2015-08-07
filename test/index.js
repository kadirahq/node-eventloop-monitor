var EventloopMonitor = require('../');
var assert = require('assert');

suite('eventloop-monitor', function() {
  test('basic usage', function(done) {
    var monitor = new EventloopMonitor(100);
    monitor.start();
    setTimeout(function() {
      var status = monitor.status();
      assert.equal(status.pctBlock > 0, true);
      assert.equal(status.totalLag > 0, true);
      assert.equal(status.elapsedTime > 0, true);
      monitor.stop();
      done();
    }, 300);  
  });

  test('usage just after created', function(done) {
    var monitor = new EventloopMonitor(100);
    monitor.start();
    var status = monitor.status();
    assert.equal(status.pctBlock === 0, true);
    monitor.stop();
    done();
  });

   test('usage after stopped', function(done) {
    var monitor = new EventloopMonitor(100);
    monitor.start();

    setTimeout(function() {
      assert.equal(monitor.status().pctBlock > 0, true);
      monitor.stop();
      assert.equal(monitor.status().pctBlock === 0, true);
      done();
    }, 200)
  });
});