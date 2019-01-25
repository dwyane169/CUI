Page({
  // https://github.com/dwyane169/CUI.git
  data: {
    
  },
  copyGit(){
    wx.setClipboardData({
      data: 'https://github.com/dwyane169/CUI.git',
      success:res=>{
        wx.showToast({
          title: '复制成功',
          icon: 'none'
        })
      }
    })
  },
  readMe(){
    wx.navigateTo({
      url: '/pages/readme/index',
    })
  }
})