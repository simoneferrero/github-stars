import { render, screen } from '@testing-library/react'
import ReposTable from '.'
import { reposNodes } from '../../mocks/reposSearch'

const renderComponent = () => render(<ReposTable repos={reposNodes} />)

describe('ReposTable', () => {
  it('should render the table header', () => {
    renderComponent()

    const nameHeader = screen.getByText(/name/i)
    expect(nameHeader).toBeVisible()

    const starsHeader = screen.getByText(/🌟 stars/i)
    expect(starsHeader).toBeVisible()

    const forksHeader = screen.getByText(/🍴 forks/i)
    expect(forksHeader).toBeVisible()
  })

  it('should render the table data', () => {
    renderComponent()

    reposNodes.forEach(({ name, url, stargazerCount, forkCount }) => {
      const repoName = screen.getByRole('link', { name })
      expect(repoName).toHaveAttribute('href', url)

      const stars = screen.getByText(String(stargazerCount))
      expect(stars).toBeVisible()

      const forks = screen.getByText(String(forkCount))
      expect(forks).toBeVisible()
    })
  })
})
