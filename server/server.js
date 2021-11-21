const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
require('dotenv').config();
const session = require("express-session");
const app = express();
const sequelize = require("./config/connection.js")
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require("./controllers");

const PORT = process.env.PORT || 3017;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
      maxAge: 1000 * 60 * 60 * 2
  },
  store: new SequelizeStore({
      db:sequelize
  })
}))
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes)
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
  console.log('App listening on PORT ' + PORT);
  });
});