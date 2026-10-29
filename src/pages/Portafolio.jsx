import { useState, useEffect } from 'react';
import { obtenerObrasAPI } from '../services/artApi';
import ObraCard from '../components/ObraCard';

export default function Portafolio() {
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // Manejador para cancelar la petición

    obtenerObrasAPI(controller.signal)
      .then((data) => {
        setObras(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError('Error al conectar con la API de arte');
          setLoading(false);
        }
      });

    // Cancela la petición si el usuario cambia de pestaña
    return () => controller.abort();
  }, []);

  if (loading)
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        Cargando Galería desde The Met API...
      </div>
    );
  if (error)
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#ef4444' }}>
        {error}
      </div>
    );
  if (obras.length === 0)
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        No hay obras disponibles.
      </div>
    );

  return (
    <main className="contenedor-galeria">
      <div className="grid-obras">
        {obras.map((obra) => (
          <ObraCard key={obra.id} obra={obra} />
        ))}
      </div>
    </main>
  );
}
