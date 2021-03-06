import { ApolloServer } from "apollo-server";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { models, db } from "./database";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { models, db };
  },
});

server.listen(5000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
