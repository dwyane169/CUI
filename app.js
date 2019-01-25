App({
  onLaunch: function () {
    wx.getSystemInfo({
      success:res=>{
        this.globalData.custom_bar = res.platform == 'android' ? res.statusBarHeight + 50 : res.statusBarHeight + 45;
        this.globalData.status_bar = res.statusBarHeight;
        this.globalData.windowHeight = res.windowHeight;
      },
    })
 
  },
  globalData: {
    custom_bar:null,
    status_bar:null
  }
})