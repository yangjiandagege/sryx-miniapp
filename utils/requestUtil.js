var sha1 = require('./sha1')
var md5 = require('./md5')

const userServiceUrl = require('../config').config.userServiceUrl

function getTimestamp() {
  return new Date().format("yyyyMMddHHmmss");
}

function getEditTime() {
  return new Date().format("yyyy-MM-dd HH:mm:ss.SSS");
}

function getSign(nonce, timestamp, token) {
  var array=[nonce, timestamp, token]
  array.sort();
  var sum = array[0] + array[1] + array[2];
  return sha1.sha1(sum);
}

function getNonce() {
  var nonce = "";
  for(var i = 0; i < 9; i++) {
    var randomNum = Math.floor(Math.random()*10);
    nonce = nonce + randomNum;
  }
  return nonce;
}

function getEncryptedPwd(pwd) {
  return md5.hex_md5(md5.hex_md5(md5.hex_md5(pwd)));
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

function request(serviceCode, business, callback, url, token) {
  var timestamp = getTimestamp();
  var editTime = getEditTime();
  var nonce = getNonce();
  var tokenTmp;
  if (token != null) {
    tokenTmp = token;
  }else {
    tokenTmp = getApp().user.token;
  }
  var sign = getSign(nonce, timestamp, tokenTmp);
  var requestUrl;
  if(url == null){
    requestUrl = userServiceUrl;
  }else{
    requestUrl = url;
  }

  wx.request({
          url: requestUrl,
          data: {
            sign: sign,
            nonce: nonce,
            timestamp: timestamp,
            device: "wx",
            ipaddr: "127.0.0.1",
            sn: "wx123456",
            app: "微信小程序测试",
            mac: "00:11:22:33:44:55",

            realName: getApp().user.realName==null?0:getApp().user.realName,
            companyId: getApp().user.companyId==null?0:getApp().user.companyId,
            companyName: getApp().user.companyName==null?0:getApp().user.companyName,
            departmentId: getApp().user.departmentId==null?0:getApp().user.departmentId,
            departmentName: getApp().user.departmentName==null?0:getApp().user.departmentName,
            editUserId: getApp().user.atUserId==null?0:getApp().user.atUserId,
            editTime: editTime,

            serviceCode: serviceCode,
            business: business,
          },

          success: function(result) {
            console.log(result.data.result);
            callback((result.data.returnCode==200?true:false), 
                      result.data.result,
                      result.data.returnCode, 
                      result.data.returnMsg);
          },

          fail: function({errMsg}) {
            callback(false, 404, "连接服务器失败");
          }
        })
}

module.exports = {
  getTimestamp: getTimestamp,
  getNonce:getNonce,
  getSign:getSign,
  getEncryptedPwd:getEncryptedPwd,
  request:request,
}