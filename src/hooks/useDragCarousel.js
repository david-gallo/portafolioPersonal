import { useRef, useEffect } from 'react'

const useDragCarousel = (speed = 1) => {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const container = track.parentElement

    let offset = 0
    let isDragging = false
    let startX = 0
    let dragDelta = 0
    let animId = null
    let prevTime = 0
    let isHovering = false
    let wasDragged = false

    const getHalfWidth = () => track.scrollWidth / 2

    const animate = (time) => {
      if (!isDragging && !isHovering && prevTime) {
        const dt = Math.min(time - prevTime, 50)
        offset -= speed * dt * 0.06

        const half = getHalfWidth()
        if (half > 0 && Math.abs(offset) >= half) {
          offset += half
        }
      }

      prevTime = time
      track.style.transform = `translateX(${offset + dragDelta}px)`
      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    const preventClick = (e) => {
      e.preventDefault()
      e.stopPropagation()
    }

    const onDown = (x) => {
      isDragging = true
      wasDragged = false
      startX = x
      dragDelta = 0
      container.style.cursor = 'grabbing'
    }

    const onMove = (x) => {
      if (!isDragging) return
      dragDelta = x - startX
      if (Math.abs(dragDelta) > 3) wasDragged = true
    }

    const onUp = () => {
      if (!isDragging) return
      isDragging = false
      offset += dragDelta
      dragDelta = 0
      container.style.cursor = ''

      const half = getHalfWidth()
      if (half > 0 && Math.abs(offset) >= half) {
        offset = offset % half
      }

      if (wasDragged) {
        track.addEventListener('click', preventClick, { capture: true, once: true })
      }
    }

    /* ----- Mouse ----- */
    const handleMouseDown = (e) => {
      e.preventDefault()
      onDown(e.clientX)
    }
    const handleMouseMove = (e) => onMove(e.clientX)
    const handleMouseUp = () => onUp()

    /* ----- Touch ----- */
    const handleTouchStart = (e) => onDown(e.touches[0].clientX)
    const handleTouchMove = (e) => onMove(e.touches[0].clientX)
    const handleTouchEnd = () => onUp()

    /* ----- Hover pause (solo desktop) ----- */
    const onEnter = () => { isHovering = true }
    const onLeave = () => {
      isHovering = false
      if (isDragging) onUp()
    }

    container.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)
    container.addEventListener('mouseenter', onEnter)
    container.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(animId)
      container.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
      container.removeEventListener('mouseenter', onEnter)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [speed])

  return trackRef
}

export default useDragCarousel
