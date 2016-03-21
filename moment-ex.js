var moment = require('moment');
var now = moment();
//console.log(now.format('X'));
//
//console.log(now.valueOf());

var timeStamp =1458572052292;
var timestampMoment = moment.utc(timeStamp);
console.log(timestampMoment.local().format('h:mm a'));
//now.subtract(1, 'year');
//console.log(now.format());
//
//console.log(now.format('h:mm a'));
