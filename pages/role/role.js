var config = require('../../config');
var self;
var role;
Page({

  data: {
    role:{}
  },

  onLoad: function (options) {
    self = this;

    wx.request({
      url: config.baseUrl + "getmyroleingame",
      data: {
        playerId: getApp().user.openid,
        gameId: options.gameId,
      },
      success: function (result) {
        self.setData({
          role: result.data.result
        })
        switch(result.data.result.roleType){
          case 0:
            role = "杀手";
          break;
          case 1:
            role = "警察";
          break;
          case 2:
            role = "平民";
          break;

        }
        wx.setNavigationBarTitle({
          title: "我是" + role + "（" + options.inviteCode + "）",
        })
      },

      fail: function ({errMsg}) {
        wx.showModal({
          title: "错误",
          content: errMsg,
          confirmText: "确定",
          showCancel: false,
        })
      }
    })
  },

  onUnload: function () {
  
  },
})