import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ObraCard({ obra }) {
  const [visible,setVisible] = useState(false);
  const ref = useRef(null);
  const { agregarAlCarrito } = useApp();
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if(entry.isIntersecting){setVisible(true);observer.disconnect();} },{threshold:.12});
    if(ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  },[]);
  return <article ref={ref} className={`obra-card ${visible?'visible':''}`}>
    <Link to={`/portafolio/${obra.id}`} className="obra-imagen-container">
      {obra.imagen ? <img src={obra.imagen} alt={obra.titulo} loading="lazy"/> : <div className="imagen-vacia">MUSA</div>}
    </Link>
    <div className="obra-info"><p className="eyebrow">{obra.categoria || 'OBRA DE ARTE'}</p><h3>{obra.titulo}</h3>
      <p><strong>Artista:</strong> {obra.artista}</p>
      <p className="precio">{Number(obra.precio||0).toLocaleString('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0})}</p>
      <div className="obra-card-actions"><Link to={`/portafolio/${obra.id}`} className="btn-detalle">Ver obra</Link><button type="button" onClick={()=>agregarAlCarrito(obra)}>Añadir</button></div>
    </div>
  </article>;
}
