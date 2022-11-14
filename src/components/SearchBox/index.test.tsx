import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBox from '.'

const handleSubmitMock = jest.fn()

const renderComponent = (loading = false) =>
  render(<SearchBox handleSubmit={handleSubmitMock} loading={loading} />)

describe('SearchBox', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render the search box', () => {
    renderComponent()

    const searchInput = screen.getByLabelText(/search value/i)
    expect(searchInput).toHaveValue('react')
  })

  it('should update the value of the search when a user types new search terms', () => {
    renderComponent()

    const searchInput = screen.getByLabelText(/search value/i)

    userEvent.type(searchInput, '-router')

    expect(searchInput).toHaveValue('react-router')
  })

  it('should be disabled and not submit the form when the search is loading', () => {
    renderComponent(true)

    const searchInput = screen.getByLabelText(/search value/i)
    expect(searchInput).toBeDisabled()

    const submitButton = screen.getByRole('button', { name: /search/i })
    expect(submitButton).toBeDisabled()
  })

  it('should display an error, disable the submit button and not submit the form when the search box is empty', () => {
    renderComponent()

    const errorText = /required/i
    const error = screen.queryByText(errorText)
    expect(error).not.toBeInTheDocument()

    const searchInput = screen.getByLabelText(/search value/i)

    userEvent.clear(searchInput)

    const visibleError = screen.getByText(errorText)
    expect(visibleError).toBeVisible()

    const submitButton = screen.getByRole('button', { name: /search/i })
    expect(submitButton).toBeDisabled()
  })

  it('should submit the form when the user clicks on the submit button', () => {
    renderComponent()

    const searchInput = screen.getByLabelText(/search value/i)

    userEvent.type(searchInput, '-router')

    const submitButton = screen.getByRole('button', { name: /search/i })

    userEvent.click(submitButton)

    expect(handleSubmitMock).toHaveBeenCalledWith('react-router')
  })
})
