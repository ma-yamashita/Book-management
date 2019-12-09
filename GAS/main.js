function doGet() {
  return HtmlService.createTemplateFromFile("GAS/list").evaluate();
//  return HtmlService.createTemplateFromFile("GAS/regist").evaluate();
}
  
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// function getData() {
//   return SpreadsheetApp
//     .openById('1JeDvyRevWXoVMOora4br1EvkwhE8hhp10-OkBxUdI1o')
//     .getActiveSheet()
//     .getDataRange()
//     .getValues();
// }

function mytest() {
  getData("HTTP");
}

function getData(paramete1,paramete2) {
  
  var sheet = SpreadsheetApp.openById('1JeDvyRevWXoVMOora4br1EvkwhE8hhp10-OkBxUdI1o').getActiveSheet();
  const master = sheet.getDataRange().getValues();
  
  if (paramete1===undefined) {
    return master;
  } else {
    Logger.log(paramete1);
    Logger.log(paramete2);
    //部分一致？
    var re = new RegExp('/\*' + paramete1 + '\*/');
    master.filter(function(e){
      Logger.log(re);
      Logger.log(re.test(e[0]))});

    
    const extraction = master
    .filter(function(e){return re.test(e[0])})
    .map(function(e){
      const columns = [0,1,2,3,4,5,6],row = [];
      for (var i = 0; i < columns.length; i++) row.push(e[columns[i]]);
      return row;
    });
    
    Logger.log("test");
    Logger.log(extraction.length);
    Logger.log(extraction);
    return extraction;//再描画？
  }  
}

function fomatdate(mydate) {
  var fdate = "";
  if (typeof mydate == "object") {
    fdate = Utilities.formatDate(new Date(mydate), "JST", "yyyy/MM/dd");
  }
  return fdate; 
}