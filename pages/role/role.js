var config = require('../../config');
var self;
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