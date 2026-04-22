# Solución — Parte 1: Depuración del Servidor Roto

Archivo analizado: `servidor-malo.js`

---

### Error #1: Content-Type incorrecto en la ruta /info

**Ubicación:** Línea 15 del archivo original

**Tipo de error:** HTTP

**Qué estaba mal:** El valor del header `Content-Type` era `"application-json"`, usando un guion (`-`) en lugar de una barra diagonal (`/`). Esto no es un tipo MIME válido según el estándar HTTP.

**Cómo lo corregí:**
```
Antes:  res.writeHead(200, { "Content-Type": "application-json" })
Después: res.writeHead(200, { "Content-Type": "application/json" })
```

**Por qué funciona ahora:** El tipo MIME correcto es `application/json`. El cliente HTTP (navegador, Postman, etc.) usa este header para saber cómo interpretar la respuesta. Con el guion, el header es inválido y los clientes no pueden procesar la respuesta correctamente.

---

### Error #2: Promesa sin await en la lectura del archivo

**Ubicación:** Línea 22 del archivo original

**Tipo de error:** Asincronía

**Qué estaba mal:** `fs.readFile` de `fs/promises` retorna una `Promise`, pero no se usó `await` para esperar su resolución. Por lo tanto, la variable `texto` contenía un objeto `Promise` pendiente, no el contenido del archivo. Al hacer `JSON.stringify(texto)` se serializaba la Promise, no los datos reales.

**Cómo lo corregí:**
```
Antes:  const texto = fs.readFile(filePath, "utf-8")
Después: const texto = await fs.readFile(filePath, "utf-8")
```

**Por qué funciona ahora:** `await` pausa la ejecución de la función asíncrona hasta que la Promise se resuelve, asignando a `texto` el contenido real del archivo como string. Esto permite que `JSON.stringify(texto)` envíe los datos correctos al cliente.

---

### Error #3: Código de estado HTTP incorrecto en ruta no encontrada

**Ubicación:** Línea 30 del archivo original

**Tipo de error:** HTTP

**Qué estaba mal:** Cuando ninguna ruta coincidía, el servidor respondía con código `200 OK`, lo cual indica éxito. Esto es semánticamente incorrecto: una ruta inexistente debe indicar que el recurso no fue encontrado.

**Cómo lo corregí:**
```
Antes:  res.writeHead(200, { "Content-Type": "text/plain" })
Después: res.writeHead(404, { "Content-Type": "text/plain" })
```

**Por qué funciona ahora:** El código `404 Not Found` es el estándar HTTP para indicar que el servidor no encontró el recurso solicitado. Los clientes y herramientas como Postman interpretan esto correctamente como un error del cliente.

---

### Error #4: Paréntesis de cierre faltante en http.createServer()

**Ubicación:** Línea 32 del archivo original

**Tipo de error:** Sintaxis

**Qué estaba mal:** La función callback pasada a `http.createServer()` cerraba su bloque con `}` pero no se cerraba la llamada a la función con `)`. Esto produce un `SyntaxError` al intentar ejecutar el archivo y Node.js no puede iniciar el servidor.

**Cómo lo corregí:**
```
Antes:  }
Después: })
```

**Por qué funciona ahora:** `http.createServer(callback)` es una llamada a función que recibe la función handler como argumento. El `}` cierra el cuerpo de la función callback, y el `)` cierra la llamada a `createServer`. Sin el `)`, JavaScript no puede parsear la expresión correctamente.

---

### Error #5: Paréntesis de cierre faltante en server.listen()

**Ubicación:** Línea 35 del archivo original

**Tipo de error:** Sintaxis

**Qué estaba mal:** Al igual que el error anterior, `server.listen()` recibe un callback como segundo argumento, pero la llamada cerraba con `}` en lugar de `})`, produciendo un `SyntaxError`.

**Cómo lo corregí:**
```
Antes:  }
Después: })
```

**Por qué funciona ahora:** El `)` es necesario para cerrar correctamente la invocación de `server.listen(PORT, callback)`. Sin él, Node.js lanza un error de sintaxis antes de ejecutar cualquier línea del programa.
