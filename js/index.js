let productos = [
  {
    id: "gaseosa",
    titulo: "Gaseosa",
    imagen: "./img/bebidas/coca.jpg",
    categoria: {
      nombre: "bebidas",
      id: "bebidas",
    },
    precio: 10,
  },
  {
    id: "frugos",
    titulo: "Frugos",
    imagen: "./img/bebidas/frugos.jpg",
    categoria: {
      nombre: "bebidas",
      id: "bebidas",
    },
    precio: 10,
  },
  {
    id: "power",
    titulo: "Powerade",
    imagen: "./img/bebidas/power.jpg",
    categoria: {
      nombre: "bebidas",
      id: "bebidas",
    },
    precio: 10,
  },
  {
    id: "ron",
    titulo: "Ron",
    imagen: "./img/bebidas/ron.jpg",
    categoria: {
      nombre: "bebidas",
      id: "bebidas",
    },
    precio: 10,
  },
  {
    id: "cerveza",
    titulo: "Cerveza",
    imagen: "./img/bebidas/cerveza.jpg",
    categoria: {
      nombre: "bebidas",
      id: "bebidas",
    },
    precio: 10,
  },
  {
    id: "aceite",
    titulo: "Aceite",
    imagen: "./img/abarrotes/aceite.jpg",
    categoria: {
      nombre: "abarrotes",
      id: "abarrotes",
    },
    precio: 10,
  },
  {
    id: "arroz",
    titulo: "Arroz",
    imagen: "./img/abarrotes/arroz.jpg",
    categoria: {
      nombre: "abarrotes",
      id: "abarrotes",
    },
    precio: 10,
  },
  {
    id: "atun",
    titulo: "Atun",
    imagen: "./img/abarrotes/atun.jpg",
    categoria: {
      nombre: "abarrotes",
      id: "abarrotes",
    },
    precio: 10,
  },
  {
    id: "azucar",
    titulo: "Azucar",
    imagen: "./img/abarrotes/azucar.jpg",
    categoria: {
      nombre: "abarrotes",
      id: "abarrotes",
    },
    precio: 10,
  },
  {
    id: "cafe",
    titulo: "Cafe",
    imagen: "./img/abarrotes/cafe.jpg",
    categoria: {
      nombre: "abarrotes",
      id: "abarrotes",
    },
    precio: 10,
  },
  {
    id: "fideos",
    titulo: "Fideos",
    imagen: "./img/abarrotes/fideos.jpg",
    categoria: {
      nombre: "abarrotes",
      id: "abarrotes",
    },
    precio: 10,
  },
  {
    id: "huevos",
    titulo: "Huevos",
    imagen: "./img/abarrotes/huevos.jpg",
    categoria: {
      nombre: "abarrotes",
      id: "abarrotes",
    },
    precio: 10,
  },
  {
    id: "leche",
    titulo: "Leche",
    imagen: "./img/abarrotes/leche.jpg",
    categoria: {
      nombre: "abarrotes",
      id: "abarrotes",
    },
    precio: 10,
  },
  {
    id: "fresa",
    titulo: "Fresa",
    imagen: "./img/frutas/fresa.jpg",
    categoria: {
      nombre: "frutas",
      id: "frutas",
    },
    precio: 10,
  },
  {
    id: "mandarina",
    titulo: "Mandarina",
    imagen: "./img/frutas/mandarina.jpg",
    categoria: {
      nombre: "frutas",
      id: "frutas",
    },
    precio: 10,
  },
  {
    id: "manzana",
    titulo: "Manzana",
    imagen: "./img/frutas/manzana.jpg",
    categoria: {
      nombre: "frutas",
      id: "frutas",
    },
    precio: 10,
  },
  {
    id: "pinia",
    titulo: "Piñia",
    imagen: "./img/frutas/pinia.jpg",
    categoria: {
      nombre: "frutas",
      id: "frutas",
    },
    precio: 10,
  },
  {
    id: "platano",
    titulo: "Platano",
    imagen: "./img/frutas/platano.jpg",
    categoria: {
      nombre: "frutas",
      id: "frutas",
    },
    precio: 10,
  },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-seccion");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = " ";

  productosElegidos.forEach((producto) => {
    const div = document.createElement("div");
    
    div.classList.add("producto");
    
    div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}"/>
            <div class="producto-detalles">
              <h3 class="producto-titulo">${producto.titulo}</h3>
              <p class="producto-precio">${producto.precio}</p>
              <button class="producto-agregar" id = "${producto.id}">agregar</button>
            </div>
    `;
    contenedorProductos.append(div);
  });

  actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    
    botonesCategorias.forEach((boton) => boton.classList.remove("active"));

    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
      const productoCategoria = productos.find(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      tituloPrincipal.innerText = productoCategoria.categoria.nombre;
      const productosBoton = productos.filter(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      cargarProductos(productosBoton);
    } else {
      tituloPrincipal.innerText = "Todos los productos";
      cargarProductos(productos);
    }
  });
});

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {

  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumerito();

} else {
  productosEnCarrito = [];
}

function agregarAlCarrito(e) {

  const IdBoton = e.currentTarget.id;
  const productoAgregado = productos.find((producto) => producto.id === IdBoton);

  if (productosEnCarrito.some((producto) => producto.id === IdBoton)) {
    const index = productosEnCarrito.findIndex((producto) => producto.id === IdBoton);
    productosEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }

  actualizarNumerito();

  localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
  let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  numerito.innerText = nuevoNumerito;
}