import { About } from './components/About'
import { CtaBand } from './components/CtaBand'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Process } from './components/Process'
import { Transformations } from './components/Transformations'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Process />
        <Transformations />
        <CtaBand />
      </main>
      <Footer />
    </>
  )
}

export default App
