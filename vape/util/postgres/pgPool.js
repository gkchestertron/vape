const Pool                    = require('pg').Pool
const parsePgConnectionString = require('pg-connection-string').parse
const path                    = require('path')
const config                  = require(path.resolve('./config/server'))
const pgUrl                   = config.PSQL_ADMIN_URI

/**
 * creates a pgPool with current config so it's easy to grab the same pool all over the app
 */
module.exports = new Pool(Object.assign({}, parsePgConnectionString(pgUrl), {
  max: 15,
  idleTimeoutMillis: 500,
}))
