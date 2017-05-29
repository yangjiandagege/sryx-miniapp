var config = require('../../config');
var self;
Page({
  data: {
    inputContent: '',
    char_1: '',
    char_2: '',
    char_3: '',
    char_4: '',
  },

  onLoad: function (options) {
    self = this;
  },

  inviteCodeInput: function (e) {
    self.setData({
      inputContent: e.detail.value,
      char_1: e.detail.value.charAt(0),
      char_2: e.detail.value.charAt(1),
      char_3: e.detail.value.charAt(2),
      char_4: e.detail.value.charAt(3),
    })



    if (self.data.inputContent.length == 4) {

      self.submit();

    }
  },

  submit: function(){
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })

    wx.request({
      url: config.baseUrl + "getgamebyid",
      data: {
        inviteCode: self.data.inputContent,
      },

      success: function (result) {
        wx.request({
          url: config.baseUrl + "updaterole",
          data: {
            gameId: result.data.result.gameId,
            playerId: getApp().user.openid,
            playerNickName: getApp().user.userInfo.nickName,
            playerAvatarUrl: getApp().user.userInfo.avatarUrl,
          },
          success: function (result) {
            wx.hideToast();
          },

          fail: function ({errMsg}) {
            wx.hideToast();
            wx.showModal({
              title: "错误",
              content: errMsg,
              confirmText: "确定",
              showCancel: false,
            })
          }
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
  }
})