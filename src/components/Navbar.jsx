import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav
      style={{
        padding: '1rem',
        background: '#1a1a1a',
        color: '#fff',
        display: 'flex',
        gap: '1rem',
      }}
    >
      <strong>Galería MUSA</strong>
      <NavLink to="/" style={{ color: '#fff' }}>
        Inicio
      </NavLink>
      <NavLink to="/portafolio" style={{ color: '#fff' }}>
        Obras
      </NavLink>
      <NavLink to="/nosotros" style={{ color: '#fff' }}>
        Nosotros
      </NavLink>
      <NavLink to="/contacto" style={{ color: '#fff' }}>
        Contacto
      </NavLink>
    </nav>
  );
}
