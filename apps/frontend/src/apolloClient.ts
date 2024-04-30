import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { AUTH_COOKIE_NAME, BACKEND_URL } from "./constants/config";
import { getCookie } from "./utils/cookie";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(graphQLErrors);
  }
});
const uploadLink = createUploadLink({
  uri: `${BACKEND_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const authToken = getCookie(AUTH_COOKIE_NAME);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : "",
    },
  };
});

const client = new ApolloClient({
  uri: `${BACKEND_URL}/graphql`,
  cache: new InMemoryCache({
    // typePolicies: {
    //   PaginatedOrganizerCategory: {
    //     fields: {
    //       data: {
    //         merge(existing?: any[], incoming?: any[]) {
    //           console.log("Incoming 🤔🤔🤔🤔", incoming);
    //           console.log("Existing 🚀🚀🚀🚀🚀", existing);
    //           if (!existing) return incoming;
    //           if (!incoming) return existing;
    //           if (incoming?.length === 0) {
    //             return existing;
    //           }
    //           if (existing?.length === 0) {
    //             return incoming;
    //           }

    //           return [...existing, ...incoming];
    //         },
    //       },
    //       meta: {
    //         merge(existing, incoming) {
    //           console.log("Incoming 🤔🤔🤔🤔", incoming);
    //           console.log("Existing 🚀🚀🚀🚀🚀", existing);
    //           return incoming;
    //         },
    //       },
    //     },
    //   },
    // },
  }),
  // link: authLink.concat(httpLink).concat(createUploadLink()).concat(errorLink),
  link: authLink.concat(uploadLink).concat(errorLink),
});

export default client;
