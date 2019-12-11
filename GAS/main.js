function doGet() {
  return HtmlService.createTemplateFromFile("GAS/list").evaluate();
//  return HtmlService.createTemplateFromFile("GAS/regist").evaluate();
}
  
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function mytest() {
  getData("HTTP");
}

function getData(p1, p2) {
  var ssId = '1JeDvyRevWXoVMOora4br1EvkwhE8hhp10-OkBxUdI1o';
  var ss = SpreadsheetApp.openById(ssId);
  var sheet = ss.getSheetByName('books');
  var values = sheet.getDataRange().getValues();
  // テキストボックスの値が未入力であった場合
  Logger.log("p1:" + p1);
  Logger.log("p2:" + p2);
  if (!p1) return values;

  var result = [];
  var re = new RegExp('\.*' + p1 + '\.*');
  var head = values.shift();
  result.push(head);

  Logger.log(re);
  Logger.log(re.test(values[0]));

  values.forEach(function(value) {
    if (re.test(value[0])) result.push(value);
  });
  return result;

function fomatdate(mydate) {
  var fdate = "";
  if (typeof mydate == "object") {
    fdate = Utilities.formatDate(new Date(mydate), "JST", "yyyy/MM/dd");
  }
  return fdate; 
}
