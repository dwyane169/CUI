

Page({
  data: {
    imgs: [
    { id: 0, url:'https://image.weilanwl.com/img/4x3-1.jpg'},
    { id: 1, url: 'https://image.weilanwl.com/img/4x3-2.jpg'},
    { id: 2, url: 'https://image.weilanwl.com/img/4x3-3.jpg'},
    { id: 3, url: 'https://image.weilanwl.com/img/4x3-4.jpg'},
    { id: 4, url: 'https://image.weilanwl.com/img/4x3-2.jpg'},
    { id: 5, url: 'https://image.weilanwl.com/img/4x3-3.jpg'},
    { id: 6, url: 'https://image.weilanwl.com/img/4x3-4.jpg'}
    ]
  },
  onLoad(){
    this.initImg()
  },
  initImg(){
    const { imgs } = this.data;
    for(let i in imgs){
      imgs[i].m_left = i - imgs.length / 2 + 1
    }
    this.setData({ imgs })
  },
  // towerSwiper触摸开始
  touchStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },

  // towerSwiper计算方向
  touchMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  touchEnd(e) {
    const { direction, imgs } = this.data;
    console.log(direction)
    if (direction == 'right') {
      let mLeft = imgs[0].m_left;
      let zIndex = imgs[0].id;
      for (let i = 1; i < imgs.length; i++) {
        imgs[i - 1].m_left = imgs[i].m_left
        imgs[i - 1].id = imgs[i].id
      }
      imgs[imgs.length - 1].m_left = mLeft;
      imgs[imgs.length - 1].id = zIndex;
      this.setData({ imgs })
    } else {
      let mLeft = imgs[imgs.length - 1].m_left;
      let zIndex = imgs[imgs.length - 1].id;
      for (let i = imgs.length - 1; i > 0; i--) {
        imgs[i].m_left = imgs[i - 1].m_left
        imgs[i].id = imgs[i - 1].id
      }
      imgs[0].m_left = mLeft;
      imgs[0].id = zIndex;
      this.setData({ imgs })
    }
  },

})