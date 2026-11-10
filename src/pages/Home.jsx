import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerObras } from '../services/obrasService';
import ObraCard from '../components/ObraCard';

export default function Home() {
  const [obras, setObras] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerObras()
      .then((lista) => setObras(Array.isArray(lista) ? lista.slice(0, 4) : []))
      .catch((error) => console.error('No fue posible cargar las obras destacadas:', error))
      .finally(() => setCargando(false));
  }, []);

  return (
    <main className="musa-home">
      <section className="hero-musa">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-kicker">ARTE QUE INSPIRA, OBRAS QUE PERDURAN</p>
          <h1>Galería <span>MUSA</span></h1>
          <p className="hero-description">Descubre una selección de obras de arte para tu espacio, tu colección y tus sueños.</p>
          <Link to="/portafolio" className="btn-principal">Explorar catálogo <span aria-hidden="true">→</span></Link>
          <div className="hero-note"><span /> Una experiencia para amantes del arte</div>
        </div>
        <div className="hero-index"><span>01</span><i /> 03</div>
      </section>

      <section className="beneficios-musa" aria-label="Beneficios">
        <div><span className="beneficio-icon">◇</span><p><strong>Obras seleccionadas</strong><small>Arte para descubrir</small></p></div>
        <div><span className="beneficio-icon">⌁</span><p><strong>Atención cercana</strong><small>Te acompañamos</small></p></div>
        <div><span className="beneficio-icon">♡</span><p><strong>Compra con confianza</strong><small>Atención personalizada</small></p></div>
        <div><span className="beneficio-icon">✧</span><p><strong>Arte en cada detalle</strong><small>Inspiración para tus espacios</small></p></div>
      </section>

      <section className="obras-destacadas">
        <div className="seccion-heading">
          <div><p className="eyebrow">UNA SELECCIÓN PARA TI</p><h2>Nuestras obras</h2><p className="seccion-subtitulo">Piezas que cuentan historias y despiertan emociones.</p></div>
          <Link to="/portafolio" className="btn-secundario">Ver catálogo <span aria-hidden="true">→</span></Link>
        </div>
        {cargando ? <p className="estado-carga">Preparando nuestra colección…</p> :
          obras.length > 0 ? <div className="grid-obras">{obras.map((obra) => <ObraCard key={obra.id} obra={obra} />)}</div> :
          <div className="home-vacio"><span>✧</span><h3>Estamos preparando la colección</h3><p>Muy pronto encontrarás aquí obras seleccionadas por MUSA.</p><Link to="/portafolio">Conocer el catálogo</Link></div>}
      </section>

      <section className="cierre-musa">
        <div><p className="eyebrow">GALERÍA MUSA</p><h2>El arte transforma los espacios.</h2><p>Encuentra esa obra especial que conecta contigo.</p></div>
        <Link to="/portafolio" className="btn-principal">Descubrir obras <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
