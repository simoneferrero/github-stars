import { SEARCH_REPOSITORIES_QUERY } from '../queries/searchRepositories'

export const reposNodes = [
  {
    __typename: 'Repository' as const,
    id: 'MDEwOlJlcG9zaXRvcnkyODQ1NzgyMw==',
    name: 'freeCodeCamp',
    stargazerCount: 356893,
    forkCount: 30402,
    url: 'https://github.com/freeCodeCamp/freeCodeCamp',
  },
  {
    __typename: 'Repository' as const,
    id: 'MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==',
    name: 'react',
    stargazerCount: 197657,
    forkCount: 41006,
    url: 'https://github.com/facebook/react',
  },
  {
    __typename: 'Repository' as const,
    id: 'MDEwOlJlcG9zaXRvcnk2MzUzNzI0OQ==',
    name: 'create-react-app',
    stargazerCount: 97927,
    forkCount: 25547,
    url: 'https://github.com/facebook/create-react-app',
  },
]

export const altRepoNode = {
  __typename: 'Repository',
  id: 'MDEwOlJlcG9zaXRvcnkxOTg3MjQ1Ng==',
  name: 'react-router',
  stargazerCount: 48786,
  forkCount: 9588,
  url: 'https://github.com/remix-run/react-router',
}

const createMocks = (isSuccess = true) => [
  {
    request: {
      query: SEARCH_REPOSITORIES_QUERY,
      variables: { query: 'react' },
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
      variables: { query: 'react-router' },
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
