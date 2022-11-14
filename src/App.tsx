import './App.css'
import { useQuery } from '@apollo/client'
import {
  SearchRepositoriesQueryResult,
  SearchRepositoriesVariables,
} from './types/SearchRepositories'
import { SEARCH_REPOSITORIES_QUERY } from './queries/searchRepositories'
import ReposTable from './components/ReposTable'

const App = () => {
  const { data, loading, error } = useQuery<
    SearchRepositoriesQueryResult,
    SearchRepositoriesVariables
  >(SEARCH_REPOSITORIES_QUERY, {
    variables: {
      query: 'topic:react sort:stars',
    },
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>GITHUB STARS</h1>
        <section>
          {loading ? (
            'Loading...'
          ) : error || !data?.search ? (
            'There was an error'
          ) : (
            <ReposTable repos={data.search.nodes} />
          )}
        </section>
      </header>
    </div>
  )
}

export default App
