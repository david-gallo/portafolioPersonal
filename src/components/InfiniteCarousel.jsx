import useDragCarousel from '../hooks/useDragCarousel'
import './InfiniteCarousel.css'

const InfiniteCarousel = ({ children, speed = 1, className = '' }) => {
  const trackRef = useDragCarousel(speed)

  return (
    <div className={`inf-carousel ${className}`}>
      <div className="inf-carousel__track" ref={trackRef}>
        {children}
        {children}
      </div>
    </div>
  )
}

export default InfiniteCarousel
