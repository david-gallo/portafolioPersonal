import { useEffect, useRef, useCallback, useState } from 'react'
import { animate } from 'animejs'

const WHEEL_COOLDOWN = 800 // ms entre cambios por rueda

/**
 * Hook que gestiona el scroll entre capas.
 * Soporta: wheel, keyboard y navegación programática (dots).
 *
 * @param {number} totalLayers - cantidad de capas (ej: 3)
 */
const useScrollReveal = (totalLayers = 3) => {
  const layerRefs = useRef([])
  const currentLayer = useRef(0)
  const [layerIndex, setLayerIndex] = useState(0)
  const isAnimating = useRef(false)
  const wheelTimer = useRef(null)

  const setRef = useCallback((index) => (el) => {
    layerRefs.current[index] = el
  }, [])

  // Anima las capas a la posición de la capa indicada
  const animateToLayer = useCallback((targetLayer) => {
    if (targetLayer < 0 || targetLayer >= totalLayers || isAnimating.current) return
    isAnimating.current = true
    currentLayer.current = targetLayer
    setLayerIndex(targetLayer)

    for (let i = 0; i < totalLayers - 1; i++) {
      const el = layerRefs.current[i]
      if (!el) continue

      const offset = Math.max(0, targetLayer - i) * -100
      animate(el, {
        translateY: `${offset}vh`,
        duration: 500,
        easing: 'cubicBezier(0.22, 1, 0.36, 1)',
      })
    }

    setTimeout(() => {
      isAnimating.current = false
    }, 520)
  }, [totalLayers])

  useEffect(() => {
    const wrapper = layerRefs.current[0]?.parentElement
    if (!wrapper) return

    // ===== WHEEL =====
    const handleWheel = (e) => {
      if (isAnimating.current || wheelTimer.current) return

      if (e.deltaY > 20 && currentLayer.current < totalLayers - 1) {
        animateToLayer(currentLayer.current + 1)
      } else if (e.deltaY < -20 && currentLayer.current > 0) {
        animateToLayer(currentLayer.current - 1)
      } else {
        return
      }

      wheelTimer.current = setTimeout(() => {
        wheelTimer.current = null
      }, WHEEL_COOLDOWN)
    }

    // ===== TOUCH (swipe simple, sin drag visual) =====
    let touchStartY = 0

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (isAnimating.current) return
      const deltaY = e.changedTouches[0].clientY - touchStartY
      if (deltaY < -50 && currentLayer.current < totalLayers - 1) {
        animateToLayer(currentLayer.current + 1)
      } else if (deltaY > 50 && currentLayer.current > 0) {
        animateToLayer(currentLayer.current - 1)
      }
    }

    // ===== KEYBOARD =====
    const handleKeyDown = (e) => {
      if (isAnimating.current) return

      if ((e.key === 'ArrowDown' || e.key === 'PageDown') && currentLayer.current < totalLayers - 1) {
        e.preventDefault()
        animateToLayer(currentLayer.current + 1)
      } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && currentLayer.current > 0) {
        e.preventDefault()
        animateToLayer(currentLayer.current - 1)
      }
    }

    wrapper.addEventListener('wheel', handleWheel, { passive: true })
    wrapper.addEventListener('touchstart', handleTouchStart, { passive: true })
    wrapper.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      wrapper.removeEventListener('wheel', handleWheel)
      wrapper.removeEventListener('touchstart', handleTouchStart)
      wrapper.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(wheelTimer.current)
    }
  }, [animateToLayer, totalLayers])

  return { setRef, currentLayer, layerIndex, goToLayer: animateToLayer, totalLayers }
}

export default useScrollReveal
