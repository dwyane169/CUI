//引入城市JSON 数据 
import { city} from './cities.js'

Page({
  data: {
    hidden: true, //控制选择时的提示字母显示
    city,         //城市JSON
    single_height : 0, //单个字母高度
  },
  // 获取右侧索引盒子 距离window 顶部的高度
  getBoxTop() {
    wx.createSelectorQuery()
    .select('.indexBar-box')
    .boundingClientRect(res=>{
      
      const single_height = res.height / this.data.list.length;
      this.setData({ boxTop: res.top, single_height })
    }).exec();
  },

  onLoad(options) {
    this.initChar();
    this.getBoxTop();
  },
  // 初始化字母表 城市没有IOUV字母开头的 所以过滤掉
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
  //滑动选择时进行字母判断与选择 超出盒子范围默认Z 或 A
  tMove(e) {
    let y = e.touches[0].clientY;
    console.log(y)
    const { boxTop, list, char_height, single_height } = this.data;
    //判断选择区域,只有在选择区才会生效
    if (y > boxTop) {
      let num = parseInt((y - boxTop) / single_height);
      const listCur = list[num] ? list[num] : list[list.length - 1];
      this.setData({ listCur })
    };
  },
  // 触摸开始事件
  tStart() {
    this.setData({
      hidden: false
    })
  },
  // 触摸结束事件
  tEnd() {
    this.setData({
      hidden: true
    })
  },
  // 单个字母点击时触摸开始
  getCur(e) {
    this.setData({
      hidden: false,
      listCur: this.data.list[e.target.id],
    })
  },
  // 单个字母点击时触摸结束
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