import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AppContext = createContext(null);
export function AppProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => onAuthStateChanged(auth, async (user) => {
    if (!user) { setUsuario(null); setCargandoUsuario(false); return; }
    try {
      const perfil = await getDoc(doc(db, 'usuarios', user.uid));
      setUsuario({ uid: user.uid, email: user.email, nombre: perfil.data()?.nombre || user.email, rol: perfil.data()?.rol || 'usuario' });
    } catch (error) { console.error(error); setUsuario({ uid: user.uid, email: user.email, rol: 'usuario' }); }
    finally { setCargandoUsuario(false); }
  }), []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);
  const agregarAlCarrito = (obra) => setCarrito(prev => prev.some(item => item.id === obra.id) ? prev : [...prev, obra]);
  const eliminarDelCarrito = (id) => setCarrito(prev => prev.filter(item => item.id !== id));
  const vaciarCarrito = () => setCarrito([]);
  return <AppContext.Provider value={{ usuario, cargandoUsuario, login, logout, carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }}>{children}</AppContext.Provider>;
}
export const useApp = () => useContext(AppContext);
