var EventLoopMonitor = require('../lib');

setInterval(function(){
  for(var lc=0; lc<999999999; lc++) {
    Math.random();
  }
}, 100);


var monitor = new EventLoopMonitor(200);
monitor.start();

setInterval(function() {
  console.log(monitor.status());
}, 2000);