var DB_config = require('../../config/database.js');
var GPIO= require('onoff').Gpio;
var sleep = require('sleep');

// The relays for transferring energy
var relay = [new GPIO(14, 'out'),new GPIO(10, 'out'), new GPIO(12, 'out')];

//turns the relay on
relay[0].writeSync(1);
relay[1].writeSync(1);
relay[2].writeSync(1);

exports.relay = function(req, res) {

//Takes parameters from GET request
 var Energy_req = req.query.energy_req;
 var Tk_batt = req.query.tk_batt;
 var Sn_batt = req.query.sn_batt;


var result = relay_details(Energy_req,Tk_batt,Sn_batt);

   //gets the relay id
   var Relay = result[0].r_id;
   var Trans_sp = result[0].trans_sp;
   var Delay_seconds = (Energy_req * 1000)/Trans_sp;

   //turns the relay on
   relay[Relay].writeSync(0);
   sleep.sleep(Delay_seconds);
   //turns the relay off
   relay[Relay].writeSync(1);
   res.json(result);





}

exports.relay_details = function(req, res) {

//Takes parameters from GET request
 var Energy_req = req.query.energy_req;
 var Tk_batt = req.query.tk_batt;
 var Sn_batt = req.query.sn_batt;


 var return1 = relay_details(Energy_req,Tk_batt,Sn_batt);
 var result = {return1};

   console.log(result);
   var Trans_sp = result.return1[0].trans_sp;
   var Delay_seconds = (Energy_req * 1000)/Trans_sp;

  //Converts the delay to a json format
   var delay = {delay: Delay_seconds};

   var result_delay = {result,delay};


   res.json(result_delay);

}

//Does the search query for battery information
function relay_details(Energy_req,Tk_batt,Sn_batt){
  DB_config.connection.query("select * from relays where tk_batt = ? AND sn_batt = ?",[Tk_batt,Sn_batt],
  function (err, result, fields) {

   if (err) throw err;
   else{
    return result;
  }
  });
}
