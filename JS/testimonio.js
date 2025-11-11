document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  //  SECCIÓN DE CALIFICACIÓN
  // ==========================
  const stars = document.querySelectorAll("#starRating .star");
  const ratingInput = document.getElementById("rating");
  let rating = 0;

  // Función para pintar las estrellas según el puntaje actual
  function paintStars(value) {
    stars.forEach((star, index) => {
      const starValue = index + 1;
      if (starValue <= value) {
        star.classList.add("filled");
        star.classList.remove("half");
      } else if (value % 1 !== 0 && starValue - 0.5 === value) {
        star.classList.add("half");
        star.classList.remove("filled");
      } else {
        star.classList.remove("filled", "half");
      }
    });
  }

  // Hover: muestra visualmente la puntuación antes de seleccionar
  stars.forEach((star, index) => {
    star.addEventListener("mousemove", (e) => {
      const rect = star.getBoundingClientRect();
      const isHalf = e.clientX - rect.left < rect.width / 2;
      const tempRating = isHalf ? index + 0.5 : index + 1;
      paintStars(tempRating);
    });

    // Restablece la vista cuando el puntero sale
    star.addEventListener("mouseleave", () => {
      paintStars(rating);
    });

    // Al hacer clic, se guarda la puntuación final
    star.addEventListener("click", (e) => {
      const rect = star.getBoundingClientRect();
      const isHalf = e.clientX - rect.left < rect.width / 2;
      rating = isHalf ? index + 0.5 : index + 1;
      ratingInput.value = rating;
      paintStars(rating);
    });
  });

  // ==========================
  //  VALIDACIÓN DEL FORMULARIO
  // ==========================
  const form = document.getElementById("testimonioForm");
  const nombreInput = document.getElementById("nombre");
  const opinionInput = document.getElementById("opinion");
  const testimonioCarousel = document.querySelector(".testimonios-carousel");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validar nombre
    const nombre = nombreInput.value.trim();
    if (!nombre) {
      alert("Por favor, ingrese su nombre.");
      return;
    }

    // Validar opinión
    const opinion = opinionInput.value.trim();
    if (!opinion) {
      alert("Por favor, escriba su opinión.");
      return;
    }

    // Validar rating
    if (rating === 0) {
      alert("Por favor, seleccione una calificación.");
      return;
    }

    // Crear objeto de testimonio
    const nuevoTestimonio = {
      nombre,
      opinion,
      rating,
      fecha: new Date().toLocaleDateString(),
    };

    // Guardar en localStorage
    const testimoniosGuardados = JSON.parse(localStorage.getItem("testimonios")) || [];
    testimoniosGuardados.push(nuevoTestimonio);
    localStorage.setItem("testimonios", JSON.stringify(testimoniosGuardados));

    // Mostrar agradecimiento
    alert("¡Gracias por compartir tu opinión! 🧁");

    // Limpiar el formulario
    form.reset();
    rating = 0;
    paintStars(0);

    // Reconstruir carrusel
    renderTestimonios();
  });

  // ==========================
  // CARGAR TESTIMONIOS
  // ==========================
  function renderTestimonios() {
    const testimoniosGuardados = JSON.parse(localStorage.getItem("testimonios")) || [];
    testimonioCarousel.innerHTML = "";

    if (testimoniosGuardados.length === 0) {
      testimonioCarousel.innerHTML = "<p>No hay testimonios aún. ¡Sé el primero en dejar el tuyo!</p>";
      return;
    }

    testimoniosGuardados.forEach((t) => {
      const item = document.createElement("div");
      item.classList.add("testimonio-item");

      // Crear las estrellas visuales
      const starsHTML = Array.from({ length: 5 }, (_, i) => {
        if (t.rating >= i + 1) return "★";
        else if (t.rating >= i + 0.5) return "☆";
        else return "☆";
      }).join("");

      item.innerHTML = `
        <div class="testimonio-rating">${starsHTML}</div>
        <p class="testimonio-opinion">"${t.opinion}"</p>
        <h4 class="testimonio-nombre">– ${t.nombre}</h4>
        <span class="testimonio-fecha">${t.fecha}</span>
      `;

      testimonioCarousel.appendChild(item);
    });
  }

  // Cargar los testimonios al iniciar
  renderTestimonios();
});