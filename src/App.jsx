import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Loader from './components/Loader'
import BackgroundGrid from './components/BackgroundGrid'
import ScrollPulse from './components/ScrollPulse'
import EnvironmentReveal from './components/EnvironmentReveal'
import Dagger from './components/Dagger'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Experience from './components/Experience'
import ProjectHistory from './components/ProjectHistory'
import WorkCarousel from './components/WorkCarousel'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <AnimatePresence>{loading && <Loader onDone={() => setLoading(false)} />}</AnimatePresence>

      <EnvironmentReveal>
        <BackgroundGrid />
      </EnvironmentReveal>
      <ScrollPulse />
      <EnvironmentReveal>
        <Dagger />
      </EnvironmentReveal>

      <Header ready={!loading} />

      <main id="top">
        <Hero ready={!loading} />
        <Services />
        <Experience />
        <ProjectHistory />
        <WorkCarousel />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
