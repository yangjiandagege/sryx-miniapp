var config = require('../../config');
var self;
Page({
  data: {
    roleGrids:[],
    game:{},
  },

  onLoad: function (options) {
    self = this;
    wx.request({
      url: config.baseUrl + "getgamebyid",
      data: {
        gameId: options.gameId,
      },
      success: function (result) {
        var allNum = result.data.result.killerNum + result.data.result.policeNum + result.data.result.citizenNum;
        for (var i = 0; i < allNum; i++){
          self.data.roleGrids.push(i);
        }
        self.setData({
          game: result.data.result,
          roleGrids: self.data.roleGrids
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

})