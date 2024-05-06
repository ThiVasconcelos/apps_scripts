/*
This script creates a new file with the data from the original spreadsheet and moves it to the backup folder.
*/
function saveDataWithTimestamps() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = spreadsheet.getSheets();
    var timestamp = new Date();
    var formattedTimestamp = Utilities.formatDate(timestamp, "GMT-03:00", "-yyyy_MM_dd-HH_mm_ss");
    var backupSheet = SpreadsheetApp.create("backup_db_geral_secon" + formattedTimestamp);
    var backupSpreadsheet = SpreadsheetApp.openById(backupSheet.getId());
    var summarySheet = backupSpreadsheet.insertSheet("Resumo");
    summarySheet.appendRow(["Nome_Aba", "Total_Colunas", "Total_Linhas", "TotalCelulasPagina"]);
  
    sheets.forEach(function(sheet) {
      var values = sheet.getDataRange().getValues();
      var newSheet = backupSpreadsheet.insertSheet(sheet.getName());
      newSheet.getRange(1, 1, values.length, values[0].length).setValues(values);
      var totalColunas = values[0].length;
      var totalLinhas = values.length;
      var produto = totalColunas * totalLinhas;
      summarySheet.appendRow([sheet.getName(), totalColunas, totalLinhas, produto]);
    });
  
    backupSpreadsheet.deleteSheet(backupSpreadsheet.getSheetByName("Página1"));
   
    var folder = DriveApp.getFolderById("12oEf35MMmPcEA23aLX4oIre515FWwcDY");
    var sheetToMove= DriveApp.getFileById(backupSheet.getId());
    sheetToMove.moveTo(folder);
  }
  