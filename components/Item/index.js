// components/Item/index.js
Component({

  options: {
    multipleSlots: true
  },

  properties: {
    title: String,
    url: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    chooseItem(){
      const url = this.url;
      if(url) wx.navigateTo({ url })
      else return
    }
  }
})
