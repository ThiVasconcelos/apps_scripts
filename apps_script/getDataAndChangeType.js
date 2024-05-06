/* get data and change the data type before tranform it into tabular*/

function GETJSON(url) {
    var res =  UrlFetchApp.fetch(url);
    var dataAsText = res.getContentText();
    var data = JSON.parse(dataAsText);
    
    
    var conversions = {
      "impressions": "number",
      "clicks": "number",
      "channel": "string",
      "vieweables": "number",
      "start": "number",
      "firstQuartile": "number",
      "midpoint": "number",
      "thirdQuartile": "number",
      "complete": "number",
      "pause": "number",
      "details": "string",
      "ctr": "number",
      "va": "number",
      "vtr": "number",
      "percent_first": "number",
      "percent_mid": "number",
      "percent_third": "number",
      "redirect_url": "string"
    };
  
  
    var keys = Object.keys(data[0]);
    keys.forEach(key => {
      if (conversions.hasOwnProperty(key)) {
        data.forEach(row => {
          if (row[key] !== null && row[key] !== undefined) {
            row[key] = convertType(row[key], conversions[key]);
          }
        });
      }
    });
  
    
    var results = [keys];
    data.forEach(row => {
      var values = keys.map(key => row[key]);
      results.push(values);
    });
  
    return results;
  }
  
  
  function convertType(value, type) {
    switch (type) {
      case "number":
        return parseFloat(value);
      case "string":
      default:
        return String(value);
    }
  }
  