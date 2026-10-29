import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ObraCard({ obra }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        // vista
        if (rect.top < window.innerHeight * 0.88) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // FUNCIÓN DE LIMPIEZA
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className={`obra-card ${isVisible ? 'visible' : ''}`}
    >
      <div className="obra-imagen-container">
        <img src={obra.imagen} alt={obra.titulo} loading="lazy" />
      </div>
      <div className="obra-info">
        <h3>{obra.titulo}</h3>
        <p>
          <strong>Artista:</strong> {obra.artista}
        </p>
        <p className="precio">${obra.precio.toLocaleString()} USD</p>
        <Link to={`/portafolio/${obra.id}`} className="btn-detalle">
          Ver Detalles y Curaduría
        </Link>
      </div>
    </article>
  );
}
