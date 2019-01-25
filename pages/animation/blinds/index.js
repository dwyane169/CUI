const list = [
  {
    title: 'first box',
    if_show: false,
    child: '哈哈哈哈1'
  },
  {
    title: 'sec box',
    if_show: false,
    child: '哈哈哈哈2'
  },
  {
    title: 'third box',
    if_show: false,
    child: '哈哈哈哈3'
  },
]

Page({

  data: {
    list,
    showFloat:false
  },
  
  showInside(e){
    const { index } = e.currentTarget.dataset;
    const { list } = this.data;
    let has_some_show = 0;
    for(let i in list ){
      if(i == index){
        list[i].if_show = !list[i].if_show;
      }else{
        // list[i].if_show = false  //打开注释则打开一个 其他的关闭
      }
      if (list[i].if_show ) ++has_some_show;
    }
    if (!has_some_show){
      this.setData({ list, showFloat:false })
    }else{
      this.setData({ list, showFloat: true })
    }
  }

})