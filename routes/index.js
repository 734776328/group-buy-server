import shop from './display-page/shop.js'
import user from './display-page/user.js'
import express from 'express'
let router = express.Router()

export default (app) => {
  app.use('/api1', user)
  app.use('/api2', shop)
}