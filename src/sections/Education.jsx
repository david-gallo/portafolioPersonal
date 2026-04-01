import InfiniteCarousel from '../components/InfiniteCarousel'
import './Education.css'

const diplomas = [
  { src: '/6a5607da-d51c-4c40-b782-8ba780dd303e (1).png', title: 'Desarrollo Web' },
  { src: '/24e5eb54-5b3f-4190-bdd7-8a18fc442f7b.png', title: 'JavaScript' },
  { src: '/a8701508-1cf5-4afc-bceb-9efcdf789cf0 (1).png', title: 'React JS' },
  { src: '/30f384c3-8070-459b-824a-6a0bf7de004c.png', title: 'Backend I: Desarrollo Avanzado' },
  { src: '/1c960a47-6fcc-458f-b3ad-72b67749c659.png', title: 'Backend II: Diseño y Arquitectura' },
  { src: '/2ee5d56a-8440-40c5-9f8a-2e57c1232aac.png', title: 'Backend III: Testing y Escalabilidad' },
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
