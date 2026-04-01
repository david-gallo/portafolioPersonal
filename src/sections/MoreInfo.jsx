import AboutMe from './AboutMe'
import Education from './Education'
import MoreProjects from './MoreProjects'
import './MoreInfo.css'

const MoreInfo = () => {
  return (
    <section className="more-info-layer">
      <AboutMe />
      <Education />
      <MoreProjects />
    </section>
  )
}

export default MoreInfo
