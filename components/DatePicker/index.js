import { timer } from './picker.js'
console.log(timer)

Component({
  behaviors: [],
  properties: {
    // 控制是否显示日期选择组件的flag
    showDatePickerPlus: {
      type: Boolean, 
      value: false, 
      observer: function (newVal, oldVal) {
        if (newVal != oldVal) {
          if (newVal)
            this.showDatePickerPlus()
          else
            this.closeDatePickerPlus()
        }
      }
    }
  },
  // 私有数据，可用于模版渲染
  data: {
    datePickerAttr: {
      dateType: 1,
    },
    nl_init: [90, 0, 0],
    gl_init: [90, 0, 0],

    animationData: {},// 动画
    showDatePickerPlus: false,
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached () {
    const { gl_init } = this.data;
    const gl_obj = timer.glDateHandler(gl_init);
    const nl_obj = timer.nlDateHandler(gl_init);

    this.setData({
      //公历数组初始化
      glYears: gl_obj.yearCol,
      glMonths: gl_obj.monthCol,
      glDays: gl_obj.dayCol,

      //农历数组初始化
      nlYears: nl_obj.yearCol,
      nlMonths: nl_obj.monthCol,
      nlDays: nl_obj.dayCol
    })
  },
  methods: {
    /**
     * 切换阴阳历类型
     */
    toggleDateType: function () {
      let dateType = this.data.datePickerAttr.dateType == 1 ? 2 : 1;
      this.setData({
        ['datePickerAttr.dateType']: dateType
      })
    },

    /**
     * 农历数据改变监听
     */
    bindDateNl (e) {
      let value = e.detail.value;
      let data = timer.nlDateHandler(value);
      this.setData({
        nl_init: value,
        nlYears: data.yearCol,
        nlMonths: data.monthCol,
        nlDays: data.dayCol
      })
    },

    /**
     * 公历数据改变监听
     */
    bindDateGl (e) {
      let value = e.detail.value;
      let data = timer.glDateHandler(value);
      this.setData({
        gl_init: value,
        glYears: data.yearCol,
        glMonths: data.monthCol,
        glDays: data.dayCol,
      })
    },
    //确定
    submitSelectDate() {
      let date;
      const { date_type } = this.data.datePickerAttr;
      const { gl_init, glYears, glMonths, glDays, nl_init, nlYears, nlMonths, nlDays } = this.data;

      if (date_type == 1) {
        date = glYears[gl_init[0]] + '-' + glMonths[gl_init[1]] + '-' + glDays[gl_init[2]] 
      } else {
        date = nlYears[nl_init[0]] + nlMonths[nl_init[1]] + nlDays[nl_init[2]]
      }

      this.closeDatePickerPlus();
      const myEventDetail = {
        dateStr: date,
        dateType: this.data.datePickerAttr.dateType == 1 ? '公历' : '农历'
      } 
      console.log(myEventDetail)
      this.triggerEvent('submit', myEventDetail)
    },
    // 显示日期选择控件
    showDatePickerPlus () {
      const animation = wx.createAnimation({
        duration: 160,
        timingFunction: 'linear',
        delay: 0
      })
      this.animation = animation

      animation.translateY(280).step({ duration: 0 })

      this.setData({
        animationData: animation.export(),
        showDatePickerPlus: true
      })
      const timer = setTimeout( ()=>{
        animation.translateY(0).step()
        clearTimeout(timer)
        this.setData({
          animationData: animation.export(),
        })
      }, 160)
    },
    // 隐藏日期选择控件
    closeDatePickerPlus () {
      this.animation.translateY(280).step()
      this.setData({
        animationData: this.animation.export(),
      })
      const timer = setTimeout(()=>{
        clearTimeout(timer)
        this.setData({
          showDatePickerPlus: false,
        })
      }, 120)
    },
  }

})