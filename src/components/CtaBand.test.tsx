import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CtaBand } from './CtaBand'

describe('CtaBand', () => {
  it('renders the headline', () => {
    render(<CtaBand />)
    const h2 = screen.getByRole('heading', { level: 2 })
    expect(h2).toHaveTextContent(/ready when/i)
    expect(h2).toHaveTextContent(/you are/i)
  })

  it('renders the WhatsApp CTA link', () => {
    render(<CtaBand />)
    expect(
      screen.getByRole('link', { name: /message shubham/i })
    ).toBeInTheDocument()
  })
})
