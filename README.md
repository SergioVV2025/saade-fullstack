# Saade

Aplicación full stack para Saade, un restaurante ubicado en Silver Lake, Los Angeles.

## Demo

Frontend:  
https://sergiovv2026.paranormalgroup.com

API:  
https://api.sergiovv2026.paranormalgroup.com

## Funcionalidades

- Navegación entre las distintas secciones del restaurante.
- Diseño responsive desde 320 px.
- Menú e información sobre Saade.
- Formulario de reservaciones con validación del lado del cliente.
- Creación y almacenamiento de reservaciones mediante una API propia.
- Confirmación de reservaciones mediante una ventana modal.
- Búsqueda de eventos en Los Angeles mediante Ticketmaster Discovery API.
- Estados de carga, error y resultados vacíos.
- Visualización inicial de tres eventos y botón "Mostrar más".

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
- JWT
- bcrypt

### Deploy

- Google Cloud Compute Engine
- Nginx
- PM2
- Certbot / Let's Encrypt
- FreeDNS

## Estructura

```text
Sprint20/
├── backend/
├── frontend/
├── .gitignore
├── package.json
└── README.md
```

## Variables de entorno

Las variables de entorno no se incluyen en el repositorio.

### Frontend

```env
VITE_TICKETMASTER_API_KEY=
VITE_API_BASE_URL=
```

### Backend

```env
PORT=
MONGO_URL=
JWT_SECRET=
```

## Ejecución local

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

## Build de producción

```bash
cd frontend
npm run build
```

## Autor

Sergio Verastegui
