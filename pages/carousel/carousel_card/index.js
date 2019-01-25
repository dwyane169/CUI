// pages/carousel/carousel_card/inde.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist: [
      { id: 0, scale: 1, mleft: -1000, opacity: 0, url: 'https://image.weilanwl.com/img/4x3-1.jpg'},
      { id: 1, scale: 1, mleft: 50, opacity: 1, url: 'https://image.weilanwl.com/img/4x3-2.jpg' },
      { id: 2, scale: .9, mleft: 100, opacity: 1, url: 'https://image.weilanwl.com/img/4x3-3.jpg' },
      { id: 3, scale: .8, mleft: 150, opacity: 1, url: 'https://image.weilanwl.com/img/4x3-4.jpg' },
      { id: 4, scale: .7, mleft: 200, opacity: 1, url: 'https://image.weilanwl.com/img/4x3-3.jpg' },
      { id: 5, scale: .7, mleft: 200, opacity: 0, url: 'https://image.weilanwl.com/img/4x3-2.jpg' },
    ]
  },

  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },

  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },

  // towerSwiper计算滚动
  towerEnd(e) {
    console.log(this.data.direction)
    const { direction } = this.data;

    if (direction == 'left') this.dealWithLeft();
    else this.dealWithRight();
  },
  //处理左滑
  dealWithLeft(){
    const { imglist } = this.data;
    const head_scale = imglist[imglist.length - 1].scale;
    const head_mleft = imglist[imglist.length - 1].mleft;
    const head_op = imglist[imglist.length - 1].opacity;
    const head_id = imglist[imglist.length - 1].id;

    for (let i = imglist.length - 1; i > 0; i--) {
      imglist[i].scale = imglist[i - 1].scale
      imglist[i].mleft = imglist[i - 1].mleft
      imglist[i].opacity = imglist[i - 1].opacity
      imglist[i].id = imglist[i - 1].id
    }

    imglist[0].scale = head_scale;
    imglist[0].mleft = head_mleft;
    imglist[0].opacity = head_op;
    imglist[0].id = head_id;
    this.setData({ imglist })
  },
  //处理右滑
  dealWithRight(){
    const { imglist } = this.data;
    const head_scale = imglist[0].scale;
    const head_mleft = imglist[0].mleft;
    const head_op = imglist[0].opacity;
    const head_id = imglist[0].id;

    
    for( let i = 1; i< imglist.length; i ++ ){
      imglist[i -1].scale = imglist[i].scale
      imglist[i - 1].mleft = imglist[i].mleft
      imglist[i - 1].opacity = imglist[i].opacity
      imglist[i - 1].id = imglist[i].id
    }

    imglist[imglist.length - 1].scale = head_scale;
    imglist[imglist.length - 1].mleft = head_mleft;
    imglist[imglist.length - 1].opacity = head_op;
    imglist[imglist.length - 1].id = head_id;
    this.setData({ imglist })
  }
})