var DB_config = require('../../config/database.js');
var GPIO= require('onoff').Gpio;
var Delay = require('delay');

/* GPIO setting GPIO pins to output*/
var relay_1 = new GPIO(8, 'out');
var relay_2 = new GPIO(10, 'out');
var relay_3 = new GPIO(12, 'out');


exports.relay = function(req, res) {

//Takes parameters from GET request
 var Energy_req = req.query.energy_req;
 var Tk_batt = req.query.tk_batt;
 var Sn_batt = req.query.sn_batt;

 DB_config.connection.query("select * from relays where tk_batt = ? AND sn_batt = ?",[Tk_batt,Sn_batt],
 function (err, result, fields) {

  if (err) throw err;

   //gets the relay id
   var Relay = result[0].r_id;

   var Trans_sp = result[0].trans_sp;
   var Delay_seconds = (Energy_req * 1000)/Trans_sp;

   Relay.writeSync(1);
   Delay(Delay_seconds);
   Relay.writeSync(0);

   res.json(result);

  res.redirect('/home');
 });


}
