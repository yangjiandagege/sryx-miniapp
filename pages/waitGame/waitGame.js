var config = require('../../config');
var self;
var timer;
var clock;
var gameId;
Page({
  data: {
    roleGrids:[],
    game:{},
    counter:120,
    loading:true
  },

  onLoad: function (options) {
    self = this;
    gameId = options.gameId;
    wx.request({
      url: config.baseUrl + "getgamebyid",
      data: {
        gameId: gameId,
      },
      success: function (result) {
        self.setData({
          game: result.data.result,
        })
        self.getRoleList();
        //轮询
        timer = setInterval(function () {
          self.getRoleList();
        }, 3000);

        clock = setInterval(function () {
          self.data.counter --;
          self.setData({
            counter: self.data.counter,
          })
          if (0 == self.data.counter){
            clearInterval(timer);
            clearInterval(clock);
            wx.showModal({
              title: "提示",
              content: "还有小伙伴未在规定时间内加入游戏，本局游戏解散!",
              confirmText: "确定",
              showCancel: false,
              success:function(){
                wx.navigateBack({})
              }
            })
          }
        }, 1000);
      },
    });
  },

  onUnload: function () {
    clearInterval(timer);
    clearInterval(clock);
  },

  getRoleList: function (){
    wx.request({
      url: config.baseUrl + "getrolelistingame",
      data: {
        gameId: gameId,
      },

      success: function (result) {
        var isAllHere = true;
        for (var i = 0; i < result.data.result.length; i++){
          if (null == result.data.result[i].playerId){
            isAllHere = false;
          }
        }

        if(isAllHere){
          clearInterval(timer);
          clearInterval(clock);
          self.setData({
            loading:false
          })
        }
        self.setData({
          roleGrids: result.data.result
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

  manageGameTap: function () {
    wx.redirectTo({
      url: '/pages/manageGame/manageGame?gameId=' + gameId + '&inviteCode=' + self.data.game.inviteCode,
    })
  },

  cancleGameTap: function (){
    wx.showModal({
      title: "提示",
      content: "您确定要取消本局游戏吗？",
      confirmText: "是",
      cancelText: "否",
      success:function(){
        wx.request({
          url: config.baseUrl + "updategamestate",
          data: {
            state: 3, //房主（法官）主动取消游戏，解散
            gameId: gameId,
          },
          success: function (result) {
            if (result.data.returnCode == '200') {
              wx.showModal({
                title: "提示",
                content: "本局游戏已解散！",
                confirmText: "确定",
                showCancel: false,
                success: function () {
                  wx.navigateBack({})
                }
              })
            } else {
              wx.showModal({
                title: "错误",
                content: errMsg,
                confirmText: "确定",
                showCancel: false,
              })
            }
          },

          fail: function ({errMsg}) {
          }
        })
      }
    })
  }
})