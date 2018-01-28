
var key = get_aio_key();
var group = "jukebox";
var feedname= "current_song";


var parameter;

function doGet(e) {
  
  parameter = e.parameter;
  var page= e.parameter.page;
  if(!page){
    page = 'index';
  }
  
     return HtmlService
     .createTemplateFromFile(page)
    // .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
     .evaluate();
}



function testsend(value) {
  if(!value){
    value="mytest";
  }
  var sendurl = "https://io.adafruit.com/api/groups/jukebox/send.json?x-aio-key="+key+"&"+feedname+"="+value;
  var responseJSON = UrlFetchApp.fetch(sendurl);
  var response= JSON.parse(responseJSON);
  Logger.log(response);

}

var prev_stream_id = false;
function testreceive(callback){
  var receiveurl = "https://io.adafruit.com/api/groups/"+group+"/receive.json?x-aio-key="+key
  var responseJSON = UrlFetchApp.fetch(receiveurl);
  var data= JSON.parse(responseJSON);
  var stream = false;
  var feeds = data.feeds.filter(function(f){return f.name = feedname});
  if(feeds.length > 0){
    stream = feeds[0].stream;
    if(prev_stream_id != stream.id){
      prev_stream_id = stream.id;
      if(callback){
        callback(stream.value);
      }else{
        Logger.log(stream.value);
      }
    }else{
      Logger.log("same value");
    }
  }    
}

