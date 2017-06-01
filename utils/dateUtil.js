module.exports = {
  getCurrentDate: getCurrentDate,
  addDays: addDays,
}

function getCurrentDate() {
  return new Date().format("yyyy-MM-dd");
}

function addDays(dateTemp, days) {  
  var dateTemp = dateTemp.split("-");  
  var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式    
  var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);  
  var rDate = new Date(millSeconds);  

  var year = rDate.getFullYear();  

  var month = rDate.getMonth() + 1;  
  if (month < 10){
    month = "0" + month;  
  } 
  var date = rDate.getDate();  
  if (date < 10) {
    date = "0" + date;  
  }
  return (year + "-" + month + "-" + date);  
}

Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "H+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
