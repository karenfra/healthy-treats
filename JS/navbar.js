document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.createElement("div");
  document.body.prepend(navbarContainer);

  const path = window.location.pathname;

  // Detectar si estamos dentro de /html/, /html/Catalogo/ o más profundo
  let prefix = "";
  if (
    path.includes("/html/Catalogo/LC/") ||
    path.includes("/html/Catalogo/LV/") ||
    path.includes("/html/Catalogo/SG/")
  ) {
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
    .then(res => res.text())
    .then(html => {
      navbarContainer.innerHTML = html;

 // Actualizar los href según el nivel actual
      navbarContainer.querySelectorAll("a[data-target]").forEach(link => {
        const target = link.getAttribute("data-target");
        link.href = `${prefix}${target}`;
      });

      // Ajustar logo
      const logo = navbarContainer.querySelector("img.logito");
      if (logo) logo.src = `${prefix}${logo.getAttribute("src")}`;

      /* ===== MARCAR "ACTIVE" UNIVERSAL ===== */
      const currentPath = window.location.pathname.toLowerCase().replace(/\\/g, "/");

      navbarContainer.querySelectorAll("a").forEach(link => {
        link.classList.remove("active");

        const href = link.getAttribute("href");
        if (!href) return;

        // Normalizar ambas rutas
        const normalizedHref = href.toLowerCase().replace(/\\/g, "/");
        const normalizedFile = normalizedHref.split("/").pop().replace(".html", "");
        const currentFile = currentPath.split("/").pop().replace(".html", "");

        // --- Coincidencia directa (por nombre de archivo, sin importar guiones o mayúsculas) ---
        if (normalizedFile && currentFile && currentFile.includes(normalizedFile)) {
          link.classList.add("active");
        }

        // --- Coincidencia parcial: estás en una carpeta (como /html/catalogo/...) ---
        if (
          currentPath.includes("/html/catalogo/") &&
          normalizedHref.includes("catalogo")
        ) {
          link.classList.add("active");
        }
      });
    })
    .catch(err => console.error("Error al cargar navbar:", err));
});
