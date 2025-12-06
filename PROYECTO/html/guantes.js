let carrito = [];
let tallaSeleccionada = null;

// Mostrar / ocultar panel del carrito
function toggleCarrito() {
  document.getElementById("carrito-panel").classList.toggle("abierto");
}

// Seleccionar talla visualmente
function seleccionarTalla(elemento) {
  document.querySelectorAll(".tallas span").forEach(span => span.classList.remove("seleccionada"));
  elemento.classList.add("seleccionada");
  tallaSeleccionada = elemento.textContent;
}

// Agregar producto al carrito
function agregaralcarrito(nombre, precio) {
  if (!tallaSeleccionada) {
    alert("Por favor selecciona una talla antes de comprar 🧤");
    return;
  }

  // Buscar si ya existe ese producto con la misma talla
  const itemExistente = carrito.find(item => item.nombre === nombre && item.talla === tallaSeleccionada);

  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.push({ nombre, precio, talla: tallaSeleccionada, cantidad: 1 });
  }

  renderizarCarrito();
}

// Eliminar producto del carrito
function eliminarDelCarrito(nombre, talla) {
  carrito = carrito.filter(item => !(item.nombre === nombre && item.talla === talla));
  renderizarCarrito();
}

// Mostrar los productos en el carrito
function renderizarCarrito() {
  const contenedor = document.getElementById("carrito-items");
  contenedor.innerHTML = "";

  carrito.forEach(item => {
    const div = document.createElement("div");
    div.className = "item-carrito";
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <div class="info-iteam">
          <strong>${item.nombre}</strong><br>
          Talla: ${item.talla}<br>
          Cantidad: ${item.cantidad}<br>
          Precio: S/${item.precio.toFixed(2)}
        </div>
        <button onclick="eliminarDelCarrito('${item.nombre}', '${item.talla}')">🗑️</button>
      </div>
    `;
    contenedor.appendChild(div);
  });

  const total = carrito.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  document.getElementById("total").textContent = `Total: S/${total.toFixed(2)}`;
  document.getElementById("cart-count").textContent = carrito.reduce((sum, i) => sum + i.cantidad, 0);
}
