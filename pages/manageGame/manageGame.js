var config = require('../../config');
var self;
var gameId;
Page({
  data: {
    roleList: [
      { 
        "gameId": 163, 
        "playerAvatarUrl": 
        "http://wx.qlogo.cn/mmopen/vi_32/GvzrAKyDiboTQJWicAKm5ejicUcMB9txkW9aApDBgvG8avfeA82p6b2ghskI02IJuC2RM1NdzvCAXaCHuACK6oAOQ/0", 
        "playerId": "oNMwb0dFoGQ7TvHJd7jbyFdmjgk4", 
        "playerNickName": "被人追杀的eason", 
        "roleId": 839, 
        "roleType": 3, 
        "death": 0,
        "victory": 0 
      },
      {
        "gameId": 163,
        "playerAvatarUrl":
        "http://wx.qlogo.cn/mmopen/vi_32/hzgRzL39o1b1NVPlhfoFZqapqUNUvnlkKhcIshXkTkxDpJdHnh3LMz7g1eQbhUBnicx2mwndpduiazS39phM6ekg/0",
        "playerId": "oNMwb0dFoGQ7TvHJd7jbyFdmjgk4",
        "playerNickName": "习大大喵喵",
        "roleId": 839,
        "roleType": 0,
        "death": 1,
        "victory": 0
      },
      {
        "gameId": 163,
        "playerAvatarUrl":
        "http://wx.qlogo.cn/mmopen/vi_32/GvzrAKyDiboTQJWicAKm5ejicUcMB9txkW9aApDBgvG8avfeA82p6b2ghskI02IJuC2RM1NdzvCAXaCHuACK6oAOQ/0",
        "playerId": "oNMwb0dFoGQ7TvHJd7jbyFdmjgk4",
        "playerNickName": "杨窝窝",
        "roleId": 839,
        "roleType": 0,
        "death": 0,
        "victory": 0
      },
      {
        "gameId": 163,
        "playerAvatarUrl":
        "http://wx.qlogo.cn/mmopen/vi_32/5YSF1tBkafDQGIIic9uUqsc3PwYUcoCQWNbD1rD3OlZmEYVSOBFG0UkYNibEUHyxh1icvmQOysqm1zVJdDFzeeUiag/0",
        "playerId": "oNMwb0dFoGQ7TvHJd7jbyFdmjgk4",
        "playerNickName": "my c 柱子",
        "roleId": 839,
        "roleType": 1,
        "death": 0,
        "victory": 0
      },
      {
        "gameId": 163,
        "playerAvatarUrl":
        "http://wx.qlogo.cn/mmopen/vi_32/GvzrAKyDiboTQJWicAKm5ejicUcMB9txkW9aApDBgvG8avfeA82p6b2ghskI02IJuC2RM1NdzvCAXaCHuACK6oAOQ/0",
        "playerId": "oNMwb0dFoGQ7TvHJd7jbyFdmjgk4",
        "playerNickName": "大水怪123",
        "roleId": 839,
        "roleType": 1,
        "death": 1,
        "victory": 0
      },
      {
        "gameId": 163,
        "playerAvatarUrl":
        "http://wx.qlogo.cn/mmopen/vi_32/GvzrAKyDiboTQJWicAKm5ejicUcMB9txkW9aApDBgvG8avfeA82p6b2ghskI02IJuC2RM1NdzvCAXaCHuACK6oAOQ/0",
        "playerId": "oNMwb0dFoGQ7TvHJd7jbyFdmjgk4",
        "playerNickName": "my c 锅子",
        "roleId": 839,
        "roleType": 2,
        "death": 0,
        "victory": 0
      },
      {
        "gameId": 163,
        "playerAvatarUrl":
        "http://wx.qlogo.cn/mmopen/vi_32/hzgRzL39o1b1NVPlhfoFZqapqUNUvnlkKhcIshXkTkxDpJdHnh3LMz7g1eQbhUBnicx2mwndpduiazS39phM6ekg/0",
        "playerId": "oNMwb0dFoGQ7TvHJd7jbyFdmjgk4",
        "playerNickName": "川岛芳子",
        "roleId": 839,
        "roleType": 2,
        "death": 0,
        "victory": 0
      },
      {
        "gameId": 163,
        "playerAvatarUrl":
        "http://wx.qlogo.cn/mmopen/vi_32/GvzrAKyDiboTQJWicAKm5ejicUcMB9txkW9aApDBgvG8avfeA82p6b2ghskI02IJuC2RM1NdzvCAXaCHuACK6oAOQ/0",
        "playerId": "oNMwb0dFoGQ7TvHJd7jbyFdmjgk4",
        "playerNickName": "大黄鱼君",
        "roleId": 839,
        "roleType": 2,
        "death": 2,
        "victory": 0
      },
      {
        "gameId": 163,
        "playerAvatarUrl":
        "http://wx.qlogo.cn/mmopen/vi_32/5YSF1tBkafDQGIIic9uUqsc3PwYUcoCQWNbD1rD3OlZmEYVSOBFG0UkYNibEUHyxh1icvmQOysqm1zVJdDFzeeUiag/0",
        "playerId": "oNMwb0dFoGQ7TvHJd7jbyFdmjgk4",
        "playerNickName": "皇上的小马褂",
        "roleId": 839,
        "roleType": 2,
        "death": 2,
        "victory": 0
      },
      {
        "gameId": 163,
        "playerAvatarUrl":
        "http://wx.qlogo.cn/mmopen/vi_32/GvzrAKyDiboTQJWicAKm5ejicUcMB9txkW9aApDBgvG8avfeA82p6b2ghskI02IJuC2RM1NdzvCAXaCHuACK6oAOQ/0",
        "playerId": "oNMwb0dFoGQ7TvHJd7jbyFdmjgk4",
        "playerNickName": "芳芳芳",
        "roleId": 839,
        "roleType": 2,
        "death": 0,
        "victory": 0
      },
    ]
  },

  onLoad: function (options) {
    self = this;
    gameId = options.gameId;
    wx.setNavigationBarTitle({
      title: "我是法官（2304）",
    })
    for (var i = 0; i < self.data.roleList.length; i++){
      if (self.data.roleList[i].roleType == 3){
        self.data.roleList.splice(i, 1);
      }

      switch (self.data.roleList[i].roleType){
        case 0:
          self.data.roleList[i].roleType = "杀手";
          self.data.roleList[i].roleFlag = "killer";
          break;
        case 1:
          self.data.roleList[i].roleType = "警察";
          self.data.roleList[i].roleFlag = "police";
          break;
        case 2:
          self.data.roleList[i].roleType = "平民";
          self.data.roleList[i].roleFlag = "citizen";
          break;
      }
    }
    self.setData({
      roleList: self.data.roleList,
    })
    // self.getRoleList();
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