import InfiniteCarousel from '../components/InfiniteCarousel'
import './Education.css'

const BASE = import.meta.env.BASE_URL

const diplomas = [
  { src: `${BASE}diploma-desarrollo-web.png`, title: 'Desarrollo Web' },
  { src: `${BASE}diploma-javascript.png`, title: 'JavaScript' },
  { src: `${BASE}diploma-react.png`, title: 'React JS' },
  { src: `${BASE}diploma-backend-1.png`, title: 'Backend I: Desarrollo Avanzado' },
  { src: `${BASE}diploma-backend-2.png`, title: 'Backend II: Diseño y Arquitectura' },
  { src: `${BASE}diploma-backend-3.png`, title: 'Backend III: Testing y Escalabilidad' },
]

const Education = () => (
  <section className="education">
    <h2>Formación</h2>
    <p className="education__subtitle">Carrera Desarrollador Full Stack — Coderhouse</p>
    <InfiniteCarousel speed={1}>
      {diplomas.map((d) => (
        <img
          key={d.title}
          className="carousel__slide"
          src={d.src}
          alt={`Certificado ${d.title}`}
          loading="lazy"
          draggable={false}
        />
      ))}
    </InfiniteCarousel>
  </section>
)

export default Education
