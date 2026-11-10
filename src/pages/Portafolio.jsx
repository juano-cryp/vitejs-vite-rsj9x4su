import { useEffect, useState } from 'react';
import ObraCard from '../components/ObraCard';
import { obtenerObras } from '../services/obrasService';

export default function Portafolio() {
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    obtenerObras().then(setObras).catch(() => setError('No fue posible cargar la colección. Intenta nuevamente.')).finally(() => setLoading(false));
  }, []);
  if (loading) return <main className="estado-carga">Cargando colección MUSA…</main>;
  if (error) return <main className="estado-carga">{error}</main>;
  return <main className="contenedor-galeria">
    <header className="catalogo-header"><p className="eyebrow">COLECCIÓN MUSA</p><h1>Obras de arte</h1><p>Descubre piezas seleccionadas de nuestra colección.</p></header>
    {obras.length === 0 ? <p className="estado-carga">Aún no hay obras publicadas. Vuelve pronto.</p> :
      <div className="grid-obras">{obras.map(obra => <ObraCard key={obra.id} obra={obra}/>)}</div>}
  </main>;
}
