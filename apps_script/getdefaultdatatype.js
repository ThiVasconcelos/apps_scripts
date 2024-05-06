/*
Checking the data from the json file
*/

function checkdatatypemetrike() {
    var url = "endpoint_url" 
    var res = UrlFetchApp.fetch(url);
    var dataAsText = res.getContentText();
    var data = JSON.parse(dataAsText);
    
    var keys = Object.keys(data[0]);
    var results = [];
    
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var firstValue = data[0][key];
      var type = typeof firstValue;
      results.push({ key: key, type: type });
    }
    console.log(results)
  
  }
  