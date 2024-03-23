import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        console.log(graphQLErrors)
    }
});

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
    headers: {
        Authorization: 'Bearer abc123'
    },
    link: from([errorLink, httpLink]),
});

export default client;