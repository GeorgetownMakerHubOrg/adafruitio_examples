// test adafrut.io
var request = require("request");

var key = ""; // put key here

var group = "jukebox";
var feedname= "current_song";

function send_jukebox(value){
  var sendurl = "https://io.adafruit.com/api/groups/jukebox/send.json?x-aio-key="+key+"&"+feedname+"="+value;
  request(sendurl, function(error, response, body){
    console.log("send");
    console.log(error);
 //   console.log(response);
    console.log(body);
  });
}


var prev_stream_id = false;
function poll_jukebox(callback){
  var receiveurl = "https://io.adafruit.com/api/groups/"+group+"/receive.json?x-aio-key="+key
  request(receiveurl, function(error, response, body){
   // console.log("receive");
//    console.log(error);
//    console.log(response);
//    console.log(body);
    if(error){
        console.log("ERROR" + error);
        return;
    }
    var data = JSON.parse(body);
    var stream = false;
    var feeds = data.feeds.filter(function(f){return f.name = feedname});
    if(feeds.length > 0){
        stream = feeds[0].stream;
        if(prev_stream_id != stream.id){
          prev_stream_id = stream.id;
          callback(stream.value);
        }else{
         // console.log("same value");
        }
    }    
  });
}

function new_poll_value(value){
    console.log("new value: " + value);
}


send_jukebox("my value 5");

setInterval(function(){poll_jukebox(new_poll_value);}, 3000);
