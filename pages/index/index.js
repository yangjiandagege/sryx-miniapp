var config = require('../../config');
var self;

Page({
  data: {
    userInfo:{}
  },

  onLoad: function (){
    self = this;
    wx.login({
      success: function (data) {
        console.log('step1 success 调用微信登录接口');

        wx.request({
          url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + config.appId + "&secret=" + config.appSecret + "&js_code=" + data.code + "&grant_type=authorization_code",
          data: {
            code: data.code
          },
          success: function (res) {
            getApp().user.openid = res.data.openid;
            console.log('step2 success 获取微信openid ：', getApp().user.openid);

            wx.getUserInfo({
              success: function (res) {
                console.log('step3.1 success 获取微信用户信息 ', res.userInfo);
                getApp().user.userInfo = res.userInfo;
                self.data.userInfo = getApp().user.userInfo;
                self.setData({
                  userInfo: self.data.userInfo
                })

                self.getPlayerById();
              },

              fail: function (res) {
                console.log('step3.1 fail 获取微信用户信息', res);
              }
            })


            wx.request({
              url: `https://api.weixin.qq.com/cgi-bin/token`,
              data: {
                grant_type: 'client_credential',
                appid: config.appId,
                secret: config.appSecret,
              },

              success: function (result) {
                console.log('step3.2 success 获取用户access_token：' + result.data.access_token + '，初始化完成');
                getApp().user.accessToken = result.data.access_token;
              },

              fail: function ({errMsg}) {
                console.log('step3.2 fail 获取用户access_token', errMsg);
              }
            })
          },

          fail: function (res) {
            console.log('step2 fail 获取微信openid，将无法正常使用开放接口等服务', res);
          }
        })

      },

      fail: function (err) {
        console.log('step1 fail 调用微信登录接口，将无法正常使用开放接口等服务', err);
      }
    })
  },

  onShow: function () {
    if(null != getApp().user.player){
      self.getPlayerById();
    }
  },

  getPlayerById: function(){
    wx.request({
      url: config.baseUrl + "getplayerbyid",
      data: {
        playerId: getApp().user.openid,
      },
      success: function (result) {
        var player = result.data.result;
        getApp().user.player = player;
        if(result.data.returnCode == "200"){
          if (player.lastGameId != null){
            self.getGameById(player.lastGameId);
          }
        }else{
          self.updatePlayer();
        }
      },

      fail: function ({errMsg}) {
      }
    })
  },

  updatePlayer: function(){
    wx.request({
      url: config.baseUrl + "updateplayer",
      data: {
        playerId: getApp().user.openid,
        avatarUrl: getApp().user.userInfo.avatarUrl,
        city: getApp().user.userInfo.city,
        country: getApp().user.userInfo.country,
        gender: getApp().user.userInfo.gender,
        language: getApp().user.userInfo.language,
        nickName: getApp().user.userInfo.nickName,
        province: getApp().user.userInfo.province,
      },
      success: function (result) {
        console.log('step4 success 更新云端用户信息 ', result.data);
        console.log(result.data);
      },

      fail: function ({errMsg}) {
        console.log('step4 fail 更新云端用户信息 ', errMsg);
      }
    })
  },

  getGameById: function (lastGameId) {
    wx.request({
      url: config.baseUrl + "getgamebyid",
      data: {
        gameId: lastGameId,
      },
      success: function (result) {
        var game = result.data.result;
        if (game.gameOwnerId == getApp().user.player.playerId){ //我是裁判
          if (game.state == 0) {
            wx.showModal({
              title: "提示",
              content: "您有一局游戏正在准备中，请点击确定前去查看！",
              confirmText: "确定",
              showCancel: false,
              success: function () {
                wx.navigateTo({
                  url: '/pages/waitGame/waitGame?gameId=' + game.gameId,
                })
              }
            })
          } else if (game.state == 1){
            wx.showModal({
              title: "提示",
              content: "您有一局游戏正在进行中，请点击确定前去查看！",
              confirmText: "确定",
              showCancel: false,
              success: function () {
                wx.navigateTo({
                  url: '/pages/manageGame/manageGame?gameId=' + game.gameId,
                })
              }
            })
          }
        }else{ //我是玩家
          if (game.state == 0 || game.state == 1) {
            wx.showModal({
              title: "提示",
              content: "您有一局游戏正在进行中，请点击确定前去查看！",
              confirmText: "确定",
              showCancel: false,
              success: function () {
                wx.redirectTo({
                  url: '/pages/role/role?gameId=' + game.gameId+'&inviteCode='+game.inviteCode,
                })
              }
            })
          }
        }
      },

      fail: function ({errMsg}) {
      }
    })
  },
})
