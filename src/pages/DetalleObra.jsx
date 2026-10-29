import { useParams, Link } from 'react-router-dom';
import { OBRAS } from '../data/obras';

export default function DetalleObra() {
  const { id } = useParams();
  const obra = OBRAS.find((o) => o.id === id);

  if (!obra) {
    return (
      <main style={{ padding: '2rem' }}>
        <h2>Obra no encontrada</h2>
        <Link to="/portafolio">Volver al catálogo</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{obra.titulo}</h1>
      <img
        src={obra.imagen}
        alt={obra.titulo}
        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
      />
      <h3>Artista: {obra.artista}</h3>
      <p>
        <strong>Técnica:</strong> {obra.tecnica}
      </p>
      <p>
        <strong>Precio:</strong> ${obra.precio.toLocaleString()} USD
      </p>
      <p>{obra.descripcion}</p>
      <Link to="/portafolio">← Volver al catálogo</Link>
    </main>
  );
}
