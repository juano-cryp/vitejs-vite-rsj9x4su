import { useEffect, useState } from 'react';
import { eliminarObra, guardarObra, obtenerObras } from '../services/obrasService';

const VACIA = { titulo: '', artista: '', tecnica: '', categoria: '', precio: '', descripcion: '' };

export default function Admin() {
  const [obras, setObras] = useState([]);
  const [form, setForm] = useState(VACIA);
  const [archivo, setArchivo] = useState(null);
  const [editando, setEditando] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  async function cargar() {
    setCargando(true);
    try { setObras(await obtenerObras()); }
    catch (e) { setError('No fue posible consultar Firestore. Revisa la configuración y las reglas.'); }
    finally { setCargando(false); }
  }

  useEffect(() => { cargar(); }, []);

  function editar(obra) {
    setEditando(obra.id);
    setForm({ ...VACIA, ...obra });
    setArchivo(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function enviar(e) {
    e.preventDefault();
    setError('');
    setGuardando(true);
    try {
      await guardarObra(form, archivo, editando);
      setForm(VACIA); setArchivo(null); setEditando(null);
      await cargar();
    } catch (e) { setError(e.message || 'No se pudo guardar la obra.'); }
    finally { setGuardando(false); }
  }

  async function borrar(obra) {
    if (!window.confirm(`¿Eliminar "${obra.titulo}" del catálogo?`)) return;
    try { await eliminarObra(obra); await cargar(); }
    catch (e) { setError('No se pudo eliminar la obra.'); }
  }

  return <main className="admin-page">
    <header><p className="eyebrow">PANEL PRIVADO</p><h1>Administrar colección</h1><p>Agrega, edita o retira obras del catálogo de MUSA.</p></header>
    <form className="admin-form" onSubmit={enviar}>
      <h2>{editando ? 'Editar obra' : 'Registrar nueva obra'}</h2>
      <div className="admin-fields">
        <label>Título<input required value={form.titulo} onChange={e => setForm({...form,titulo:e.target.value})}/></label>
        <label>Artista<input required value={form.artista} onChange={e => setForm({...form,artista:e.target.value})}/></label>
        <label>Técnica<input value={form.tecnica} onChange={e => setForm({...form,tecnica:e.target.value})}/></label>
        <label>Categoría<input value={form.categoria} onChange={e => setForm({...form,categoria:e.target.value})}/></label>
        <label>Precio (COP)<input type="number" min="0" value={form.precio} onChange={e => setForm({...form,precio:e.target.value})}/></label>
        <label>Fotografía<input type="file" accept="image/*" onChange={e => setArchivo(e.target.files?.[0] || null)}/></label>
        <label className="campo-completo">Descripción<textarea rows="4" value={form.descripcion} onChange={e => setForm({...form,descripcion:e.target.value})}/></label>
      </div>
      {error && <p role="alert" className="error-text">{error}</p>}
      <div className="admin-actions"><button className="btn-detalle" disabled={guardando}>{guardando ? 'Guardando…' : editando ? 'Actualizar obra' : 'Guardar obra'}</button>
        {editando && <button type="button" onClick={() => {setEditando(null);setForm(VACIA);setArchivo(null);}}>Cancelar</button>}</div>
    </form>
    <section className="admin-list"><h2>Obras registradas ({obras.length})</h2>
      {cargando ? <p>Cargando colección…</p> : obras.length === 0 ? <p>Aún no hay obras guardadas en Firestore.</p> : obras.map(obra =>
        <article className="admin-row" key={obra.id}>
          {obra.imagen && <img src={obra.imagen} alt={obra.titulo}/>}
          <div><strong>{obra.titulo}</strong><p>{obra.artista} · {obra.categoria || 'Sin categoría'}</p></div>
          <button type="button" onClick={() => editar(obra)}>Editar</button>
          <button type="button" onClick={() => borrar(obra)}>Eliminar</button>
        </article>)}
    </section>
  </main>;
}
