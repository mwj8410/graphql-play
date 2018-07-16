'use strict'

const { getResult } = require('../lib/getDelay')

const {
  addResolveFunctionsToSchema
, makeExecutableSchema
} = require('graphql-tools')

const schema = makeExecutableSchema({
  typeDefs: `
    type Query {
      hello(namedValue: String): String!
    }
  `
})

async function action (root, args, context) {
  const {results} = await getResult()
  const {namedValue} = args
  const {user} = context

  return `Hello ${user.name_first}, you provided ${namedValue} and we waited for ${results}!`
}

const resolvers = {
  Query: {
    hello: action
  }
}

// query($namedValue: String) {hello(namedValue: $namedValue)}

addResolveFunctionsToSchema({ schema, resolvers })

module.exports = schema
