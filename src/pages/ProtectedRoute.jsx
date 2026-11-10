import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ProtectedRoute({ children }) {
  const { usuario, cargandoUsuario } = useApp();
  if (cargandoUsuario) return <main className="estado-carga">Verificando acceso…</main>;
  if (!usuario) return <Navigate to="/login" replace />;
  if (usuario.rol !== 'admin') return <main className="estado-carga">Tu cuenta no tiene permisos de administrador.</main>;
  return children;
}
