let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contendorTotal = document.querySelector("#total");

function cargarProductosCarrito(){
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
       
        contenedorCarritoProductos.innerHTML = " ";
    
        productosEnCarrito.forEach((producto) => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <img class="carrito-producto-imagen"src="${producto.imagen}"alt="${producto.titulo}"/>
                  <div class="carrito-producto-titulo">
                    <small>titulo</small>
                    <h3>${producto.titulo}</h3>
                  </div>
    
                  <div class="carrito-producto-cantidad">
                    <small>cantidad</small>
                    <p>${producto.cantidad}</p>
                  </div>
    
                  <div class="carrito-producto-precio">
                    <small>precio</small>
                    <p>$${producto.precio}</p>
                  </div>
    
                  <div class="carrito-producto-subtotal">
                    <small>subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                  </div>
    
                  <button class="carrito-producto-eliminar" id="${producto.id}">
                    <i class="bi bi-trash3"></i>
                  </button> 
          `;
    
          contenedorCarritoProductos.append(div);
        });
    
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
 botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

 botonesEliminar.forEach(boton =>{
    boton.addEventListener("click", eliminarDelCarrito);
 });
}

function eliminarDelCarrito(e){

  Toastify({
    text: "Producto eliminado",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", 
    position: "right", 
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(to right, #d89797, #961818)",
      borderRadius: "2rem",
      textTransform: "upperCase",
      fontSize: ".75rem"
    },
    onClick: function(){} 
  }).showToast();

    const IdBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === IdBoton);
    
    
    productosEnCarrito.splice(index,1);
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito",JSON.stringify (productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarcarrito);

function vaciarcarrito() {
  
  Swal.fire({
    title: "Estas seguro",
    icon: "question",
    html: ` Se van a borrar ${productosEnCarrito.reduce((acc, productos) => acc + productos.cantidad, 0)} productos.`,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: ` Si `,
    cancelButtonText: `No `,
  }).then((result) => {
    if (result.isConfirmed) {
      productosEnCarrito.length = 0 ;
      localStorage.setItem("productos-en-carrito",JSON.stringify (productosEnCarrito));
      cargarProductosCarrito();
    }
  })
}


function actualizarTotal() {
  const totalCalculado = productosEnCarrito.reduce((acc, producto)=> acc + (producto.precio * producto.cantidad), 0);
  total.innerText = `$${totalCalculado}`
}