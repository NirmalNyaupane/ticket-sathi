import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { getCookie } from './utils/cookie';
import { AUTH_COOKIE_NAME, BACKEND_URL } from './constants/config';
import { setContext } from '@apollo/client/link/context';
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        console.log(graphQLErrors)
    }
});
const httpLink = new HttpLink({ uri: `${BACKEND_URL}/graphql` })
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const authToken = getCookie(AUTH_COOKIE_NAME);

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: authToken ? `Bearer ${authToken}` : "",
        }
    }
});
const client = new ApolloClient({
    uri: `${BACKEND_URL}/graphql`,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default client;