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

const createMocks = (isSuccess = true) => [
  {
    request: {
      query: SEARCH_REPOSITORIES_QUERY,
      variables: { query: 'topic:react sort:stars' },
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
]

export const successMocks = createMocks()
export const errorMocks = createMocks(false)
