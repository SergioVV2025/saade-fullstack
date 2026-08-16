# Saade

Aplicación web para Saade, un restaurante ubicado en Silver Lake, Los Angeles.

## Funcionalidades

- Navegación entre las distintas secciones del restaurante.
- Menú gastronómico.
- Información sobre Saade.
- Formulario de reservaciones con validación del lado del cliente.
- Creación de reservaciones mediante una API propia.
- Confirmación de reservaciones mediante una ventana modal.
- Búsqueda de eventos en Los Angeles mediante Ticketmaster Discovery API.
- Diseño responsive desde 320 px.

## Tecnologías

### Frontend

- React
- Vite
- React Router
- JavaScript
- HTML5 / JSX
- CSS
- BEM
- Fetch API
- Ticketmaster Discovery API

### Backend

- Node.js
- Express
- MongoDB
- Mongoose

## Estructura del proyecto

    Sprint20/
    ├── backend/
    ├── frontend/
    ├── .gitignore
    ├── package.json
    └── README.md

## Variables de entorno

El proyecto utiliza variables de entorno que no se incluyen en el repositorio.

Frontend:

    VITE_TICKETMASTER_API_KEY=
    VITE_API_BASE_URL=

## Ejecución local

Instalar las dependencias:

    npm install

Ejecutar el frontend:

    cd frontend
    npm run dev

Ejecutar el backend:

    cd backend
    npm run dev

## Build de producción

    cd frontend
    npm run build

## Autor

Sergio Verastegui
