export type RepoNode = {
  __typename: 'Repository'
  id: string
  name: string
  stargazerCount: number
  forkCount: number
  url: string
}

export type SearchRepositoriesQueryResult = {
  search: {
    nodes: RepoNode[]
  }
}

export type SearchRepositoriesQueryVariables = {
  query: String
}
