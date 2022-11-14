import './App.css'
import { useQuery } from '@apollo/client'
import {
  SearchRepositoriesQueryResult,
  SearchRepositoriesVariables,
} from './types/SearchRepositories'
import { SEARCH_REPOSITORIES_QUERY } from './queries/searchRepositories'

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
          {loading
            ? 'Loading...'
            : error
            ? 'There was an error'
            : data?.search.nodes.map(({ name, url }) => (
                <p key={name}>
                  <a
                    className="App-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={url}
                  >
                    {name}
                  </a>
                </p>
              ))}
        </section>
      </header>
    </div>
  )
}

export default App
