import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { buildTypeDefsAndResolversSync } from "type-graphql";
import { AuthResolver } from "../resolvers/auth/auth.resolver";
import { CategoryResolver } from "../resolvers/category/category.resolver";
import { EventResolver } from "../resolvers/events/event.resolver";
import { MediaResolver } from "../resolvers/media/media.resolver";
import UserResolver from "../resolvers/user/user.resolver";
import { TicketResolver } from "../resolvers/tickets/ticket.resolver";
import { CouponResolver } from "../resolvers/coupons/coupons.resolver";
function configGraphQLServer(httpServer: http.Server) {
  const { typeDefs, resolvers } = buildTypeDefsAndResolversSync({
    resolvers: [
      MediaResolver,
      AuthResolver,
      UserResolver,
      CategoryResolver,
      EventResolver,
      TicketResolver,
      CouponResolver
    ],
    // container: Container
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: false,
    formatError: (err) => {
      console.log(err)
      return {
        message: err.message,
        errors: err?.extensions?.errors,
        status: "error",
      };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], // apollo -> http bind.
  });
  return server;
}

export default configGraphQLServer;
