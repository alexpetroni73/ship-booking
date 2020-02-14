const { port, publicDir, jwtSecret } = require('./config')

const express = require('express')
const { server } = require('./apollo-server')
const { wireRoutes } = require('./routes')
const cors = require('cors')

const app = express()

app.use(cors())

// ApolloServer
server.applyMiddleware({ app, path: '/graphql' })
server.applyMiddleware({ app, path: '/subscriptions' })
server.applyMiddleware({ app, path: '/playground' })

// express routes
wireRoutes(app)

// Static files
app.use(express.static(publicDir))
app.use(express.static(publicDir + '/admin'))
app.use(express.static(publicDir + '/front'))

// ERRORS
app.use(function (err, req, res, next) {
  console.error(err)
  res.status(500).send('Something broke!')
})

const options = {
  port
}

app.listen(options, () => console.log(`🚀 Server ready at http://localhost:${ port }${server.graphqlPath}`))
