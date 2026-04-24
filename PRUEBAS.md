# Pruebas con Postman — API de Videojuegos

Todas las pruebas se realizaron con el servidor corriendo en `http://localhost:3000`.

---

## GET /

**Descripción:** Retorna la documentación HTML de todos los endpoints.

**Captura:** `screenshots/GET-raiz.png`

---

## GET /info

**Descripción:** Retorna información general de la API en formato JSON.

**Respuesta esperada:**
```json
{
  "mensaje": "API REST de Videojuegos",
  "curso": "Sistemas y Tecnologías Web",
  "tecnologia": "Node.js + Express",
  "version": "1.0.0"
}
```

**Captura:** `screenshots/GET-info.png`

---

## GET /saludo

**Descripción:** Retorna un saludo en texto plano.

**Respuesta esperada:**
```
¡Bienvenido a la API de Videojuegos!
```

**Captura:** `screenshots/GET-saludo.png`

---

## GET /api/status

**Descripción:** Retorna el estado actual del servidor.

**Respuesta esperada:**
```json
{
  "ok": true,
  "status": "activo",
  "puerto": 3000,
  "timestamp": "2026-04-24T21:00:00.000Z"
}
```

**Captura:** `screenshots/GET-api-status.png`

---

## GET /api/videojuegos

**Descripción:** Retorna todos los videojuegos registrados.

**Respuesta esperada:**
```json
{
  "ok": true,
  "data": [ ... ]
}
```

**Captura:** `screenshots/GET-videojuegos.png`

---

## GET /api/videojuegos?genero=RPG

**Descripción:** Filtra videojuegos por género usando query parameter.

**Respuesta esperada:**
```json
{
  "ok": true,
  "data": [
    {
      "id": "...",
      "titulo": "Elden Ring",
      "plataforma": "PC",
      "genero": "RPG",
      "precio": 59.99,
      "rating": 9.4,
      "logros_disponibles": 42
    }
  ]
}
```

**Captura:** `screenshots/GET-videojuegos-filtro.png`

---

## GET /api/videojuegos/:id

**Descripción:** Retorna un videojuego por su ID único.

**Respuesta esperada (encontrado):**
```json
{
  "ok": true,
  "data": { ... }
}
```

**Respuesta esperada (no encontrado):**
```json
{
  "ok": false,
  "error": "Videojuego no encontrado"
}
```

**Captura:** `screenshots/GET-videojuego-id.png`

---

## POST /api/videojuegos

**Descripción:** Crea un nuevo videojuego. Requiere todos los campos obligatorios.

**Body enviado:**
```json
{
  "titulo": "Minecraft",
  "plataforma": "PC",
  "genero": "survival",
  "precio": 26.99,
  "rating": 9.0,
  "logros_disponibles": 98
}
```

**Respuesta esperada (201):**
```json
{
  "ok": true,
  "data": {
    "id": "...",
    "titulo": "Minecraft",
    ...
  }
}
```

**Respuesta esperada si faltan campos (400):**
```json
{
  "ok": false,
  "error": "Faltan los siguientes campos obligatorios: precio, rating"
}
```

**Captura:** `screenshots/POST-videojuego.png`

---

## PUT /api/videojuegos/:id

**Descripción:** Reemplaza completamente un videojuego existente. Requiere todos los campos.

**Body enviado:**
```json
{
  "titulo": "Minecraft (Edición Java)",
  "plataforma": "PC",
  "genero": "survival",
  "precio": 29.99,
  "rating": 9.2,
  "logros_disponibles": 100
}
```

**Respuesta esperada (200):**
```json
{
  "ok": true,
  "data": { ... }
}
```

**Captura:** `screenshots/PUT-videojuego.png`

---

## PATCH /api/videojuegos/:id

**Descripción:** Actualiza solo los campos enviados en el body.

**Body enviado:**
```json
{
  "precio": 19.99
}
```

**Respuesta esperada (200):**
```json
{
  "ok": true,
  "data": { ... }
}
```

**Captura:** `screenshots/PATCH-videojuego.png`

---

## DELETE /api/videojuegos/:id

**Descripción:** Elimina un videojuego por su ID.

**Respuesta esperada (200):**
```json
{
  "ok": true,
  "data": { ... }
}
```

**Captura:** `screenshots/DELETE-videojuego.png`

---

## Ruta no encontrada (404)

**Descripción:** Cualquier ruta que no exista retorna un error 404 con información de la ruta intentada.

**Respuesta esperada:**
```json
{
  "error": "Ruta no encontrada",
  "ruta": "/ruta-inexistente",
  "metodo": "GET",
  "sugerencia": "Visita / para ver los endpoints disponibles"
}
```

**Captura:** `screenshots/404.png`
