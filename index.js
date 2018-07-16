'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')

const {runHttpQuery} = require('apollo-server-core')

const {mergeSchemas} = require('graphql-tools')

const schemas = require('./schemas/index.schema')
const listSchema = require('./schemas/list.schema')

const merged_schemas = mergeSchemas({
  schemas: Array.prototype.concat(
    schemas,
    listSchema
  )
})

const app = express()
app.use('/graphql', graphqlHTTP({
  schema: merged_schemas,
  rootValue: null,
  graphiql: true
}))
console.log('Running a GraphQL API server at localhost:4000/graphql')

app.use(bodyParser.json())
app.post('/reports', (req, res) => {
  const {body} = req
  const user = {
    id: 1,
    name_first: 'Matthew'
  }

  const options = {
      schema: merged_schemas
    , rootValue: {user}
    , logFunction: ''
    , fieldResolver: ''
    , context: {user}
    }

  runHttpQuery([req, res], {
      method: 'POST',
      options,
      query: body,
      request: req
    })
    .then((result) => {
      res.setHeader('content-type', 'application/json')
      res.status(200).send(result)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({ message: 'Sadness has happened' })
    })

})
console.log('Running a HTTP GraphQL server at localhost:4000/reports')

app.listen(4000)

