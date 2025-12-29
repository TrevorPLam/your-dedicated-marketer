import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navigation from '@/components/Navigation'

describe('Navigation', () => {
  it('renders primary navigation links', () => {
    render(<Navigation />)

    expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /pricing/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument()
  })

  it('opens and closes the mobile menu via button and escape key', async () => {
    const user = userEvent.setup()
    render(<Navigation />)

    const toggle = screen.getByRole('button', { name: /toggle mobile menu/i })
    await user.click(toggle)

    const menu = screen.getByRole('menu', { name: /mobile navigation/i })
    expect(menu).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu', { name: /mobile navigation/i })).not.toBeInTheDocument()
  })
})
