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

function statUpdate(stat, user, row) {  
  var sheet = SpreadsheetApp.openById('1JeDvyRevWXoVMOora4br1EvkwhE8hhp10-OkBxUdI1o').getSheetByName('books');
  const master = sheet.getDataRange().getValues();
  Logger.log("stat : " + stat);
  Logger.log("user : " + user);
  Logger.log("row : " + row);
  sheet.getRange(row, 3).setValue(stat);
  sheet.getRange(row, 4).setValue(user);
  sheet.getRange(row, 5).setValue(formatdate(Date.now()));//本日日付
}

function getURL() {
  return PropertiesService.getScriptProperties().getProperty("MY_URL");
}

function getUser() {
  var objUser = Session.getActiveUser();
  var strUser = objUser.toString();
  var userName = strUser.split('@')[0];
}

function getData(p1, p2) {
  var ssId = '1JeDvyRevWXoVMOora4br1EvkwhE8hhp10-OkBxUdI1o';
  var ss = SpreadsheetApp.openById(ssId);
  var sheet = ss.getSheetByName('books');
  var values = sheet.getDataRange().getValues();
  // テキストボックスの値が未入力であった場合
  if (!p1) return values;

  var result = [];
  var re = new RegExp('\.*' + p1 + '\.*');
  var head = values.shift();
  result.push(head);

  values.forEach(function(value) {
    if (re.test(value[0])) result.push(value);
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
