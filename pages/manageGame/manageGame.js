var config = require('../../config');
var self;
var gameId;
var tmp_i;
Page({
  data: {
    scrollHeight: 900,
    roleList: []
  },

  onLoad: function (options) {
    self = this;
    gameId = options.gameId;
    wx.setNavigationBarTitle({
      title: "我是裁判（" + options.inviteCode +"）",
    })
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        self.setData({
          scrollHeight: res.windowHeight - 50,
        });
      }
    });
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