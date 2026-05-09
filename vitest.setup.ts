import '@testing-library/jest-dom/vitest'

// IntersectionObserver isn't available in jsdom — provide a minimal mock
class MockIntersectionObserver {
  observe = () => null
  unobserve = () => null
  disconnect = () => null
  takeRecords = () => []
  root = null
  rootMargin = ''
  thresholds = []
}

;(globalThis as unknown as { IntersectionObserver: typeof MockIntersectionObserver }).IntersectionObserver =
  MockIntersectionObserver
