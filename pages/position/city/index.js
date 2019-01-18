import { city} from './cities.js'
console.table(city)
Page({
  data: {
    hidden: true,
    city,
  },
  onReady() {
    let that = this;
    wx.createSelectorQuery().select('.indexBar-box').boundingClientRect(res=>{
      that.setData({
        boxTop: res.top
      })
    }).exec();
  },

  onLoad: function (options) {
    this.initChar();
  },
  initChar(){
    const not_show = ['I', 'O', 'U', 'V'];
    let list = [];
    for (let i = 0; i < 26; i++) {
      const charCode = String.fromCharCode(65 + i);
      list[i] = String.fromCharCode(65 + i)
    }
    for (let i in not_show) {
      if (list.includes(not_show[i])) {
        const index = list.indexOf(not_show[i])
        list.splice(index, 1)
      }
    }
    list = ['历','热'].concat(list)
    this.setData({ list, listCur: list[0] })
  },

  //滑动选择Item
  tMove(e) {
    let y = e.touches[0].clientY,
      offsettop = this.data.boxTop;
    const { list } = this.data;
    //判断选择区域,只有在选择区才会生效
    if (y > offsettop) {
      let num = parseInt((y - offsettop) / 20);
      const listCur = list[num] ? list[num] : list[list.length - 1];
      this.setData({ listCur })
    };
  },

  //触发全部开始选择
  tStart() {
    this.setData({
      hidden: false
    })
  },

  //触发结束选择
  tEnd() {
    this.setData({
      hidden: true,
      listCurID: this.data.listCur
    })
  },

  getCur(e) {
    this.setData({
      hidden: false,
      listCur: this.data.list[e.target.id],
    })
  },

  setCur(e) {
    this.setData({
      hidden: true,
      listCur: this.data.listCur
    })
  },
})