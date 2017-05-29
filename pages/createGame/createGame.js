var config = require('../../config');
var self = this;
Page({
  data: {
    killerNum:null,
    policeNum:null,
    citizenNum:null
  },

  onLoad: function (options) {
    self = this;
  },

  killerNumInput: function (e) {
    self.setData({
      killerNum: e.detail.value
    });
  },

  policeNumInput: function (e) {
    self.setData({
      policeNum: e.detail.value
    });
  },

  citizenNumInput: function (e) {
    self.setData({
      citizenNum: e.detail.value
    });
  },

  createGameTap: function (e){
    if (self.data.killerNum == null || self.data.policeNum == null || self.data.citizenNum == null){
      wx.showModal({
        title: "提示",
        content: "请您输入完整信息，谢谢！",
        confirmText: "确定",
        showCancel: false,
      })
    }else{
      self.setData({
        loading: true
      })
      wx.request({
        url: config.baseUrl + "creategame",
        data: {
          gameOwnerId: getApp().user.openid,
          state: 0,
          killerNum: self.data.killerNum,
          policeNum: self.data.policeNum,
          citizenNum: self.data.citizenNum,
        },
        success: function (result) {
          console.log(result.data);
          self.setData({
            loading: false
          })
          wx.navigateTo({
            url: '/pages/waitGame/waitGame?gameId=' + result.data.result,
          })
        },

        fail: function ({errMsg}) {
          wx.showModal({
            title: "错误",
            content: errMsg,
            confirmText: "确定",
            showCancel: false,
          })
          self.setData({
            loading: false
          })
        }
      })
    }
  }
})