var config = require('./config');
App({
  onLaunch: function () {
    var self = this;
    wx.login({
      success: function (data) {
        console.log('step1 success 调用微信登录接口');

        wx.request({
          url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + config.appId + "&secret=" + config.appSecret + "&js_code=" + data.code + "&grant_type=authorization_code",
          data: {
            code: data.code
          },
          success: function (res) {
            getApp().user.openid = res.data.openid;
            console.log('step2.0 success 获取微信openid ：', getApp().user.openid);

            wx.request({
              url: `https://api.weixin.qq.com/cgi-bin/token`,
              data: {
                grant_type: 'client_credential',
                appid: config.appId,
                secret: config.appSecret,
              },

              success: function (result) {
                console.log('step3 success 获取用户access_token：' + result.data.access_token+'，初始化完成');
                getApp().user.accessToken = result.data.access_token;
              },

              fail: function ({errMsg}) {
                console.log('step3 fail 获取用户access_token', errMsg);
              }
            })
          },

          fail: function (res) {
            console.log('step2.0 fail 获取微信openid，将无法正常使用开放接口等服务', res);
          }
        })

        wx.getUserInfo({
          success: function (res) {
            console.log('step2.1 success 获取微信用户信息 ' ,res.userInfo);
            getApp().user.userInfo = res.userInfo;
          },

          fail: function (res) {
            console.log('step2.1 fail 获取微信用户信息', res);
          }
        })
      },
      
      fail: function (err) {
        console.log('step1 fail 调用微信登录接口，将无法正常使用开放接口等服务', err);
      }
    })
  },

  user:{
    userInfo:{},
    openid:null,
    accessToken:null,
  },
})