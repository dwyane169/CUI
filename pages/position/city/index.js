import { city} from './cities.js'

Page({
  data: {
    hidden: true,
    city,
  },
  getBoxTop() {
    wx.createSelectorQuery()
    .select('.indexBar-box')
    .boundingClientRect(res=>{
      this.setData({ boxTop: res.top })
    }).exec();
  },
  onLoad(options) {
    this.initChar();
    this.getBoxTop();
  },
  initChar(){
    const not_show = ['I', 'O', 'U', 'V'];
    let list = [];
    for (let i = 0; i < 26; i++) {
      const charCode = String.fromCharCode(65 + i);
      list[i] = String.fromCharCode(65 + i)
    }
    list = list.filter(item=>{
      return not_show.indexOf(item) == -1
    })
    this.setData({ list, listCur: list[0] })
  },
  //滑动选择Item
  tMove(e) {
    let y = e.touches[0].clientY;
    const { boxTop, list } = this.data;
    //判断选择区域,只有在选择区才会生效
    if (y > boxTop) {
      let num = parseInt((y - boxTop) / 20);
      const listCur = list[num] ? list[num] : list[list.length - 1];
      this.setData({ listCur })
    };
  },
  tStart() {
    this.setData({
      hidden: false
    })
  },
  tEnd() {
    this.setData({
      hidden: true
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
  //搜索回车键
  searchConfirm(e){
    const { value } = e.detail;
    let listCur;
    for(let i of city){
      for(let j of i.item){
        if( j.name.includes(value)){
          listCur = j.key
        }
      }
    }
    this.setData({ listCur })
  }
})