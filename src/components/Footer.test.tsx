import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders the coach name', () => {
    render(<Footer />)
    expect(screen.getByText('Shubham Rawat')).toBeInTheDocument()
  })

  it('renders the copyright with current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })

  it('renders the instagram link', () => {
    render(<Footer />)
    expect(
      screen.getByRole('link', { name: /instagram/i })
    ).toBeInTheDocument()
  })
})
