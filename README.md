# Laboratorio 4 — API REST de Videojuegos

Laboratorio #4 del curso Sistemas y Tecnologías Web — Universidad del Valle de Guatemala.

## Descripción

Este proyecto contiene dos partes:

- **Parte 1:** Depuración de un servidor HTTP nativo con errores intencionales.
- **Parte 2:** API REST completa construida con Node.js y Express para gestionar una colección de videojuegos.

## Estructura del proyecto

```
Lab 4/
├── servidor-malo.js        ← Servidor original con errores (sin modificar)
├── servidor-corregido.js   ← Servidor con los errores corregidos
├── datos.json              ← Datos usados por el servidor HTTP nativo
├── api/
│   └── index.js            ← API REST con Express (Parte 2)
├── package.json
├── SOLUCION.md             ← Documentación de errores corregidos (Parte 1)
├── PRUEBAS.md              ← Evidencia de pruebas con Postman
├── screenshots/            ← Capturas de pantalla de las pruebas
└── README.md
```

## Tecnologías

- Node.js
- Express
- ES Modules (`import/export`)

## Instalación

```bash
npm install
```

## Ejecución

**Servidor corregido (Parte 1):**
```bash
node servidor-corregido.js
```

**API con Express (Parte 2):**
```bash
node api/index.js
```

El servidor corre en `http://localhost:3000`.

## Recurso: Videojuegos

Cada videojuego tiene las siguientes propiedades:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador único (UUID) |
| `titulo` | string | Nombre del videojuego |
| `plataforma` | string | Plataforma (PS5, PC, Xbox, etc.) |
| `genero` | string | Género del juego |
| `precio` | number | Precio en dólares |
| `rating` | number | Calificación del 1 al 10 |
| `logros_disponibles` | number | Cantidad de logros disponibles |

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Documentación HTML |
| GET | `/info` | Información de la API |
| GET | `/saludo` | Saludo personalizado |
| GET | `/api/status` | Estado del servidor |
| GET | `/api/videojuegos` | Obtener todos los videojuegos |
| GET | `/api/videojuegos?genero=RPG` | Filtrar por género |
| GET | `/api/videojuegos/:id` | Obtener un videojuego por ID |
| POST | `/api/videojuegos` | Crear un nuevo videojuego |
| PUT | `/api/videojuegos/:id` | Reemplazar un videojuego completo |
| PATCH | `/api/videojuegos/:id` | Actualizar campos de un videojuego |
| DELETE | `/api/videojuegos/:id` | Eliminar un videojuego |

## Formato de respuestas

**Éxito:**
```json
{ "ok": true, "data": [ ... ] }
```

**Error:**
```json
{ "ok": false, "error": "Mensaje descriptivo" }
```
