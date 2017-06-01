var dateUtil = require('../../utils/dateUtil');
var config = require('../../config');
var self;
Page({
  data: {
    list: []
  },

  onLoad: function (options) {
    self = this;

    wx.request({
      url: config.baseUrl + "getmygamerecords",
      data: {
        playerId: getApp().user.player.playerId,
      },
      success: function (result) {
        var roleList = result.data.result;
        if (result.data.returnCode == '200') {
          var crtDate = '';
          var j = -1;
          for (var i = 0; i < roleList.length; i++) {
            var createTime = roleList[i].createTime;
            roleList[i].createTime = new Date(createTime).format('HH:mm');
            if (crtDate != new Date(createTime).format('yyyy年MM月dd日')) {
              crtDate = new Date(createTime).format('yyyy年MM月dd日');
              j++;
              var obj = {
                date: crtDate,
                records: []
              };
              self.data.list[j] = obj;
            }
            self.data.list[j].records.push(roleList[i]);
          }
          self.setData({
            list: self.data.list
          })
        } else {

        }
      },

      fail: function ({errMsg}) {
      }
    })
  },

  onUnload: function () {
  
  },
})