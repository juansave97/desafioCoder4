const express = require("express");
const { Router} = express;
const path = require("path");

const contenedor = require('./contenedor.js')
const Contenedor = new contenedor

const app = express();
const routerProductos = Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("index.html")
});

routerProductos.get("/", (req, res) => {
  let productos = Contenedor.getAll()

  res.json(productos);
});

routerProductos.get("/:id", (req, res) => {
  let productoId = req.params.id;
  let producto = Contenedor.getById(productoId)

  res.json(producto)
});

routerProductos.put("/:id", (req, res) => {
  let productoId = req.params.id
  let propiedades = req.body
  let producto = Contenedor.update(productoId, propiedades)

  res.json(producto);
});

routerProductos.post("/", (req, res) => {
    let producto = Contenedor.save(req.body)

    res.json(producto);
  });

routerProductos.delete("/:id", (req, res) => {
  let productoId = req.params.id
  let producto = Contenedor.deleteById(productoId)

  res.json(producto);
});  


app.use("/productos", routerProductos);

app
  .listen(8000, () => {
    console.log("Server running");
  })
  .on("error", () => {
    console.log("Ha ocurrido un error");
  });