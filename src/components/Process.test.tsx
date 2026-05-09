import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Process } from './Process'

describe('Process', () => {
  it('renders the section heading', () => {
    render(<Process />)
    expect(
      screen.getByRole('heading', { level: 2, name: /three steps/i })
    ).toBeInTheDocument()
  })

  it('renders all three step headings', () => {
    render(<Process />)
    expect(screen.getByText(/free whatsapp consultation/i)).toBeInTheDocument()
    expect(screen.getByText(/custom plan built for you/i)).toBeInTheDocument()
    expect(
      screen.getByText(/daily check-ins & adjustments/i)
    ).toBeInTheDocument()
  })

  it('renders the "How it works" eyebrow label', () => {
    render(<Process />)
    expect(screen.getByText(/how it works/i)).toBeInTheDocument()
  })
})
