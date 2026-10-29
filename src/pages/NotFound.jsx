import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main style={{ padding: '3rem', textAlign: 'center' }}>
      <h1>404 - Ruta no encontrada</h1>
      <p>La sala o página que intentas visitar no existe en nuestra galería.</p>
      <Link to="/">Volver al Inicio</Link>
    </main>
  );
}
