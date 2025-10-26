document.addEventListener("DOMContentLoaded", () => {
  const SECTION_BREAKPOINT = 992;
  const section = document.querySelector(".rowLineas");

  const originalImages = {};
  const originalTextos = {};

  document.querySelectorAll(".LargeImage").forEach(img => {
    originalImages[String(img.dataset.index)] = img.outerHTML;
  });
  document.querySelectorAll(".texto").forEach(txt => {
    originalTextos[String(txt.dataset.index)] = txt.outerHTML;
  });

  function elFromHTML(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstChild;
  }

  let observer = null;
  let isMobile = window.innerWidth <= SECTION_BREAKPOINT;

  function buildDesktop() {
    section.innerHTML = "";

    const colImgs = document.createElement("div");
    colImgs.className = "col-6 scroll-images";

    const colText = document.createElement("div");
    colText.className = "col-6 sticky-text";

    Object.keys(originalImages).sort((a, b) => a - b).forEach(key => {
      const imgEl = elFromHTML(originalImages[key]);
      imgEl.classList.add("LargeImage");
      const sec = document.createElement("section");
      sec.classList.add("section");
      sec.appendChild(imgEl);
      colImgs.appendChild(sec);
    });

    Object.keys(originalTextos).sort((a, b) => a - b).forEach((key, idx) => {
      const txtEl = elFromHTML(originalTextos[key]);
      txtEl.classList.add("texto");
      if (idx === 0) txtEl.classList.add("active");
      colText.appendChild(txtEl);
    });

    section.appendChild(colImgs);
    section.appendChild(colText);
    initObserver();
  }

  function buildMobile() {
    section.innerHTML = "";
    disconnectObserver();

    Object.keys(originalImages).sort((a, b) => a - b).forEach(key => {
      const pair = document.createElement("div");
      pair.className = "responsive-pair";

      const imgEl = elFromHTML(originalImages[key]);
      const txtEl = elFromHTML(originalTextos[key]);

      imgEl.classList.add("LargeImage");
      txtEl.classList.add("texto", "mobile");
      txtEl.classList.add("active");

      pair.appendChild(imgEl);
      pair.appendChild(txtEl);
      section.appendChild(pair);
    });
  }

  function initObserver() {
    disconnectObserver();

    const imgs = Array.from(document.querySelectorAll(".LargeImage"));
    const textos = Array.from(document.querySelectorAll(".texto"));
    const sticky = document.querySelector(".sticky-text");

    function updateByCenter() {
      let center = window.innerHeight / 2;
      let closestImg = null;
      let minDistance = Infinity;

      imgs.forEach(img => {
        const rect = img.getBoundingClientRect();
        const imgCenter = rect.top + rect.height / 2;
        const distance = Math.abs(center - imgCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestImg = img;
        }
      });

      if (!closestImg) return;
      const idx = closestImg.dataset.index;

      textos.forEach(t => {
        t.classList.toggle("active", t.dataset.index === idx);
      });

      const color = closestImg.dataset.color;
      if (color) {
        section.style.backgroundColor = color;
        if (sticky) sticky.style.backgroundColor = color;
      }
    }

    // En lugar del observer tradicional, usamos scroll para mayor precisión
    window.addEventListener("scroll", updateByCenter);
    window.addEventListener("resize", updateByCenter);
    updateByCenter();
  }

  function disconnectObserver() {
    window.removeEventListener("scroll", initObserver);
  }

  function debounce(fn, wait = 120) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  // Construcción inicial
  if (isMobile) buildMobile();
  else buildDesktop();

  // Cambia en vivo sin recargar
  window.addEventListener("resize", debounce(() => {
    const nowMobile = window.innerWidth <= SECTION_BREAKPOINT;
    if (nowMobile !== isMobile) {
      isMobile = nowMobile;
      if (isMobile) buildMobile(); else buildDesktop();
    }
  }));
});
