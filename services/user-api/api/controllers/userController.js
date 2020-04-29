'use strict'

// Simple user database
const USER_DB = [
  {
    id: 1,
    name: 'Samantha'
  },
  {
    id: 2,
    name: 'Johnw2'
  }
]

/**
* List users
* @function get
* @param {express.Request} req
* @param {express.Response} res
* @param {Function} next
*/
async function get (req, res, next) {
  console.log('UA - getting users')
  res.json(USER_DB)
  next()
}

module.exports = {
  get
}
