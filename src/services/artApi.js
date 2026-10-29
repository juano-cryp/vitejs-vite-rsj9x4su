// src/services/artApi.js
export async function obtenerObrasAPI(signal) {
  // IDs de obras del museo The Met
  const idsFamosos = [436535, 436524, 436532, 436528, 436530, 436529];

  const promesas = idsFamosos.map((id) =>
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
      { signal }
    ).then((res) => res.json())
  );

  const resultados = await Promise.all(promesas);

  return resultados.map((obra) => ({
    id: obra.objectID.toString(),
    titulo: obra.title || 'Sin título',
    artista: obra.artistDisplayName || 'Artista desconocido',
    tecnica: obra.medium || 'Óleo sobre lienzo',
    precio: Math.floor(Math.random() * 50000) + 10000, // Precio simulado para la tienda
    imagen: obra.primaryImageSmall || 'https://picsum.photos/600/400',
    descripcion: `Obra expuesta en ${
      obra.department || 'Galería Principal'
    }. Fecha: ${obra.objectDate || 'Desconocida'}.`,
  }));
}
