function doGet(e) {
  var page = e.parameter["p"];
  if(page == "list" || page == null) {
    var myHtml = HtmlService.createTemplateFromFile("GAS/list");
    myHtml.myUser = getUser();
    return myHtml.evaluate();
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
  var ssId = getSSID();
  var sheetName = getSheetName();
  var ss = SpreadsheetApp.openById(ssId);
  var sheet = ss.getSheetByName(sheetName);
  var values = sheet.getDataRange().getValues();
  var cntRow = sheet.getLastRow()
  var newRow = cntRow + 1;
  var array = [];
  for(var i = 0; i < cntRow; i++) array.push(values[i][0]);
  array.sort(compareFunc);
  var bookid = array[array.length - 1] + 1;
  sheet.getRange(newRow, 1).setValue(bookid);
  sheet.getRange(newRow, 2).setValue(name);
  sheet.getRange(newRow, 3).setValue(whereabouts);
  sheet.getRange(newRow, 4).setValue(owner);
  sheet.getRange(newRow, 8).setValue(url);
  sheet.getRange(newRow, 9).setValue(comment);
}

function compareFunc(a, b){
  return a - b;
}

function getURL() {
  return PropertiesService.getScriptProperties().getProperty("MY_URL");
}

function getSSID() {
  return PropertiesService.getScriptProperties().getProperty("MY_SSID");
}

function getSheetName() {
  return PropertiesService.getScriptProperties().getProperty("MY_SheetName");
}

function getUser() {
  var objUser = Session.getActiveUser();
  var strUser = objUser.toString();
  var userName = strUser.split("@")[0];
  return userName;
}

function updateItem(bookId, lendReturn) {
  var ssId = getSSID();
  var sheetName = getSheetName();
  var ss = SpreadsheetApp.openById(ssId);
  var sheet = ss.getSheetByName(sheetName);
  var values = sheet.getDataRange().getValues();
  var cntRow = sheet.getLastRow();
  for (var i = 0; i < cntRow; ++i) {
    var row = values[i]
    if(row[0] == bookId) {
      if(lendReturn == "L") {
        var today = new Date();
        var strToday = (today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate());
        sheet.getRange(i + 1, 5).setValue(1);// 貸出ステータス
        sheet.getRange(i + 1, 6).setValue(getUser());// 貸出者
        sheet.getRange(i + 1, 7).setValue(strToday);// 貸出日＝本日日付
      } else {
        sheet.getRange(i + 1, 5).setValue(0);// 貸出ステータス
        sheet.getRange(i + 1, 6).setValue("");// 貸出者
        sheet.getRange(i + 1, 7).setValue("");// 貸出日
      }
    }
  }
}

/**
 * DBよりデータの抽出を行う関数です
 * @param  {String}} p1 検索バーに入力された文字列
 * @param  {Number} p2 所在検索（福井、東京、沖縄）
 * @return {Object} result DBより抽出したデータ
 */
function getData(p1, p2) {
  var ssId = getSSID();
  var sheetName = getSheetName();
  var ss = SpreadsheetApp.openById(ssId);
  var sheet = ss.getSheetByName(sheetName);
  var values = sheet.getDataRange().getValues();
  // 検索条件がないとき、全件データ取得する
  if (!p1 && p2 < 1) return values;
  var result = [];
  // 検索条件があるとき、絞り込みを行いデータを取得する
  var re = new RegExp("\.*" + p1 + "\.*");
  var head = values.shift();// valuesからヘッダーを取り除く
  result.push(head);// 取り除いた要素（ヘッダー）を結果に追加する
  values.forEach(function(value) {
    if(p1 && p2 >= 1) {if (re.test(value[1]) && value[2] == p2) result.push(value)};    
    if(!p1 && p2 >= 1) {if (value[2] == p2) result.push(value)};
    if(p1 && p2 < 1) {if (re.test(value[1])) result.push(value)};
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
