document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.createElement("div");
  footerContainer.id = "footer-container";
  document.body.appendChild(footerContainer);

  // Detectar profundidad del archivo actual
  const path = window.location.pathname;
  let prefix = "";

  if (path.includes("/html/Catalogo/LC/")) prefix = "../../";
  else if (path.includes("/html/")) prefix = "../";
  else prefix = "";

  // Cargar footer
  fetch(`${prefix}componentes/footer.html`)
    .then(res => {
      if (!res.ok) throw new Error(`Error al cargar footer: ${res.status}`);
      return res.text();
    })
    .then(html => {
      footerContainer.innerHTML = html;
      console.log("✅ Footer cargado correctamente");
    })
    .catch(err => console.error("❌ No se pudo cargar el footer:", err));
});
