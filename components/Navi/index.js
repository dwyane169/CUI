import { PageClass } from '../../utils/page.js'


Component({

  properties: {

  },
  data: {
    status_bar: getApp().globalData.status_bar
  },
  methods: {
    backOrInfo(){
      let pages = new PageClass();

      if (pages.pages.length == 1){
        wx.showToast({
          title: 'Created By 陈翀',
          icon: 'none'
        })
      }else{
        wx.navigateBack()
      }
    }
  }
})
