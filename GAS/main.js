function doGet() {
//  return HtmlService.createTemplateFromFile("GAS/list").evaluate();
  return HtmlService.createTemplateFromFile("GAS/regist").evaluate();
}
  
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
