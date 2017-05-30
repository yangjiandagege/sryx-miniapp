var config = require('../../config');
var self;
var gameId;
Page({
  data: {
    roleList:{}
  },

  onLoad: function (options) {
    self = this;
    gameId = options.gameId;

    self.getRoleList();
  },

  getRoleList: function () {
    wx.request({
      url: config.baseUrl + "getrolelistingame",
      data: {
        gameId: gameId,
      },

      success: function (result) {
        self.setData({
          roleList: result.data.result
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
    });
  },
})