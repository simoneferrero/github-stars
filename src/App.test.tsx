import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { MockedProvider } from '@apollo/client/testing'
import {
  successMocks,
  errorMocks,
  reposNodes,
  altRepoNode,
} from './mocks/reposSearch'

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

    reposNodes.forEach(({ name, url }) => {
      const repoName = screen.getByRole('link', { name })
      expect(repoName).toHaveAttribute('href', url)
    })
  })

  it('should render an error when there is an issue fetching data', async () => {
    renderComponent(errorMocks)

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

    const error = await screen.findByText(/there was an error/i)
    expect(error).toBeVisible()
  })

  it('should render new data when the user types a new search value', async () => {
    renderComponent()

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

    const searchInput = screen.getByLabelText(/search value/i)

    userEvent.type(searchInput, '-router')

    const submitButton = screen.getByRole('button', { name: /search/i })

    userEvent.click(submitButton)

    const loadingText = await screen.findByText(/loading.../i)
    expect(loadingText).toBeVisible()

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

    const repoName = await screen.findByRole('link', { name: altRepoNode.name })
    expect(repoName).toBeVisible()
  })
})
