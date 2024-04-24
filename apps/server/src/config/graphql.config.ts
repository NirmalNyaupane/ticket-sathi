import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { buildTypeDefsAndResolversSync } from "type-graphql";
import { MediaResolver } from "../resolvers/media/media.resolver";
import { AuthResolver } from "../resolvers/auth/auth.resolver";
import UserResolver from "../resolvers/user/user.resolver";
import { Container } from "typedi"
function configGraphQLServer(httpServer: http.Server) {
  const { typeDefs, resolvers } = buildTypeDefsAndResolversSync({
    resolvers: [MediaResolver, AuthResolver, UserResolver],
    // container: Container
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: false,
    formatError: (err) => {
      return { message: err.message, errors: err?.extensions?.errors, status: "error" };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], // apollo -> http bind.
  });
  return server;
}

export default configGraphQLServer;
