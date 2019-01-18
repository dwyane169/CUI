
Component({

  properties: {
    title: {           
      type: String,   
      value: 'Loading'   
    },
    duration: {
      type: Number,
      value: 2000  
    },
    types: {
      type: Number,
      value: 1   
    },
    position: {
      type: Boolean,  
      value: true
    }
  },
  data: {
    ishide: false
  },

  methods: {
    //展示弹框 自动关闭
    autoShow() {
      const {duration}= this.data;
      this.setData({ ishide: true })
      const timer = setTimeout(() => {
        clearTimeout(timer)
        this.setData({ ishide: false })
      }, duration)
    },
    //人工关闭
    selfShow() {
      this.setData({
        ishide: true
      })
    },
    selfHide() {
      this.setData({
        ishide: false
      })
    },

  }
})
