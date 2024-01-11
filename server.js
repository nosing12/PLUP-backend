require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import { getUser, protectResolver } from "./users/users.utils";

const app = express();
const PORT = process.env.PORT;

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      protectResolver,
    };
  },
});

app.use(logger("tiny"));
server.start().then(() => {
  server.applyMiddleware({ app });
});

app.listen({ port: PORT }, () => {
  console.log(`🚀Server is running on http://localhost:${PORT}`);
});
