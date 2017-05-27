Page({
  data: {
    user:{},
  },

  onLoad: function () {

  },

  onShow:function(){
    this.setData({
      user:getApp().user,
    });
  },
})
