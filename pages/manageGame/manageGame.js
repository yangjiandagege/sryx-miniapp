var config = require('../../config');
var self;
var gameId;
var tmp_i;
Page({
  data: {
    roleList: [
      // { 
      //   "gameId": 163, 
      //   "playerAvatarUrl": 
      //   "http://wx.qlogo.cn/mmopen/vi_32/GvzrAKyDiboTQJWicAKm5ejicUcMB9txkW9aApDBgvG8avfeA82p6b2ghskI02IJuC2RM1NdzvCAXaCHuACK6oAOQ/0", 
      //   "playerId": "oNMwb0dFoGQ7TvHJd7jbyFdmjgk4", 
      //   "playerNickName": "被人追杀的eason", 
      //   "roleId": 839, 
      //   "roleType": 3, 
      //   "death": 0,
      //   "victory": 0 
      // },
      // {
      //   "gameId": 163,
      //   "playerAvatarUrl":
      //   "http://wx.qlogo.cn/mmopen/vi_32/hzgRzL39o1b1NVPlhfoFZqapqUNUvnlkKhcIshXkTkxDpJdHnh3LMz7g1eQbhUBnicx2mwndpduiazS39phM6ekg/0",
      //   "playerId": "oNMwb0dFoGQ7TvHJd7jbyFdmjgk4",
      //   "playerNickName": "习大大喵喵",
      //   "roleId": 840,
      //   "roleType": 0,
      //   "death": 1,
      //   "victory": 0
      // },
      // {
      //   "gameId": 163,
      //   "playerAvatarUrl":
      //   "http://wx.qlogo.cn/mmopen/vi_32/GvzrAKyDiboTQJWicAKm5ejicUcMB9txkW9aApDBgvG8avfeA82p6b2ghskI02IJuC2RM1NdzvCAXaCHuACK6oAOQ/0",
      //   "playerId": "oNMwb0dFoGQ7TvHJd7jbyFdmjgk4",
      //   "playerNickName": "杨窝窝",
      //   "roleId": 841,
      //   "roleType": 0,
      //   "death": 0,
      //   "victory": 0
      // },
      // {
      //   "gameId": 163,
      //   "playerAvatarUrl":
      //   "http://wx.qlogo.cn/mmopen/vi_32/5YSF1tBkafDQGIIic9uUqsc3PwYUcoCQWNbD1rD3OlZmEYVSOBFG0UkYNibEUHyxh1icvmQOysqm1zVJdDFzeeUiag/0",
      //   "playerId": "oNMwb0dFoGQ7TvHJd7jbyFdmjgk4",
      //   "playerNickName": "my c 柱子",
      //   "roleId": 842,
      //   "roleType": 1,
      //   "death": 0,
      //   "victory": 0
      // },
      // {
      //   "gameId": 163,
      //   "playerAvatarUrl":
      //   "http://wx.qlogo.cn/mmopen/vi_32/GvzrAKyDiboTQJWicAKm5ejicUcMB9txkW9aApDBgvG8avfeA82p6b2ghskI02IJuC2RM1NdzvCAXaCHuACK6oAOQ/0",
      //   "playerId": "oNMwb0dFoGQ7TvHJd7jbyFdmjgk4",
      //   "playerNickName": "大水怪123",
      //   "roleId": 843,
      //   "roleType": 1,
      //   "death": 1,
      //   "victory": 0
      // },
      // {
      //   "gameId": 163,
      //   "playerAvatarUrl":
      //   "http://wx.qlogo.cn/mmopen/vi_32/GvzrAKyDiboTQJWicAKm5ejicUcMB9txkW9aApDBgvG8avfeA82p6b2ghskI02IJuC2RM1NdzvCAXaCHuACK6oAOQ/0",
      //   "playerId": "oNMwb0dFoGQ7TvHJd7jbyFdmjgk4",
      //   "playerNickName": "my c 锅子",
      //   "roleId": 844,
      //   "roleType": 2,
      //   "death": 0,
      //   "victory": 0
      // },
      // {
      //   "gameId": 163,
      //   "playerAvatarUrl":
      //   "http://wx.qlogo.cn/mmopen/vi_32/hzgRzL39o1b1NVPlhfoFZqapqUNUvnlkKhcIshXkTkxDpJdHnh3LMz7g1eQbhUBnicx2mwndpduiazS39phM6ekg/0",
      //   "playerId": "oNMwb0dFoGQ7TvHJd7jbyFdmjgk4",
      //   "playerNickName": "川岛芳子",
      //   "roleId": 845,
      //   "roleType": 2,
      //   "death": 0,
      //   "victory": 0
      // },
      // {
      //   "gameId": 163,
      //   "playerAvatarUrl":
      //   "http://wx.qlogo.cn/mmopen/vi_32/GvzrAKyDiboTQJWicAKm5ejicUcMB9txkW9aApDBgvG8avfeA82p6b2ghskI02IJuC2RM1NdzvCAXaCHuACK6oAOQ/0",
      //   "playerId": "oNMwb0dFoGQ7TvHJd7jbyFdmjgk4",
      //   "playerNickName": "大黄鱼君",
      //   "roleId": 846,
      //   "roleType": 2,
      //   "death": 2,
      //   "victory": 0
      // },
      // {
      //   "gameId": 163,
      //   "playerAvatarUrl":
      //   "http://wx.qlogo.cn/mmopen/vi_32/5YSF1tBkafDQGIIic9uUqsc3PwYUcoCQWNbD1rD3OlZmEYVSOBFG0UkYNibEUHyxh1icvmQOysqm1zVJdDFzeeUiag/0",
      //   "playerId": "oNMwb0dFoGQ7TvHJd7jbyFdmjgk4",
      //   "playerNickName": "皇上的小马褂",
      //   "roleId": 847,
      //   "roleType": 2,
      //   "death": 2,
      //   "victory": 0
      // },
      // {
      //   "gameId": 163,
      //   "playerAvatarUrl":
      //   "http://wx.qlogo.cn/mmopen/vi_32/GvzrAKyDiboTQJWicAKm5ejicUcMB9txkW9aApDBgvG8avfeA82p6b2ghskI02IJuC2RM1NdzvCAXaCHuACK6oAOQ/0",
      //   "playerId": "oNMwb0dFoGQ7TvHJd7jbyFdmjgk4",
      //   "playerNickName": "芳芳芳",
      //   "roleId": 848,
      //   "roleType": 2,
      //   "death": 0,
      //   "victory": 0
      // },
    ]
  },

  onLoad: function (options) {
    self = this;
    gameId = options.gameId;
    wx.setNavigationBarTitle({
      title: "我是裁判（" + options.inviteCode +"）",
    })
    
    self.getRoleList();
  },

  voteOut: function(e){
    var id = e.currentTarget.id, list = self.data.roleList;
    for (var i = 0; i < list.length;  i++) {
      if ("voteout-"+list[i].roleId == id) {
        tmp_i = i;
        wx.showModal({
          title: "提示",
          content: "您确定玩家（" + list[i].playerNickName + ")已经被投票出局了吗？",
          confirmText: "确定",
          cancelText: "取消",
          success: function (){
            wx.request({
              url: config.baseUrl + "updateroledeathstate",
              data: {
                death: 2,
                roleId: list[tmp_i].roleId,
                gameId: list[tmp_i].gameId,
              },

              success: function (result) {
                self.getRoleList();
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
          }
        })
      }
    }
  },

  killOut: function (e) {
    var id = e.currentTarget.id, list = self.data.roleList;
    for (var i = 0; i < list.length; i++) {
      if ("killout-" + list[i].roleId == id) {
        tmp_i = i;
        wx.showModal({
          title: "提示",
          content: "您确定玩家（" + list[i].playerNickName + ")已经被杀手杀死了吗？",
          confirmText: "确定",
          cancelText: "取消",
          success: function () {
            wx.request({
              url: config.baseUrl + "updateroledeathstate",
              data: {
                death: 1,
                roleId: list[tmp_i].roleId,
                gameId: list[tmp_i].gameId,
              },

              success: function (result) {
                if(result.data.returnCode=="200"){
                  self.getRoleList();//刷新
                } else if (result.data.returnCode == "100"){
                  self.getRoleList();//刷新

                  var content = '';
                  switch (result.data.result){
                    case 0://警察及平民方获得胜利！
                      content = '杀手全部出局，【警察、平民】获得胜利！';
                    break;
                    case 1://杀手方获得胜利！
                      content = '警察全部出局，【杀手】获得胜利！';
                    break;
                    case 2://平局！
                      content = '平民全部出局，平局！';
                    break;
                  }
                  wx.showModal({
                    title: "游戏结束",
                    content: content,
                    confirmText: "确定",
                    showCancel: false,
                    success: function(){
                      wx.navigateBack({})
                    }
                  })
                } else{

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
            });
          }
        })
      }
    }
  },

  getRoleList: function () {
    wx.request({
      url: config.baseUrl + "getrolelistingame",
      data: {
        gameId: gameId,
      },

      success: function (result) {
        self.data.roleList = result.data.result;
        for (var i = 0; i < result.data.result.length; i++) {
          if (self.data.roleList[i].roleType == 3) {
            self.data.roleList.splice(i, 1);
          }

          switch (self.data.roleList[i].roleType) {
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

cancleGameTap: function () {
    wx.showModal({
      title: "提示",
      content: "您确定要取消本局游戏吗？",
      confirmText: "是",
      cancelText: "否",
      success: function () {
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