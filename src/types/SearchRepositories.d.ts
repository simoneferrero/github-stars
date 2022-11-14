export type SearchRepository = {
  __typename: 'Repository'
  name: string
  stargazerCount: number
  forkCount: number
  url: string
}

export type SearchRepositoriesQueryResult = {
  search: {
    nodes: SearchRepository[]
  }
}

export type SearchRepositoriesVariables = {
  query: String
}
