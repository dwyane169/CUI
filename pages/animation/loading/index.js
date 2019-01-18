
Page({

  onLoad: function (options) {
    //选择组件之前一定要给个ID 
    this.Loading = this.selectComponent('#loading');
    this.Loading2 = this.selectComponent('#loading2');
    // this.Loading.autoShow()
  },
  showLoading(e){
    const { id } = e.currentTarget.dataset;
    if(id == 1){
      this.Loading.autoShow()
    }else{
      this.Loading2.show()
    }
  }
})