'use strict'

const assert = require('assert')
const logger = require('winston')
const SwaggerClient = require('swagger-client')

assert(process.env.USER_API_SERVICE_HOST, 'USER_API_SERVICE_HOST is required')
assert(process.env.USER_API_SERVICE_PORT, 'USER_API_SERVICE_PORT is required')

console.log('USER_API_SERVICE_HOST is ', process.env.USER_API_SERVICE_HOST)
console.log('USER_API_SERVICE_PORT is ', process.env.USER_API_SERVICE_PORT)

const userAPIUri = `http://${process.env.USER_API_SERVICE_HOST}:${process.env.USER_API_SERVICE_PORT}`

let userClient

/**
* List users via user-api and vehicle-api
* @function get
* @param {express.Request} req
* @param {express.Response} res
* @param {Function} next
*/
async function get (req, res, next) {
  const User = await getUserClient()
  const { obj: users } = await User.apis.user.get()
  logger.debug('Get users', users)

  // Response with users and vehicles together
  const responseUsers = users
  res.json(responseUsers)
  next()
}

/**
* Singleton that resolves User API client
* @function getUserClient
* @param {Promise} client - swagger client
*/
async function getUserClient () {
  if (!userClient) {
    logger.debug('User Client resolve')
    userClient = await SwaggerClient(`${userAPIUri}/api-docs`)
    logger.debug('User Client succesfully resolved')
  }
  return userClient
}

module.exports = {
  get
}
