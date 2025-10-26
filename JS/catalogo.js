// document.addEventListener("DOMContentLoaded", () => {
//   const params = new URLSearchParams(window.location.search);
//   const linea = params.get("linea");
//   const seccion = params.get("seccion");

//   if (!linea || !seccion) {
//     document.getElementById("titulo-catalogo").textContent =
//       "Catálogo no encontrado";
//     return;
//   }

//   // Cargar productos desde un archivo o arreglo JS
//   fetch("js/productos.json")
//     .then(response => response.json())
//     .then(data => mostrarProductos(data, linea, seccion))
//     .catch(error => console.error("Error al cargar los productos:", error));
// });

// function mostrarProductos(data, linea, seccion) {
//   const contenedor = document.getElementById("catalogo");
//   const productos = data[linea]?.[seccion] || [];

//   if (productos.length === 0) {
//     contenedor.innerHTML = `<p>Aún no hay productos disponibles, intentelo más tarde.</p>`;
//     return;
//   }

//   contenedor.innerHTML = productos
//     .map(prod => `
//       <div class="producto" onclick="verProducto('${prod.id}')">
//         <img src="${prod.imagen}" alt="${prod.nombre}">
//         <h3>${prod.nombre}</h3>
//         <p>${prod.precio}</p>
//       </div>
//     `)
//     .join("");
// }

// function verProducto(id) {
//   window.location.href = `producto.html?id=${id}`;
// }



document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const linea = params.get("linea");
  const seccion = params.get("seccion");

  if (!linea || !seccion) {
    document.getElementById("titulo-catalogo").textContent =
      "Catálogo no encontrado";
    return;
  }

  // Título dinámico
  const titulo = `${linea.charAt(0).toUpperCase() + linea.slice(1)} - ${seccion.charAt(0).toUpperCase() + seccion.slice(1)}`;
  document.getElementById("titulo-catalogo").textContent = titulo;

  // Carga el archivo JSON correspondiente
  try {
    const response = await fetch(`../../json/${linea}.json`);
    const data = await response.json();

    // Filtra los productos según la sección
    const productos = data[seccion] || [];

    const contenedor = document.getElementById("productos-container");
    contenedor.innerHTML = "";

    if (productos.length === 0) {
      contenedor.innerHTML = `<p>No hay productos en esta sección.</p>`;
      return;
    }

    productos.forEach((producto) => {
      const card = document.createElement("div");
      card.classList.add("producto-card");
      card.innerHTML = `
        <img src="../../imagenes/${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <button onclick="verProducto('${linea}', '${producto.id}')">Ver más</button>
      `;
      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
});

function verProducto(linea, id) {
  window.location.href = `producto.html?linea=${linea}&id=${id}`;
}
