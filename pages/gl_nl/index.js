Page({

  data: {
    status_bar: getApp().globalData.status_bar,
    custom_bar: getApp().globalData.custom_bar,
    show: false,
    dateInfo: {}
  },
  showDatePickerPlus() {
    this.setData({ show: true })
  },
  submit(res){
    console.log(res.detail)
  }
})