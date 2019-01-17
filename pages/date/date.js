/**
 * cur_year 当前年
 * cur_month 当前月
 * cur_day 今天
 * status 0 普通日子,未选中 1 今日 2选中
 * 计算指定年月的对象
 */
class DateData{
  constructor(cur_year, cur_month, cur_day, month_count ){
    this.cur_year = cur_year
    this.cur_month = cur_month
    this.cur_day = cur_day
    this.month_count = month_count
  }

  //给日子编号
  give_number(year, month, day){
    const all_arr = this.is_today(year, month, day);
    let start = 0;
    for(let i of all_arr){
      for(let j of i.days){
        j.number = start
        ++start
      }
    }
    return all_arr
  }
  
  //判断是不是今天
  is_today( year, month, day) {
    let list = this.show_how_many_month()
    for (let i of list) {
      if (i.year == year && i.month == month) {
        for(let j of i.days){
          if (j.day == day) j.today = true
          if (j.day < day ) j.status = -1   //小于今天的日期
        }
      }
    }
    return list
  }

  //求当前月开始 多少个月对象
  show_how_many_month(){
    const all_array = [];
    for (let i = 0; i < this.month_count; i++){
      all_array[i] = this.how_many_days()
      this._deal_with_month()
    }
    return all_array;
  }

  //计算当前年月有哪些天
  how_many_days(){
    let single_obj = { year: this.cur_year, month: this.cur_month } //单月对象
    let empty_days = this.blank_days(this.cur_year, this.cur_month) //空的天的数组
    
    //配置该月 空的天 数组
    empty_days = empty_days.length ? empty_days : []
    
    //这个月有多少天 用于 天 对象的循环
    let this_month_days = this.get_month_days(this.cur_year, this.cur_month)

    //计算天对象
    single_obj.days = empty_days.concat(this.days_to_obj(this.cur_year, this.cur_month, this.cur_day, this_month_days))
    
    //返回单个月对象
    return single_obj
  }

  //将天数 转换成 对象数组
  days_to_obj(year, month, day, days = 0){
    const days_array = []
    for( let i = 1; i<= days; i++){
      const day = { day: i, status: 0 };
      days_array.push(day)
    }
    return days_array
  }

  //计算当前年月空的几天
  blank_days(year, month){
    const first_day = this.get_first_day(year, month);
    let empties = [];
    if (first_day > 0) for(let i=0; i<first_day; i++){ empties.push({day:null}); }
    return empties;
  }
  //获取当前月第一周第一天是周几
  get_first_day(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  }
  //计算当前月有多少天
  get_month_days(year, month){
    return new Date(year, month, 0).getDate();
  }
  //月份的处理
  _deal_with_month() {
    if (this.cur_month + 1 > 12) {
      this.cur_year = cur_year + 1;
      this.cur_month = 1
    } else {
      this.cur_month = this.cur_month + 1;
    }
  }
}

//业务类 处理整个数组对象
class DateMethods { 
  //系统获取当前年月
  get_cur_date() {
    const date_obj = new Date()
    const cur_year = date_obj.getFullYear();
    const cur_month = date_obj.getMonth() + 1;
    const cur_day = date_obj.getDate();

    return { cur_year, cur_month, cur_day }
  }
  
}
const dateMethods = new DateMethods(); 

export { DateData, dateMethods }