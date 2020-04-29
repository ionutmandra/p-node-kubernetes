'use strict'

// const assert = require('assert')
// const logger = require('winston')

const path = require('path')
const url = require('url')
const SwaggerExpress = require('swagger-express-mw')
const express = require('express')

const app = express()
const swaggerUiPath = path.dirname(require.resolve('swagger-ui-dist'))
const swaggerConfig = {
  appRoot: __dirname
}

SwaggerExpress.create(swaggerConfig, (err, swaggerExpress) => {
  if (err) {
    throw err
  }

  // Swagger routes
  swaggerExpress.register(app)

  // API Docs
  app.get('/', (req, res) => {
    const query = req.query
    query.url = '/api-docs'
    res.redirect(301, url.format({
      pathname: '/docs',
      query
    }))
  })

  app.get('/api-docs', (req, res) => {
    res.set('Content-Type', 'text/yaml')
    res.sendFile(path.join(__dirname, 'api/swagger/swagger.yaml'))
  })

  app.get('/docs', (req, res, next) => {
    if (!req.query.url) {
      const query = req.query
      query.url = '/api-docs'
      res.redirect(301, url.format({ query }))
      return
    }
    next()
  })

  app.use('/docs', express.static(swaggerUiPath))

  // Error handler
  app.use((err, req, res, next) => {
    if (err.message === 'Validation errors') {
      res.statusCode = err.statusCode
      res.json({
        message: 'Error',
        errors: err.errors
      })
      next()
      return
    }

    next(err)
  })
})

module.exports = app
