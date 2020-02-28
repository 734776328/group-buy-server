import shop from './display-page/shop.js'
import user from './display-page/user.js'
import manage from './manage-page/shop'

export default (app, upload) => {
  app.use('/api1', user)
  app.use('/api2', shop)
  app.use('/api3', manage)
}