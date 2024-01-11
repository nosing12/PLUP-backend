require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({
  schema,
  context: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA0OTM0MDA2fQ.bWJun0zueN09nyrvRTGz5OWdPUhFavm1ribrth6BHCU",
  },
});

const PORT = process.env.PORT;
server
  .listen(PORT)
  .then(() => console.log(`🚀Server is running on http://localhost:${PORT}`));
