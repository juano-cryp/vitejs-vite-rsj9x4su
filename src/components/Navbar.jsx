import { NavLink, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { usuario, logout } = useApp();
  return (
    <nav className="musa-nav">
      <Link className="musa-brand" to="/" aria-label="Galería MUSA, inicio">
        <span>MUSA<small>Galería de Arte</small></span>
      </Link>
      <div className="musa-links">
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/portafolio">Catálogo</NavLink>
        <NavLink to="/nosotros">Nosotros</NavLink>
        <NavLink to="/contacto">Contacto</NavLink>
        <NavLink to="/carrito">Carrito</NavLink>
        {usuario?.rol === 'admin' ? <><NavLink to="/admin">Administrar</NavLink><button className="nav-logout" onClick={logout}>Salir</button></> : <NavLink to="/login">Iniciar sesión</NavLink>}
      </div>
    </nav>
  );
}
