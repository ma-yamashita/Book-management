function doGet(e) {
  var page = e.parameter["p"];
  if(page == "list" || page == null) {
    var myHtml = HtmlService.createTemplateFromFile("GAS/list");
    myHtml.myUser = getUser();
    return myHtml.evaluate();
  }else if(page == "regist") {
    var myHtml = HtmlService.createTemplateFromFile("GAS/regist");    
    myHtml.myTarget = e.parameter["t"];
    return myHtml.evaluate();
  }else{
    return ContentService.createTextOutput("ERROR：");
  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function saveData(editId, name, owner, whereabouts, url, comment) {  
  var ssId = getSSID();
  var sheetName = getSheetName();
  var ss = SpreadsheetApp.openById(ssId);
  var sheet = ss.getSheetByName(sheetName);
  var values = sheet.getDataRange().getValues();
  var cntRow = sheet.getLastRow();
  if(editId > 0) {
    for(var i = 0; i < cntRow; i++) {
      var editRow = i + 1;
      if(values[i][0] == editId) {
        var sValues = [[name, whereabouts, owner]];
        sheet.getRange("B" + editRow + ":D" + editRow).setValues(sValues);
        var sValues = [[url, comment]];
        sheet.getRange("H" + editRow + ":I" + editRow).setValues(sValues);
      };    
    };
  } else {
    var newRow = cntRow + 1;
    var array = [];
    for(var i = 0; i < cntRow; i++) array.push(values[i][0]);
    array.sort(compareFunc);
    var bookid = array[array.length - 1] + 1;
    var setValues = [[bookid, name, whereabouts, owner, "", "", "", url, comment]];
    sheet.getRange("A" + newRow + ":I" + newRow).setValues(setValues);
  }
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
  var userName = Session.getActiveUser().toString().split("@")[0];
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
    var row = values[i];
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

function getEditData(editId) {
  var ssId = getSSID();
  var sheetName = getSheetName();
  var ss = SpreadsheetApp.openById(ssId);
  var sheet = ss.getSheetByName(sheetName);
  var values = sheet.getDataRange().getValues();
  var result = [];
  // IDの一致するデータを取得する
  values.forEach(function(value) {
    if(value[0] == editId) result.push(value);    
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
