function doGet(e) {
  var page = e.parameter["p"];
  Logger.log(page);
  if(page == "list" || page == null) {
    return HtmlService.createTemplateFromFile("GAS/list").evaluate();
  }else if(page == "regist") {
    return HtmlService.createTemplateFromFile("GAS/regist").evaluate();    
  }else{
    return ContentService.createTextOutput("ERROR：");
  }
}
  
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function saveData(name, owner, whereabouts, url, comment) {  
  var sheet = SpreadsheetApp.openById('1JeDvyRevWXoVMOora4br1EvkwhE8hhp10-OkBxUdI1o').getSheetByName('books');
  const master = sheet.getDataRange().getValues();
  var newRow = sheet.getLastRow()+1;
  sheet.getRange(newRow, 1).setValue(name);
  sheet.getRange(newRow, 2).setValue(whereabouts);
  sheet.getRange(newRow, 3).setValue(owner);
  sheet.getRange(newRow, 7).setValue(url);
  sheet.getRange(newRow, 8).setValue(comment);
}

function getURL() {
  return PropertiesService.getScriptProperties().getProperty("MY_URL");
}
