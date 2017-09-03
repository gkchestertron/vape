const path                   = require('path')
const config                 = require(path.resolve('./config/server'))
const graphql                = require('graphql').graphql
const postgraphql            = require('postgraphql')
const withPostGraphQLContext = postgraphql.withPostGraphQLContext
const getPostGraphQLSchema   = require('./getPostGraphQLSchema')
const pgPool                 = require('../postgres/pgPool')

/**
 * runs a query against the postgraphql schema using config
 * allows passing of token from request so services can be written 
 * that have exactly the access of the current user or lack thereof
 */
module.exports = function runQuery({ query, variables = null, operationName = null, jwtToken = null }) {
  // get the schema
  return getPostGraphQLSchema.then(schema => {
    // get postgraphql context from schema using our connection pool
    return withPostGraphQLContext({
      pgPool              : pgPool,
      pgDefaultRole       : config.PSQL_DEFAULT_ROLE,
      jwtSecret           : config.PSQL_SECRET,
      jwtToken            : jwtToken
    },
    context => {
      // You execute your GraphQL query in this function with the provided `context` object.
      // The `context` object will not work for a GraphQL execution outside of this function.
      return graphql(
        schema, // This is the schema we created with `createPostGraphQLSchema`.
        query,
        null, // root
        context, // Here we use the `context` object that gets passed to this callback.
        variables, // variables
        operationName // operationName
      )
    })
  })
}
