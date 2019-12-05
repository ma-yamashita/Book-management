function doGet() {
//  return HtmlService.createHtmlOutputFromFile("GAS/list")
  return HtmlService.createHtmlOutputFromFile("GAS/regist")
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function test() {
  var res = include("GAS/css");
  Logger.log(res); 
}