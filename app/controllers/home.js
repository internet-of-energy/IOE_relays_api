var DB_config = require('../../config/database.js');
var Gpio = require('onoff').Gpio;

/* GPIO setting GPIO pins to output*/
var relay_1 = new Gpio(8, 'out');
var relay_2 = new Gpio(10, 'out');
var relay_3 = new Gpio(12, 'out');


exports.relay = function(req, res) {
 var energy_req = req.body.energy_req;
}
