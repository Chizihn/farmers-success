// Apollo Client configuration
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import Cookies from "js-cookie";

const authLink = new ApolloLink((operation, forward) => {
  const token = Cookies.get("token");

  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(
    new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT })
  ),
  cache: new InMemoryCache(),
});

export default client;
