import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders the headline', () => {
    render(<Hero />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent(/your body/i)
    expect(h1).toHaveTextContent(/your timeline/i)
  })

  it('renders the WhatsApp CTA', () => {
    render(<Hero />)
    expect(
      screen.getByRole('link', { name: /start on whatsapp/i })
    ).toBeInTheDocument()
  })

  it('renders a "see transformations" anchor pointing to #results', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: /see transformations/i })
    expect(link).toHaveAttribute('href', '#results')
  })
})
