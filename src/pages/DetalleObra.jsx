import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { obtenerObra } from '../services/obrasService';

export default function DetalleObra() {
  const { id } = useParams();
  const [obra, setObra] = useState(null);
  const [cargando, setCargando] = useState(true);
  useEffect(() => { obtenerObra(id).then(setObra).finally(() => setCargando(false)); }, [id]);
  if (cargando) return <main className="estado-carga">Cargando obra…</main>;
  if (!obra) return <main className="estado-carga"><h2>Obra no encontrada</h2><Link to="/portafolio">Volver al catálogo</Link></main>;
  return <main className="detalle-obra">
    <div>{obra.imagen && <img src={obra.imagen} alt={obra.titulo}/>}</div>
    <section><p className="eyebrow">{obra.categoria || 'COLECCIÓN MUSA'}</p><h1>{obra.titulo}</h1>
      <h3>{obra.artista}</h3><p><strong>Técnica:</strong> {obra.tecnica || 'No especificada'}</p>
      <p>{obra.descripcion}</p><p className="precio">{Number(obra.precio || 0).toLocaleString('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0})}</p>
      <Link to="/portafolio" className="btn-detalle">Volver a las obras</Link></section>
  </main>;
}
