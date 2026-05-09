import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { About } from './About'

describe('About', () => {
  it('renders the section heading', () => {
    render(<About />)
    expect(
      screen.getByRole('heading', { level: 2, name: /hi, i'm shubham/i })
    ).toBeInTheDocument()
  })

  it('renders the three stats', () => {
    render(<About />)
    expect(screen.getByText(/clients trained/i)).toBeInTheDocument()
    expect(screen.getByText(/years coaching/i)).toBeInTheDocument()
    expect(screen.getByText(/success rate/i)).toBeInTheDocument()
  })
})
