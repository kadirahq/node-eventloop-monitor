## Eventloop Monitor

Yet another package to watch the eventloop usage. Unlike other package, this package gives the percentage of blockness by default.

### Installation

~~~
npm i --save evloop-monitor
~~~

### Usage

~~~js
var EventLoopMonitor = require('evloop-monitor');
// watch the eventloop monitor for every 200 milliseconds
var monitor = new EventLoopMonitor(200);
monitor.start();

// let's get the status
setInterval(function() {
    console.log(monitor.status());
    // output an object like: 
    //  {pctBlock: 40.87, elapsedTime: 2031, totalLag: 830.06}
}, 2000);
~~~

**Note:** `monitor.status()` reset the previous lag times.