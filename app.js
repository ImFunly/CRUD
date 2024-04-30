const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
  { id: 1, nombre: "Ryu", edad: 32, lugarProcedencia: "Japón" },
  { id: 2, nombre: "Chun-Li", edad: 29, lugarProcedencia: "China" },
  { id: 3, nombre: "Guile", edad: 35, lugarProcedencia: "Estados Unidos" },
  { id: 4, nombre: "Dhalsim", edad: 45, lugarProcedencia: "India" },
  { id: 5, nombre: "Blanka", edad: 32, lugarProcedencia: "Brasil" },
];

app.post("/usuarios", (req, res) => {
  if (!req.body.nombre) {
    return res
      .status(400)
      .json({ error: "Se requiere proporcionar un nombre de usuario." });
  }

  if (!req.body.edad && !req.body.lugarProcedencia) {
    return res
      .status(400)
      .json({ error: "Se requiere proporcionar edad y lugar de procedencia." });
  }

  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre: req.body.nombre,
    edad: req.body.edad,
    lugarProcedencia: req.body.lugarProcedencia,
  };

  usuarios.push(nuevoUsuario);

  res
    .status(201)
    .json({ mensaje: "Usuario creado exitosamente", usuario: nuevoUsuario });
});

app.get("/usuarios", (req, res) => {
  res.send(usuarios);
});

app.get("/usuarios/:nombre", (req, res) => {
  const nombreUsuario = req.params.nombre;
  const usuarioEncontrado = usuarios.find(
    (usuario) => usuario.nombre === nombreUsuario
  );
  if (usuarioEncontrado) {
    res.send(usuarioEncontrado);
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

app.put("/usuarios/:nombre", (req, res) => {
  const nombreUsuario = req.params.nombre;
  const usuarioIndex = usuarios.findIndex(
    (usuario) => usuario.nombre === nombreUsuario
  );
  if (usuarioIndex !== -1) {
    usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], ...req.body };
    res.send("Usuario actualizado correctamente");
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

app.delete("/usuarios/:nombre", (req, res) => {
  const nombreUsuario = req.params.nombre;
  const usuariosFiltrados = usuarios.filter(
    (usuario) => usuario.nombre !== nombreUsuario
  );
  if (usuariosFiltrados.length < usuarios.length) {
    usuarios = usuariosFiltrados;
    res.send("Usuario eliminado correctamente");
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

app.listen(3000, () => console.log("Express ejecutado en el puerto 3k e.e"));
