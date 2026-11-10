import {
  addDoc, collection, deleteDoc, doc, getDoc, getDocs,
  orderBy, query, serverTimestamp, updateDoc
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../firebase';

const obrasRef = collection(db, 'obras');

export async function obtenerObras() {
  const q = query(obrasRef, orderBy('creadoEn', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function obtenerObra(id) {
  const snapshot = await getDoc(doc(db, 'obras', id));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

export async function guardarObra(datos, archivo, obraId = null) {
  let imagen = datos.imagen || '';
  let imagenPath = datos.imagenPath || '';

  if (archivo) {
    const extension = archivo.name.split('.').pop()?.toLowerCase() || 'jpg';
    imagenPath = `obras/${crypto.randomUUID()}.${extension}`;
    const imageRef = ref(storage, imagenPath);
    await uploadBytes(imageRef, archivo, { contentType: archivo.type });
    imagen = await getDownloadURL(imageRef);
  }

  const payload = {
    titulo: datos.titulo.trim(),
    artista: datos.artista.trim(),
    tecnica: datos.tecnica.trim(),
    categoria: datos.categoria.trim(),
    precio: Number(datos.precio) || 0,
    descripcion: datos.descripcion.trim(),
    imagen,
    imagenPath,
    actualizadoEn: serverTimestamp()
  };

  if (obraId) {
    await updateDoc(doc(db, 'obras', obraId), payload);
    return obraId;
  }
  const created = await addDoc(obrasRef, { ...payload, creadoEn: serverTimestamp() });
  return created.id;
}

export async function eliminarObra(obra) {
  await deleteDoc(doc(db, 'obras', obra.id));
  if (obra.imagenPath) {
    try { await deleteObject(ref(storage, obra.imagenPath)); } catch (error) {
      console.warn('No se pudo borrar el archivo de imagen:', error);
    }
  }
}
