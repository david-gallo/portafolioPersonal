import ThemeToggle from './components/ThemeToggle'
import ScrollIndicator from './components/ScrollIndicator'
import Hero from './sections/Hero'
import TechStack from './sections/TechStack'
import FeaturedProjects from './sections/FeaturedProjects'
import MoreInfo from './sections/MoreInfo'
import Contact from './sections/Contact'
import useScrollReveal from './hooks/useScrollReveal'

import './styles/App.css'

const App = () => {
  const { setRef, layerIndex, goToLayer, totalLayers } = useScrollReveal(3)

  return (
    <div className="page-wrapper">
      <ThemeToggle />
      <ScrollIndicator totalLayers={totalLayers} layerIndex={layerIndex} goToLayer={goToLayer} />

      {/* CAPA 3 - Contacto (la más profunda, no se mueve) */}
      <div className={`layer layer--contact${layerIndex === 2 ? ' layer--visible' : ''}`}>
        <Contact />
      </div>

      {/* CAPA 2 - Más información (se mueve) */}
      <div className={`layer layer--info${layerIndex === 1 ? ' layer--visible' : ''}`} ref={setRef(1)}>
        <MoreInfo />
      </div>

      {/* CAPA 1 - Card principal (se mueve, lo primero que se ve) */}
      <main className="portfolio" ref={setRef(0)}>
        <Hero />
        <TechStack />
        <FeaturedProjects />
        {layerIndex === 0 && <span className="scroll-hint">↓ scroll para ver más</span>}
      </main>
    </div>
  )
}

export default App
