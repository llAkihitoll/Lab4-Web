import express from "express"

const app = express()
const PORT = 3000

app.use(express.json())

let videojuegos = [
  {
    id: crypto.randomUUID(),
    titulo: "The Legend of Zelda: Breath of the Wild",
    plataforma: "Nintendo Switch",
    genero: "aventura",
    precio: 59.99,
    rating: 10,
    logros_disponibles: 76
  },
  {
    id: crypto.randomUUID(),
    titulo: "God of War Ragnarök",
    plataforma: "PS5",
    genero: "accion",
    precio: 69.99,
    rating: 10,
    logros_disponibles: 36
  },
  {
    id: crypto.randomUUID(),
    titulo: "Elden Ring",
    plataforma: "PC",
    genero: "RPG",
    precio: 59.99,
    rating: 9,
    logros_disponibles: 42
  },
  {
    id: crypto.randomUUID(),
    titulo: "FIFA 24",
    plataforma: "PS5",
    genero: "deportes",
    precio: 49.99,
    rating: 7,
    logros_disponibles: 55
  }
]

// GET / — Documentación HTML
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>API Videojuegos</title></head>
      <body>
        <h1>API de Videojuegos</h1>
        <h2>Endpoints disponibles</h2>
        <h3>Informativos</h3>
        <ul>
          <li>GET /info — Información de la API</li>
          <li>GET /saludo — Saludo personalizado</li>
          <li>GET /api/status — Estado del servidor</li>
        </ul>
        <h3>CRUD — /api/videojuegos</h3>
        <ul>
          <li>GET /api/videojuegos — Obtener todos (filtro: ?genero=, ?plataforma=)</li>
          <li>GET /api/videojuegos/:id — Obtener uno por ID</li>
          <li>POST /api/videojuegos — Crear nuevo videojuego</li>
          <li>PUT /api/videojuegos/:id — Reemplazar videojuego completo</li>
          <li>PATCH /api/videojuegos/:id — Actualizar campos específicos</li>
          <li>DELETE /api/videojuegos/:id — Eliminar videojuego</li>
        </ul>
      </body>
    </html>
  `)
})

// GET /info
app.get("/info", (req, res) => {
  res.json({
    mensaje: "API REST de videojuegos",
    curso: "Sistemas y Tecnologías Web",
    tecnologia: "Node.js + Express",
    version: "1.0.0"
  })
})

// GET /saludo
app.get("/saludo", (req, res) => {
  res.type("text/plain").send("Bienvenido a la API de Videojuegos")
})

// GET /api/status
app.get("/api/status", (req, res) => {
  res.json({
    ok: true,
    status: "activo",
    puerto: PORT,
    timestamp: new Date().toISOString()
  })
})

// GET /api/videojuegos — con filtros por genero y plataforma
app.get("/api/videojuegos", (req, res) => {
  const { genero, plataforma } = req.query
  let resultado = videojuegos

  if (genero) {
    resultado = resultado.filter(j => j.genero.toLowerCase() === genero.toLowerCase())
  }

  if (plataforma) {
    resultado = resultado.filter(j => j.plataforma.toLowerCase() === plataforma.toLowerCase())
  }

  res.json({ ok: true, data: resultado })
})

// GET /api/videojuegos/:id
app.get("/api/videojuegos/:id", (req, res) => {
  const juego = videojuegos.find(j => j.id === req.params.id)
  if (!juego) {
    return res.status(404).json({ ok: false, error: "Videojuego no encontrado" })
  }
  res.json({ ok: true, data: juego })
})

// POST /api/videojuegos
app.post("/api/videojuegos", (req, res) => {
  const { titulo, plataforma, genero, precio, rating, logros_disponibles } = req.body
  const camposFaltantes = []

  if (!titulo) camposFaltantes.push("titulo")
  if (!plataforma) camposFaltantes.push("plataforma")
  if (!genero) camposFaltantes.push("genero")
  if (precio === undefined) camposFaltantes.push("precio")
  if (rating === undefined) camposFaltantes.push("rating")
  if (logros_disponibles === undefined) camposFaltantes.push("logros_disponibles")

  if (camposFaltantes.length > 0) {
    return res.status(400).json({
      ok: false,
      error: `Faltan los siguientes campos obligatorios: ${camposFaltantes.join(", ")}`
    })
  }

  const nuevoJuego = { id: crypto.randomUUID(), titulo, plataforma, genero, precio, rating, logros_disponibles }
  videojuegos.push(nuevoJuego)
  res.status(201).json({ ok: true, data: nuevoJuego })
})

// PUT /api/videojuegos/:id — reemplazo completo
app.put("/api/videojuegos/:id", (req, res) => {
  const index = videojuegos.findIndex(j => j.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ ok: false, error: "Videojuego no encontrado" })
  }

  const { titulo, plataforma, genero, precio, rating, logros_disponibles } = req.body
  const camposFaltantes = []

  if (!titulo) camposFaltantes.push("titulo")
  if (!plataforma) camposFaltantes.push("plataforma")
  if (!genero) camposFaltantes.push("genero")
  if (precio === undefined) camposFaltantes.push("precio")
  if (rating === undefined) camposFaltantes.push("rating")
  if (logros_disponibles === undefined) camposFaltantes.push("logros_disponibles")

  if (camposFaltantes.length > 0) {
    return res.status(400).json({
      ok: false,
      error: `Faltan los siguientes campos para reemplazar: ${camposFaltantes.join(", ")}`
    })
  }

  videojuegos[index] = { id: req.params.id, titulo, plataforma, genero, precio, rating, logros_disponibles }
  res.json({ ok: true, data: videojuegos[index] })
})

// PATCH /api/videojuegos/:id — actualización parcial
app.patch("/api/videojuegos/:id", (req, res) => {
  const index = videojuegos.findIndex(j => j.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ ok: false, error: "Videojuego no encontrado" })
  }

  videojuegos[index] = { ...videojuegos[index], ...req.body }
  res.json({ ok: true, data: videojuegos[index] })
})

// DELETE /api/videojuegos/:id
app.delete("/api/videojuegos/:id", (req, res) => {
  const index = videojuegos.findIndex(j => j.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ ok: false, error: "Videojuego no encontrado" })
  }

  const eliminado = videojuegos.splice(index, 1)[0]
  res.json({ ok: true, data: eliminado })
})

// Ruta 404
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
