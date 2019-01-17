const circle = (start, end, year = false) => {
  const arr = [];
  for (let i = start; i <= end; i++) {
    if (year) arr.push(i)
    else arr.push(i < 10 ? `0${i}` : i)
  }
  return arr;
}

// 公历日期 1900年 - 今天
const gl_year = circle(1900, 2049, true);

const gl_month = circle(1, 12)

const gl_two_eight = circle(1, 28)
const gl_two_nine = circle(1, 29)
const gl_three_zero = circle(1, 30)
const gl_three_one = circle(1, 31)

export { gl_year, gl_month, gl_two_eight, gl_two_nine, gl_three_zero, gl_three_one }