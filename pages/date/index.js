import { weeks } from './week_data.js'
import { DateData, dateMethods} from './date.js'
let month_count = 8; //显示多少个月的信息

//获取当前时间的年月日信息
const { cur_year, cur_month, cur_day } = dateMethods.get_cur_date();

//实例化 日历 以当前年月开始
const date_data = new DateData(cur_year, cur_month, cur_day, month_count)

//获取日历数据 并表明今日,以及给日子编号
const all_array = date_data.give_number(cur_year, cur_month, cur_day)


Page({
  data: {
    status_bar: getApp().globalData.status_bar,
    custom_bar: getApp().globalData.custom_bar,
    weeks,
    all_array,
    choose_data:[]
  },

  chooseTime(e){
    const { item_day } = e.currentTarget.dataset;
    const { all_array, choose_data } = this.data;
    const number = item_day.number 
    console.log('选择 /',number)

    //如果是灰色不可选取部分 返回
    if( item_day.status == -1 ) return
    //编号加入选择的数组里面
    choose_data.push(number)


    //如果选择的数组长度为2 切除第一个元素
    if( choose_data.length > 2){
      choose_data.shift();
      this.setData({ choose_data })
      this.checkNumber()
    } else if( choose_data.length == 1){
    //如果长度只有一个 则单个选择
      this.singleChoose(number)
    } else {
      //长度为二
      this.checkNumber()
    }
  },

  //编号大小判断
  checkNumber(){
    const { choose_data } = this.data;
    let first = choose_data[0];
    let sec = choose_data[1];
    let start, end;
    if(first > sec){
      start = sec; end = first;
    }else{
      start = first; end = sec;
    }
    console.log( '开始 /',start, '结束 /', end )
    this.setData({ start, end })
    this.changeStatus(start, end)
  },
  //根据编号大小改变状态
  changeStatus( start, end ){
    const { all_array } = this.data;

    for( let i of all_array ){
      for( let j of i.days ){
        if (j.number >= start && j.number <= end){
          j.status = 2;
        }else if( j.number < start ){
          j.status = j.status == -1? -1 : 1;
        }else {
          j.status = 1;
        }
      }
    }
    this.setData({ all_array })
  },
  //特例 单个选择
  singleChoose(number) {
    const { all_array } = this.data;
    for (let i of all_array) {
      for (let j of i.days) {
        if (j.number == number) j.status = 2
      }
    }
    this.setData({ all_array })
  },

  //确定选择
  confirm(){
    const { start, end } = this.data;
    const start_date = this.findDate( start );
    const end_date = this.findDate( end );
    console.log( '开始日期 /', start_date );
    console.log( '结束日期 /', end_date );
    wx.showModal({
      content: `
      开始:${start_date.year}-${start_date.month}-${start_date.day}
      结束:${end_date.year}-${end_date.month}-${end_date.day}
      `
    })
  },

  //寻找编号所对应的日期
  findDate(number){
    const { all_array } = this.data;
    let find = {};
    for (let i of all_array) {
      find.year = i.year; find.month = i.month;
      for (let j of i.days) {
        if(j.number == number ) find.day = j.day;
      }
    }
    return find.day? find : {}
  }

})