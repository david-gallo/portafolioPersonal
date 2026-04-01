import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import './Contact.css'

const WEB3FORMS_KEY = 'cd1fb94a-9601-4591-b693-3310864d9f55'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contact-layer">
      <h2>Contacto</h2>
      <p className="contact__subtitle">
        ¿Tenés un proyecto o una oportunidad? Escribime.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form__field">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            autoComplete="name"
          />
        </div>

        <div className="contact-form__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            autoComplete="email"
          />
        </div>

        <div className="contact-form__field">
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            value={form.message}
            onChange={handleChange}
            placeholder="Contame en qué puedo ayudarte..."
          />
        </div>

        <button
          type="submit"
          className="contact-form__btn"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
        </button>

        {status === 'success' && (
          <p className="contact-form__msg contact-form__msg--ok">
            ¡Mensaje enviado! Te respondo pronto.
          </p>
        )}
        {status === 'error' && (
          <p className="contact-form__msg contact-form__msg--err">
            Hubo un error. Intentá de nuevo o escribime por GitHub.
          </p>
        )}
      </form>

      <a
        href="https://github.com/david-gallo"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-github-link"
      >
        <FaGithub />
        GitHub
      </a>

      <footer className="footer">© 2026 David Gallo</footer>
    </section>
  )
}

export default Contact
