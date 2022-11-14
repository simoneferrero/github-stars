import { SEARCH_REPOSITORIES_QUERY } from '../queries/searchRepositories'

export const reposNodes = [
  {
    __typename: 'Repository' as const,
    name: 'freeCodeCamp',
    stargazerCount: 356893,
    forkCount: 30402,
    url: 'https://github.com/freeCodeCamp/freeCodeCamp',
  },
  {
    __typename: 'Repository' as const,
    name: 'react',
    stargazerCount: 197657,
    forkCount: 41006,
    url: 'https://github.com/facebook/react',
  },
  {
    __typename: 'Repository' as const,
    name: 'create-react-app',
    stargazerCount: 97927,
    forkCount: 25547,
    url: 'https://github.com/facebook/create-react-app',
  },
]

export const altRepoNode = {
  __typename: 'Repository',
  name: 'react-router',
  stargazerCount: 48786,
  forkCount: 9588,
  url: 'https://github.com/remix-run/react-router',
}

const createMocks = (isSuccess = true) => [
  {
    request: {
      query: SEARCH_REPOSITORIES_QUERY,
      variables: { query: 'react sort:stars' },
    },
    ...(isSuccess
      ? {
          result: {
            data: {
              search: {
                nodes: reposNodes,
              },
            },
          },
        }
      : {
          error: new Error('An error occurred'),
        }),
  },
  {
    request: {
      query: SEARCH_REPOSITORIES_QUERY,
      variables: { query: 'react-router sort:stars' },
    },
    result: {
      data: {
        search: {
          nodes: [altRepoNode],
        },
      },
    },
  },
]

export const successMocks = createMocks()
export const errorMocks = createMocks(false)
