Component({
  /**
   * 组件的属性列表
   */
  properties: {
    duration:{
      type :Number,
      value : 2000
    },
    show:{
      type: Boolean,
      value: false
    }
  },
  data: {

  },
  methods: {
    show(){
      const { duration } = this.data;
      this.setData({ show: true })
      let timer = setTimeout(()=>{
        clearTimeout(timer)
        this.setData({ show: false })
      },duration)
    }
  }
})
