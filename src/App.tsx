import logo from './logo.svg'
import './App.css'
import { gql, useQuery } from '@apollo/client'

type Query = {
  viewer: {
    login?: string
  }
}

const QUERY = gql`
  query {
    viewer {
      login
    }
  }
`

function App() {
  const { data, loading, error } = useQuery<Query>(QUERY)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {loading
            ? 'Loading...'
            : error
            ? 'There was an error'
            : data?.viewer.login}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
