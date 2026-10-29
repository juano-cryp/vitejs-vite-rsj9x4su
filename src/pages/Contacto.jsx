import { useState } from 'react';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Contacto y Adquisiciones</h1>
      {enviado ? (
        <p style={{ color: 'green' }}>
          ¡Gracias por su mensaje! Nos pondremos en contacto pronto.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <input
            type="text"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Mensaje o consulta sobre alguna obra"
            value={formData.mensaje}
            onChange={(e) =>
              setFormData({ ...formData, mensaje: e.target.value })
            }
            required
          />
          <button type="submit">Enviar Mensaje</button>
        </form>
      )}
    </main>
  );
}
