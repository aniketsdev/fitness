import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { WhatsAppButton } from './WhatsAppButton'

describe('WhatsAppButton', () => {
  it('builds a wa.me URL with the given number and url-encoded message', () => {
    render(
      <WhatsAppButton
        number="919876543210"
        message="Hi there & welcome!"
        label="Chat now"
      />
    )
    const link = screen.getByRole('link', { name: /chat now/i })
    expect(link).toHaveAttribute(
      'href',
      'https://wa.me/919876543210?text=Hi%20there%20%26%20welcome!'
    )
  })

  it('opens in a new tab with rel noopener', () => {
    render(
      <WhatsAppButton
        number="919876543210"
        message="Hi"
        label="Chat now"
      />
    )
    const link = screen.getByRole('link', { name: /chat now/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders the message-circle icon', () => {
    const { container } = render(
      <WhatsAppButton number="919876543210" message="Hi" label="Chat now" />
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
