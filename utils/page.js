class PageClass{
  constructor(){
    this.pages = getCurrentPages();
  }
  getCurPage(){
    return this.pages[this.pages.length - 1]
  }
  getPrePage(){
    return this.pages[this.pages.length - 2]
  }
}

export { PageClass }