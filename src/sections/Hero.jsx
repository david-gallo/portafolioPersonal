import './Hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="perfil-card">
        <div className="avatar">
          <img src={`${import.meta.env.BASE_URL}profile.jpeg`} alt="David Gallo" />
        </div>
        <h1>David Gallo</h1>
      </div>
      <p className="subtitle">Desarrollador Full Stack Jr</p>
    </section>
  )
}

export default Hero
