(() => {
  const C = window.CONFIG;
  const $ = (s) => document.querySelector(s);
  const reduzMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- textos ----------
  $("#capaDica").textContent = C.capaDica;
  $("#capaTitulo").textContent = C.capaTitulo;
  $("#btnAbrir").textContent = C.capaBotao;
  $("#albumTitulo").textContent = C.albumTitulo;
  $("#albumSub").textContent = C.albumSubtitulo;
  document.title = C.albumTitulo;

  // ---------- imagem de reserva (quando o arquivo ainda não existe) ----------
  const reserva = (arquivo) => {
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">` +
      `<rect width="400" height="500" fill="#DCE6F8"/>` +
      `<text x="200" y="245" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#1B2A6B">coloque a foto em</text>` +
      `<text x="200" y="280" text-anchor="middle" font-family="monospace" font-size="24" font-weight="700" fill="#1B2A6B">${arquivo}</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  };

  // ---------- mural ----------
  const mural = $("#mural");
  const fotos = C.fotos || [];

  fotos.forEach((f, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "foto";
    b.style.setProperty("--r", ((i % 5) - 2) * 1.3 + "deg");
    b.style.setProperty("--t", ((i % 3) - 1) * 4 + "deg");
    b.style.setProperty("--i", i);

    const quadro = document.createElement("span");
    quadro.className = "foto__img";
    const img = document.createElement("img");
    img.src = f.arquivo;
    img.alt = f.legenda || "Foto nossa";
    img.loading = "lazy";
    img.decoding = "async";
    img.onerror = () => { img.onerror = null; img.src = reserva(f.arquivo); };
    quadro.appendChild(img);

    const leg = document.createElement("span");
    leg.className = "foto__legenda";
    leg.textContent = f.legenda || "";

    b.append(quadro, leg);
    b.addEventListener("click", () => abrirLb(i));
    mural.appendChild(b);
  });

  // ---------- capa -> álbum ----------
  const capa = $("#capa");
  const album = $("#album");
  $("#btnAbrir").addEventListener("click", () => {
    $("#btnAbrir").disabled = true;
    capa.classList.add("tracando");
    setTimeout(() => {
      capa.hidden = true;
      album.hidden = false;
      album.classList.add("entrou");
      window.scrollTo(0, 0);
    }, reduzMovimento ? 0 : 900);
  });

  // ---------- visualizador ----------
  const lb = $("#lb");
  const lbImg = $("#lbImg");
  let atual = 0;
  let ultimoFoco = null;

  function mostrar(i) {
    if (!fotos.length) return;
    atual = (i + fotos.length) % fotos.length;
    const f = fotos[atual];
    lbImg.onerror = () => { lbImg.onerror = null; lbImg.src = reserva(f.arquivo); };
    lbImg.src = f.arquivo;
    lbImg.alt = f.legenda || "Foto nossa";
    $("#lbLegenda").textContent = [f.legenda, f.data].filter(Boolean).join(" · ");
    $("#lbContagem").textContent = `${atual + 1} de ${fotos.length}`;
  }
  function abrirLb(i) {
    ultimoFoco = document.activeElement;
    mostrar(i);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    $("#lbFechar").focus();
  }
  function fecharLb() {
    lb.hidden = true;
    document.body.style.overflow = "";
    if (ultimoFoco) ultimoFoco.focus();
  }

  $("#lbFechar").addEventListener("click", fecharLb);
  $("#lbAnt").addEventListener("click", () => mostrar(atual - 1));
  $("#lbProx").addEventListener("click", () => mostrar(atual + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lb__palco")) fecharLb(); });

  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") fecharLb();
    if (e.key === "ArrowLeft") mostrar(atual - 1);
    if (e.key === "ArrowRight") mostrar(atual + 1);
  });

  // arrastar com o dedo
  let x0 = null;
  lb.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) mostrar(atual + (dx < 0 ? 1 : -1));
    x0 = null;
  });
})();
