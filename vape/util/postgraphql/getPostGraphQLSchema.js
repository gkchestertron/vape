const path                    = require('path')
const config                  = require(path.resolve('./config/server'))
const postgraphql             = require('postgraphql')
const createPostGraphQLSchema = postgraphql.createPostGraphQLSchema

/**
 * returns the promise of creating a postgraphql schema
 * provides an easy way to programmatically use postgraphql with config
 */
module.exports = createPostGraphQLSchema(config.PSQL_URI, config.PSQL_SCHEMA, {
  pgDefaultRole       : config.PSQL_DEFAULT_ROLE,
  jwtSecret           : config.PSQL_SECRET,
  jwtPgTypeIdentifier : config.PSQL_SCHEMA + '.jwt_token'
})
