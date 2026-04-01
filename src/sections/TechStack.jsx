import { SiHtml5, SiJavascript, SiNodedotjs, SiDocker, SiMongodb, SiReact } from 'react-icons/si'
import TechnologyCard from '../components/TechnologyCard'
import './TechStack.css'

const technologies = [
  { icon: SiHtml5, title: 'HTML5' },
  { icon: SiJavascript, title: 'JavaScript' },
  { icon: SiNodedotjs, title: 'Node.js' },
  { icon: SiDocker, title: 'Docker' },
  { icon: SiMongodb, title: 'MongoDB' },
  { icon: SiReact, title: 'React' },
]

const TechStack = () => {
  return (
    <section className="tech-stack">
      <div className="tech-list">
        {technologies.map(({ icon, title }) => (
          <TechnologyCard key={title} icon={icon} title={title} />
        ))}
      </div>
    </section>
  )
}

export default TechStack
