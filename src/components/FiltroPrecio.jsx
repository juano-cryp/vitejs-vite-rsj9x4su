export default function FiltroPrecio({ precioMaximo, onCambiarPrecio }) {
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene la recarga de página
  };

  return (
    <form onSubmit={handleSubmit} className="filtro-precio-form">
      <label htmlFor="precio">Filtrar por Presupuesto Máximo (USD):</label>
      <input
        id="precio"
        type="number"
        min="0"
        value={precioMaximo}
        onChange={(e) => onCambiarPrecio(e.target.value)}
        placeholder="Ej: 5000"
      />
    </form>
  );
}
