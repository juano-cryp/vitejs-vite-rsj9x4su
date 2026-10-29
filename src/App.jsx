import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portafolio from './pages/Portafolio';
import DetalleObra from './pages/DetalleObra';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';

// 1. Importar las nuevas vistas
import Login from './pages/Login';
import Carrito from './pages/Carrito';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portafolio" element={<Portafolio />} />
        <Route path="/portafolio/:id" element={<DetalleObra />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />

        {/* 2. Agregar las nuevas rutas aquí */}
        <Route path="/login" element={<Login />} />
        <Route path="/carrito" element={<Carrito />} />

        {/* La ruta comodín (*) siempre debe quedar al final */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
