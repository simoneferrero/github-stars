import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import App from './App'
import { MockedProvider } from '@apollo/client/testing'
import {
  successMocks,
  reposSearchNodes,
  errorMocks,
} from './mocks/searchRepositories'

const renderComponent = (mocks = successMocks) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  )

describe('App', () => {
  it('should render a loader when data is being fetched', () => {
    renderComponent()

    const title = screen.getByRole('heading', {
      level: 1,
      name: /github stars/i,
    })
    expect(title).toBeVisible()

    const loadingText = screen.getByText(/loading.../i)
    expect(loadingText).toBeVisible()
  })

  it('should render the data when it has been fetched', async () => {
    renderComponent()

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

    reposSearchNodes.forEach(({ name, url }) => {
      const repoName = screen.getByRole('link', { name })
      expect(repoName).toHaveAttribute('href', url)
    })
  })

  it('should render an error when there is an issue fetching data', async () => {
    renderComponent(errorMocks)

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

    const numberOfRepos = await screen.findByText(/there was an error/i)
    expect(numberOfRepos).toBeVisible()
  })
})
