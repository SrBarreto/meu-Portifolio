document.addEventListener("DOMContentLoaded", () => {
  const alvos = document.querySelectorAll(
    ".scroll-icones, .scroll-contatos, .scroll-projetos, .scroll-sobre"
  );

  if (alvos.length === 0) {
    console.error("❌ Nenhuma seção de scroll encontrada!");
    return;
  }

  // ============= INTERSECTION OBSERVER =============
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;

        if (entry.isIntersecting) {
          el.classList.add("show");

          // animação individual apenas para elementos relevantes
          const itensInternos = el.querySelectorAll("img, li, h2, .icone");

          itensInternos.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.15}s`;
            item.style.opacity = "1";
          });
        } else {
          el.classList.remove("show");

          // remove delays ao sair da tela
          const itensInternos = el.querySelectorAll("img, li, h2, .icone");
          itensInternos.forEach((item) => {
            item.style.transitionDelay = "0s";
            item.style.opacity = "0";
          });
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px", // mais estável
    }
  );

  alvos.forEach((alvo) => observer.observe(alvo));

  // ============= TOOLTIP AUTOMÁTICO =============
  document.querySelectorAll(".icone").forEach((icon) => {
    // evita duplicação caso já exista
    if (icon.querySelector(".tooltip-box")) return;

    const title = icon.dataset.title || "";
    const desc = icon.dataset.desc || "";
    const color = icon.dataset.color || "#fff";
    const img = icon.querySelector("img");
    const imgSrc = img ? img.src : "";

    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip-box");

    tooltip.innerHTML = `
      <img src="${imgSrc}" class="tooltip-icon" style="filter: drop-shadow(0 0 6px ${color});">
      <div class="tooltip-title" style="color:${color}">${title}</div>
      <div class="tooltip-desc">${desc}</div>
    `;

    icon.appendChild(tooltip);
  });
});
