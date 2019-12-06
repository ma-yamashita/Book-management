function doGet() {
  return HtmlService.createTemplateFromFile("GAS/list").evaluate();
//  return HtmlService.createTemplateFromFile("GAS/regist").evaluate();
}
  
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getData() {
  return SpreadsheetApp
    .openById('1JeDvyRevWXoVMOora4br1EvkwhE8hhp10-OkBxUdI1o')
    .getActiveSheet()
    .getDataRange()
    .getValues();
}

function fomatdate(mydate) {
  var fdate = "";
  if (typeof mydate == "object") {
    fdate = Utilities.formatDate(new Date(mydate), "JST", "yyyy/MM/dd");
  }
  return fdate; 
}