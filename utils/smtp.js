let smtp = {
  get host () {
    return 'smtp.qq.com'
  },
  get user () {
    return '734776328@qq.com'
  },
  get pass () {
    return 'nyrbistmuykzbfih'
  },
  get code () {
    return () => {
      return Math.random().toString(16).slice(2,6).toUpperCase()
    }
  },
  get expire () {
    return () => {
      return new Date().getTime() +60*1000
    }
  }
}
export default smtp