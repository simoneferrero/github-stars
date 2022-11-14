import './App.css'
import { useLazyQuery } from '@apollo/client'
import {
  SearchRepositoriesQueryResult,
  SearchRepositoriesQueryVariables,
} from './types/ReposSearch'
import { SEARCH_REPOSITORIES_QUERY } from './queries/searchRepositories'
import ReposTable from './components/ReposTable'
import SearchBox from './components/SearchBox'
import { useEffect } from 'react'

const App = () => {
  const [searchRepositories, { data, loading, error }] = useLazyQuery<
    SearchRepositoriesQueryResult,
    SearchRepositoriesQueryVariables
  >(SEARCH_REPOSITORIES_QUERY)

  useEffect(() => {
    searchRepositories({
      variables: {
        query: 'react sort:stars',
      },
    })
  }, [searchRepositories])

  const handleSubmit = (searchValue: string) => {
    searchRepositories({
      variables: {
        query: `${searchValue} sort:stars`,
      },
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>GITHUB STARS</h1>
        <SearchBox handleSubmit={handleSubmit} loading={loading} />
      </header>
      <main className="App-main">
        <section>
          {loading ? (
            <p>Loading...</p>
          ) : error || !data?.search ? (
            <p>There was an error'</p>
          ) : (
            <ReposTable repos={data.search.nodes} />
          )}
        </section>
      </main>
    </div>
  )
}

export default App
