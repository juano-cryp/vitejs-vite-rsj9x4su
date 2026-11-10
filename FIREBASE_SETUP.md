# Configuración de Firebase para Galería MUSA

El frontend está conectado al proyecto Firebase `musa-456e7`.

## 1. Activar servicios
En Firebase Console, abre el proyecto y activa:
- **Authentication** → Sign-in method → Email/Password.
- **Firestore Database** → Create database.
- **Storage** → Get started.

## 2. Crear la cuenta administradora
1. En Authentication → Users → Add user, crea la cuenta del administrador con correo y contraseña.
2. Copia el **UID** que Firebase asigna a esa cuenta.
3. En Firestore, crea la colección `usuarios`.
4. Crea un documento cuyo ID sea exactamente ese UID.
5. Añade estos campos:
   - `nombre` (string): nombre del administrador.
   - `rol` (string): `admin`.

No basta con registrarse en la pantalla: el usuario debe existir en Authentication y tener el documento `usuarios/{UID}` con `rol: "admin"`.

## 3. Publicar reglas
Copia el contenido de `firestore.rules` en Firestore Database → Rules y pulsa Publish.
Copia el contenido de `storage.rules` en Storage → Rules y pulsa Publish.

Las obras son públicas para lectura, pero solo usuarios autenticados cuyo documento de perfil tenga rol `admin` pueden crear, modificar o eliminar obras. Las fotografías se guardan en la carpeta `obras/` del bucket.

## 4. Instalar y ejecutar
Desde la terminal, en la carpeta del proyecto:

```bash
npm install
npm run dev
```

Se usa `npm install` para actualizar también `package-lock.json` con Firebase y React Router. Luego prueba la ruta `/login`, inicia sesión con la cuenta administradora y abre `/admin`.

Para compilar:

```bash
npm run build
```

## Estructura de Firestore
- `obras/{id}`: titulo, artista, tecnica, categoria, precio, descripcion, imagen, imagenPath, creadoEn y actualizadoEn.
- `usuarios/{uid}`: nombre y rol.

Los precios del catálogo se muestran en COP. Las obras antiguas de la API de The Met y los precios aleatorios dejan de alimentar el catálogo; debes crear las obras reales desde el panel de administración.
