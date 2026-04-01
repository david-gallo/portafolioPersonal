import './ScrollIndicator.css'

const ScrollIndicator = ({ totalLayers, layerIndex, goToLayer }) => {
  return (
    <nav className="scroll-indicator" aria-label="Navegación de secciones">
      {Array.from({ length: totalLayers }, (_, i) => (
        <button
          key={i}
          className={`scroll-dot${i === layerIndex ? ' scroll-dot--active' : ''}`}
          onClick={() => goToLayer(i)}
          aria-label={`Ir a sección ${i + 1}`}
          aria-current={i === layerIndex ? 'true' : undefined}
        />
      ))}
    </nav>
  )
}

export default ScrollIndicator
