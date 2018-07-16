'use strict'

const { getResultList } = require('../lib/getDelay')

const {
  addResolveFunctionsToSchema
, makeExecutableSchema
} = require('graphql-tools')

const schema = makeExecutableSchema({
  typeDefs: `
    
    type ListResponse {
      id: Int,
      name: String,
      noshow: String
    }
  
    type Query {
      list: [ListResponse!]
    }
  `
})

async function action (root, args, context) {
  const {results} = await getResultList()
  return results
}

const resolvers = {
  Query: {
    list: action
  }
}

addResolveFunctionsToSchema({ schema, resolvers })

module.exports = schema
