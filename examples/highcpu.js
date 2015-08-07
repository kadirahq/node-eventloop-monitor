var blocked = require('blocked');
var EventLoopMonitor = require('../lib');

setInterval(function(){
  for(var lc=0; lc<999999999; lc++) {
    Math.random();
  }
}, 100);

setInterval(function(){
  for(var lc=0; lc<999999999; lc++) {
    Math.random();
  }
}, 100);

// setInterval(function(){
//   for(var lc=0; lc<999999999; lc++) {
//     Math.random();
//   }
// }, 100);

// setInterval(function(){
//   for(var lc=0; lc<999999999; lc++) {
//     Math.random();
//   }
// }, 100);

// setInterval(function(){
//   Array(100000000).join('a')
// }, 10);

// blocked(function(ms){
//   console.log('BLOCKED FOR %sms', ms | 0);
// });

var monitor = new EventLoopMonitor(200);
monitor.start();

setInterval(function() {
  console.log(monitor.status().pctBlock.toFixed(2));
}, 1000);