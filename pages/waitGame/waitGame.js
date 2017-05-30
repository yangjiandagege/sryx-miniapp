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

  onUnload: function () {
    clearInterval(timer);
    clearInterval(timer);
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
          clearInterval(timer);
          self.setData({
            loading:false
          })
          wx.showModal({
            title: "提示",
            content: "全员到齐,准备开始游戏！",
            confirmText: "确定",
            showCancel: false,
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
      url: '/pages/manageGame/manageGame?gameId=' + gameId,
    })
  },

  cancleGame: function (){

  }
})