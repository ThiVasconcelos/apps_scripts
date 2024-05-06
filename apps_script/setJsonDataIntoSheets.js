/*
This script fetches JSON data from specified API endpoints and populates corresponding Google Sheets tabs.
 It iterates through each tab name and URL, fetches the JSON data, parses it, and then converts specific data 
 types as per predefined conversions. Finally, it updates the Google Sheets with the parsed data.*/
function GETJSON() {
    var urls = ["url_api_endpoint_here_with_token","url_api_endpoint_here_with_token"];
    var tabnames = ["CPM", "CPV"]; 
  
    for (var i = 0; i < tabnames.length; i++) { 
      var res = UrlFetchApp.fetch(urls[i]); 
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
  
      var sheet = SpreadsheetApp.getActiveSpreadsheet();
      var aba = sheet.getSheetByName(tabnames[i]); 
      aba.getRange(1, 1, results.length, keys.length).setValues(results);
    }
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
  