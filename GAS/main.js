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

function mytest() {
  getData("HTTP");
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

function getData(p1, p2) {
  var ssId = '1JeDvyRevWXoVMOora4br1EvkwhE8hhp10-OkBxUdI1o';
  var ss = SpreadsheetApp.openById(ssId);
  var sheet = ss.getSheetByName('books');
  var values = sheet.getDataRange().getValues();
  // テキストボックスの値が未入力であった場合
  Logger.log("p1:" + p1);
  Logger.log("p2:" + p2);
  if (!p1 && p2 < 1) return values;

  var result = [];
  var re = new RegExp('\.*' + p1 + '\.*');
  var head = values.shift();
  result.push(head);

  Logger.log(re);
  Logger.log(re.test(values[0]));

  values.forEach(function(value) {
    if(p1 && p2 >= 1) {if (re.test(value[0]) && value[1] == p2) result.push(value)};    
    if(!p1 && p2 >= 1) {if (value[1] == p2) result.push(value)};
    if(p1 && p2 < 1) {if (re.test(value[0])) result.push(value)};
  });
  return result;
}

function fomatdate(mydate) {
  var fdate = "";
  if (typeof mydate == "object") {
    fdate = Utilities.formatDate(new Date(mydate), "JST", "yyyy/MM/dd");
  }
  return fdate; 
}
