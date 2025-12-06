let carrito = [];

// Mostrar / ocultar panel del carrito
function toggleCarrito() {
  document.getElementById("carrito-panel").classList.toggle("abierto");
}

// ✅ Agregar producto sin tallas
function agregaralcarrito(nombre, precio) {
  // Buscar si ya existe ese producto
  const itemExistente = carrito.find(item => item.nombre === nombre);

  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  renderizarCarrito();
}

// ✅ Eliminar producto
function eliminarDelCarrito(nombre) {
  carrito = carrito.filter(item => item.nombre !== nombre);
  renderizarCarrito();
}

// ✅ Mostrar carrito
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
          Cantidad: ${item.cantidad}<br>
          Precio: S/${item.precio.toFixed(2)}
        </div>
        <button onclick="eliminarDelCarrito('${item.nombre}')">🗑️</button>
      </div>
    `;
    contenedor.appendChild(div);
  });

  const total = carrito.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  document.getElementById("total").textContent = `Total: S/${total.toFixed(2)}`;
  document.getElementById("cart-count").textContent = carrito.reduce((sum, i) => sum + i.cantidad, 0);
}
