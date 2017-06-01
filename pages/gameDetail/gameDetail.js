var config = require('../../config');
var dateUtil = require('../../utils/dateUtil');
var self;
var gameId;
Page({
  data: {
    myPlayerId:'',
    game:{},
    startEndTime:'',
    justiceRoleList: [],
    evilRoleList: []
  },

  onLoad: function (options) {
    self = this;
    gameId = options.gameId;
    self.getGameById();
    self.setData({
      myPlayerId : getApp().user.player.playerId
    })
  },

  getGameById: function () {
    wx.request({
      url: config.baseUrl + "getgamebyid",
      data: {
        gameId: gameId,
      },
      success: function (result) {
        if(result.data.returnCode == '200'){
          var date = new Date(result.data.result.startTime).format('yy-MM-dd');
          var startTime = new Date(result.data.result.startTime).format('HH:mm');
          var endTime = new Date(result.data.result.endTime).format('HH:mm');
          self.setData({
            game:result.data.result,
            startEndTime: date + " " + startTime + "至" + endTime
          })
          self.getRoleList();
        }
      },

      fail: function ({errMsg}) {
      }
    })
  },

  getRoleList: function () {
    wx.request({
      url: config.baseUrl + "getrolelistingame",
      data: {
        gameId: gameId,
      },

      success: function (result) {
        var justiceRoleList = [];
        var evilRoleList = [];

        for (var i = 0; i < result.data.result.length; i++) {
          switch (result.data.result[i].roleType) {
            case 0:
              result.data.result[i].roleType = "杀手";
              result.data.result[i].roleFlag = "killer";
              self.data.evilRoleList.push(result.data.result[i]);
              break;
            case 1:
              result.data.result[i].roleType = "警察";
              result.data.result[i].roleFlag = "police";
              self.data.justiceRoleList.push(result.data.result[i]);
              break;
            case 2:
              result.data.result[i].roleType = "平民";
              result.data.result[i].roleFlag = "citizen";
              self.data.justiceRoleList.push(result.data.result[i]);
              break;
          }
        }
        self.setData({
          evilRoleList: self.data.evilRoleList,
          justiceRoleList: self.data.justiceRoleList
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