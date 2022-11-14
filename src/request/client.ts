import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const GITHUB_GRAPHQL_ENDPOINT = process.env.REACT_APP_GITHUB_GRAPHQL_ENDPOINT
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const httpLink = createHttpLink({
  uri: GITHUB_GRAPHQL_ENDPOINT,
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
