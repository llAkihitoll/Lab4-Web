import express from "express"
import { randomUUID } from "crypto"

const app = express()
const PORT = 8080
app.use(express.json())

let videojuegos = [
  {
    id: randomUUID(),
    titulo: "The Legend of Zelda: Breath of the Wild",
    plataforma: "Nintendo Switch",
    genero: "aventura",
    precio: 59.99,
    rating: 9.8,
    logros_disponibles: 120
  },
  {
    id: randomUUID(),
    titulo: "God of War",
    plataforma: "PS5",
    genero: "accion",
    precio: 49.99,
    rating: 9.5,
    logros_disponibles: 36
  },
  {
    id: randomUUID(),
    titulo: "Elden Ring",
    plataforma: "PC",
    genero: "RPG",
    precio: 59.99,
    rating: 9.4,
    logros_disponibles: 42
  },
  {
    id: randomUUID(),
    titulo: "FIFA 24",
    plataforma: "PS5",
    genero: "deportes",
    precio: 39.99,
    rating: 7.2,
    logros_disponibles: 55
  }
]

const CAMPOS_OBLIGATORIOS = ["titulo", "plataforma", "genero", "precio", "rating", "logros_disponibles"]

// GET / — documentación HTML
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html")
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8"><title>API Videojuegos</title></head>
    <body>
      <h1>API de Videojuegos</h1>
      <h2>Endpoints disponibles</h2>
      <table border="1" cellpadding="8">
        <tr><th>Método</th><th>Ruta</th><th>Descripción</th></tr>
        <tr><td>GET</td><td>/</td><td>Esta documentación</td></tr>
        <tr><td>GET</td><td>/info</td><td>Información de la API</td></tr>
        <tr><td>GET</td><td>/saludo</td><td>Saludo personalizado</td></tr>
        <tr><td>GET</td><td>/api/status</td><td>Estado del servidor</td></tr>
        <tr><td>GET</td><td>/api/videojuegos</td><td>Obtener todos los videojuegos (filtro: ?genero=)</td></tr>
        <tr><td>GET</td><td>/api/videojuegos/:id</td><td>Obtener un videojuego por ID</td></tr>
        <tr><td>POST</td><td>/api/videojuegos</td><td>Crear un nuevo videojuego</td></tr>
        <tr><td>PUT</td><td>/api/videojuegos/:id</td><td>Reemplazar un videojuego completo</td></tr>
        <tr><td>PATCH</td><td>/api/videojuegos/:id</td><td>Actualizar campos de un videojuego</td></tr>
        <tr><td>DELETE</td><td>/api/videojuegos/:id</td><td>Eliminar un videojuego</td></tr>
      </table>
    </body>
    </html>
  `)
})

// GET /info
app.get("/info", (req, res) => {
  res.status(200).json({
    mensaje: "API REST de Videojuegos",
    curso: "Sistemas y Tecnologías Web",
    tecnologia: "Node.js + Express",
    version: "1.0.0"
  })
})

// GET /saludo
app.get("/saludo", (req, res) => {
  res.status(200).send("¡Bienvenido a la API de Videojuegos!")
})

// GET /api/status
app.get("/api/status", (req, res) => {
  res.status(200).json({
    ok: true,
    status: "activo",
    puerto: PORT,
    timestamp: new Date().toISOString()
  })
})

// GET /api/videojuegos — todos, con filtro opcional por genero
app.get("/api/videojuegos", (req, res) => {
  const { genero } = req.query

  if (genero) {
    const filtrados = videojuegos.filter(
      (v) => v.genero.toLowerCase() === genero.toLowerCase()
    )
    return res.status(200).json({ ok: true, data: filtrados })
  }

  res.status(200).json({ ok: true, data: videojuegos })
})

// GET /api/videojuegos/:id
app.get("/api/videojuegos/:id", (req, res) => {
  const juego = videojuegos.find((v) => v.id === req.params.id)

  if (!juego) {
    return res.status(404).json({ ok: false, error: "Videojuego no encontrado" })
  }

  res.status(200).json({ ok: true, data: juego })
})

// POST /api/videojuegos
app.post("/api/videojuegos", (req, res) => {
  const body = req.body
  const faltantes = CAMPOS_OBLIGATORIOS.filter((campo) => body[campo] === undefined)

  if (faltantes.length > 0) {
    return res.status(400).json({
      ok: false,
      error: `Faltan los siguientes campos obligatorios: ${faltantes.join(", ")}`
    })
  }

  const nuevoJuego = { id: randomUUID(), ...body }
  videojuegos.push(nuevoJuego)

  res.status(201).json({ ok: true, data: nuevoJuego })
})

// PUT /api/videojuegos/:id — reemplazo completo
app.put("/api/videojuegos/:id", (req, res) => {
  const index = videojuegos.findIndex((v) => v.id === req.params.id)

  if (index === -1) {
    return res.status(404).json({ ok: false, error: "Videojuego no encontrado" })
  }

  const body = req.body
  const faltantes = CAMPOS_OBLIGATORIOS.filter((campo) => body[campo] === undefined)

  if (faltantes.length > 0) {
    return res.status(400).json({
      ok: false,
      error: `Faltan los siguientes campos obligatorios: ${faltantes.join(", ")}`
    })
  }

  const actualizado = { id: req.params.id, ...body }
  videojuegos[index] = actualizado

  res.status(200).json({ ok: true, data: actualizado })
})

// PATCH /api/videojuegos/:id — actualización parcial
app.patch("/api/videojuegos/:id", (req, res) => {
  const index = videojuegos.findIndex((v) => v.id === req.params.id)

  if (index === -1) {
    return res.status(404).json({ ok: false, error: "Videojuego no encontrado" })
  }

  videojuegos[index] = { ...videojuegos[index], ...req.body }

  res.status(200).json({ ok: true, data: videojuegos[index] })
})

// DELETE /api/videojuegos/:id
app.delete("/api/videojuegos/:id", (req, res) => {
  const index = videojuegos.findIndex((v) => v.id === req.params.id)

  if (index === -1) {
    return res.status(404).json({ ok: false, error: "Videojuego no encontrado" })
  }

  const eliminado = videojuegos.splice(index, 1)[0]

  res.status(200).json({ ok: true, data: eliminado })
})

// 404 — ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    ruta: req.url,
    metodo: req.method,
    sugerencia: "Visita / para ver los endpoints disponibles"
  })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
