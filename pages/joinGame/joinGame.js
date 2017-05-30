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
      console.log("submitRole");
      self.submitRole();
    }
  },

  submitRole: function(){
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })

    wx.request({
      url: config.baseUrl + "getgamebyinvitecode",
      data: {
        inviteCode: self.data.inputContent,
      },

      success: function (result) {
        if (result.data.returnCode == '200') {
          wx.request({
            url: config.baseUrl + "updaterole",
            data: {
              gameId: result.data.result.gameId,
              playerId: getApp().user.openid,
              playerNickName: getApp().user.userInfo.nickName,
              playerAvatarUrl: getApp().user.userInfo.avatarUrl,
            },
            success: function (res) {
              wx.hideToast();
              if (res.data.returnCode=='200'){
                wx.redirectTo({
                  url: '/pages/role/role?gameId=' + result.data.result.gameId,
                })
              }else{
                wx.showModal({
                  title: "错误",
                  content: res.data.returnMsg,
                  confirmText: "确定",
                  showCancel: false,
                  success: function(){
                    wx.navigateBack({})
                  }
                })
              }
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
        }else{
          wx.hideToast();
          wx.showModal({
            title: "错误",
            content: "该邀请码已经过期！",
            confirmText: "确定",
            showCancel: false,
            success: function () {
              wx.navigateBack({})
            }
          })
        }
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