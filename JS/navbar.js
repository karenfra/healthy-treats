document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.createElement("div");
  document.body.prepend(navbarContainer);

  const path = window.location.pathname;

  // Detectar si estamos dentro de /html/, /html/Catalogo/ o más profundo
  let prefix = "";
  if (path.includes("/html/Catalogo/LC/") || path.includes("/html/Catalogo/LV/") || path.includes("/html/Catalogo/SG/")) {
    prefix = "../../../"; // tres niveles arriba
  } else if (path.includes("/html/Catalogo/")) {
    prefix = "../../"; // dos niveles arriba
  } else if (path.includes("/html/")) {
    prefix = "../"; // un nivel arriba
  } else {
    prefix = ""; // raíz
  }

  // Cargar navbar
  fetch(`${prefix}componentes/navbar.html`)
    .then(res => {
      if (!res.ok) throw new Error(`Error al cargar navbar: ${res.status}`);
      return res.text();
    })
    .then(html => {
      navbarContainer.innerHTML = html;

      // 🔹 Ajustar los href de los enlaces con data-target
      navbarContainer.querySelectorAll("a[data-target]").forEach(link => {
        const target = link.getAttribute("data-target");
        if (target && !target.startsWith("http") && !target.startsWith("#")) {
          link.href = `${prefix}${target}`;
        }
      });

      // 🔹 Ajustar imágenes (incluido el logo)
      navbarContainer.querySelectorAll("img").forEach(img => {
        const src = img.getAttribute("src");
        if (src && !src.startsWith("http") && !src.startsWith(prefix)) {
          img.src = `${prefix}${src}`;
        }
      });

      console.log("✅ Navbar cargado correctamente");
    })
    .catch(err => console.error("❌ Error al cargar navbar:", err));
});