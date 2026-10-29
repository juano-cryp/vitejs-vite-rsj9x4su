import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export default function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito, usuario } = useApp();

  const total = carrito.reduce((acc, obra) => acc + obra.precio, 0);

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Carrito de Adquisiciones</h1>
      {usuario && (
        <p>
          Comprador: <strong>{usuario.nombre}</strong> ({usuario.email})
        </p>
      )}

      {carrito.length === 0 ? (
        <div>
          <p>El carrito está vacío.</p>
          <Link to="/portafolio" className="btn-detalle">
            Explorar Obras
          </Link>
        </div>
      ) : (
        <div>
          {carrito.map((obra) => (
            <div
              key={obra.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 0',
                borderBottom: '1px solid #334155',
              }}
            >
              <div>
                <h3>{obra.titulo}</h3>
                <p>Por: {obra.artista}</p>
              </div>
              <div>
                <span>${obra.precio.toLocaleString()} USD </span>
                <button
                  onClick={() => eliminarDelCarrito(obra.id)}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
          <h2 style={{ textAlign: 'right', marginTop: '1.5rem' }}>
            Total: ${total.toLocaleString()} USD
          </h2>
          <button
            onClick={() => {
              alert('¡Adquisición procesada con éxito!');
              vaciarCarrito();
            }}
            className="btn-detalle"
            style={{ width: '100%', marginTop: '1rem' }}
          >
            Finalizar Compra
          </button>
        </div>
      )}
    </main>
  );
}
