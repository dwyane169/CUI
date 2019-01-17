import { nl_date, nl_month, nl_two_nine, nl_three_zero } from './nl.js';
import { gl_year, gl_month, gl_two_eight, gl_two_nine, gl_three_zero, gl_three_one } from './gl.js';


class Timer {

  //公历方法
  glDateHandler(arr) {

    const thirty_one = [0, 2, 4, 6, 7, 9, 11];
    const month = arr[1], year = arr[0];
    const is_thirty_one = thirty_one.indexOf(arr[1]) != -1

    let dayCol;

    if (month == 1) dayCol = this.isRunYear(gl_year[year])
    else if (is_thirty_one) dayCol = gl_three_one
    else dayCol = gl_three_zero

    return {
      yearCol: gl_year,
      monthCol: gl_month,
      dayCol
    }
  }

  isRunYear(year) {
    const case_one = year % 4 == 0 && year % 100 != 0;
    const case_two = year % 400 == 0
    if (case_one || case_two) return gl_two_nine
    else return gl_two_eight
  }

  //农历方法
  nlDateHandler(arr) {
    let yearCol = [], monthCol = [], dayCol = [];
    let month, day;

    //计算年数组
    for (let i in nl_date) {
      yearCol.push(nl_date[i].y);
      if (arr[0] == i) month = nl_date[i].m;
    }
    //计算月数组
    for (let i in month) {
      monthCol.push(month[i].n)
      if (arr[1] == i) day = month[i].d;
    }
    //计算天数组
    dayCol = day == 29 ? nl_two_nine : nl_three_zero

    return { yearCol, monthCol, dayCol }
  }


  formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return [year, month, day].map(this._formatNumber).join('-')
  }

  _formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
}

const timer = new Timer()
export { timer }