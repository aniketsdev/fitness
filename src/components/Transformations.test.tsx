import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Transformations } from './Transformations'

describe('Transformations', () => {
  it('renders the section heading', () => {
    render(<Transformations />)
    expect(
      screen.getByRole('heading', { level: 2, name: /real results/i })
    ).toBeInTheDocument()
  })

  it('renders all 5 result cards (3 transformations + 2 testimonials)', () => {
    const { container } = render(<Transformations />)
    const cards = container.querySelectorAll('[data-card]')
    expect(cards.length).toBe(5)
  })
})
