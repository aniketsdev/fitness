import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useScrollReveal } from './useScrollReveal'

describe('useScrollReveal', () => {
  let observerCallback: IntersectionObserverCallback | null = null
  let observeSpy: ReturnType<typeof vi.fn>
  let disconnectSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    observeSpy = vi.fn()
    disconnectSpy = vi.fn()
    observerCallback = null

    class ObserverStub {
      root = null
      rootMargin = ''
      thresholds: number[] = []
      observe = observeSpy
      unobserve = vi.fn()
      disconnect = disconnectSpy
      takeRecords = () => []
      constructor(cb: IntersectionObserverCallback) {
        observerCallback = cb
      }
    }
    ;(globalThis as unknown as { IntersectionObserver: typeof ObserverStub }).IntersectionObserver =
      ObserverStub
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('starts with isVisible=false', () => {
    const { result } = renderHook(() => useScrollReveal<HTMLDivElement>())
    expect(result.current.isVisible).toBe(false)
  })

  it('observes the ref target after mount', () => {
    const { result } = renderHook(() => useScrollReveal<HTMLDivElement>())
    const el = document.createElement('div')
    act(() => {
      result.current.ref(el)
    })
    expect(observeSpy).toHaveBeenCalledWith(el)
  })

  it('flips to isVisible=true when the observer reports intersection', () => {
    const { result } = renderHook(() => useScrollReveal<HTMLDivElement>())
    const el = document.createElement('div')
    act(() => {
      result.current.ref(el)
    })
    act(() => {
      observerCallback?.(
        [{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })
    expect(result.current.isVisible).toBe(true)
  })

  it('disconnects the observer on unmount', () => {
    const { result, unmount } = renderHook(() => useScrollReveal<HTMLDivElement>())
    const el = document.createElement('div')
    act(() => {
      result.current.ref(el)
    })
    unmount()
    expect(disconnectSpy).toHaveBeenCalled()
  })
})
