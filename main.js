(function () {
  const S = window.SITE;
  const P = window.PROJECTS || [];
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // --- hero ---------------------------------------------------------------
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  $("place").textContent = S.city;

  // headline: words rise in one after another
  const h = $("headline");
  h.setAttribute("aria-label", S.headline);
  h.innerHTML = S.headline
    .split(" ")
    .map((w, i) => `<span class="w" aria-hidden="true"><span style="--i:${i}">${esc(w)}</span></span>`)
    .join(" ");
  $("role").textContent = S.role;
  $("cta-primary").href = S.links.linkedin;
  $("nav-cta").href = S.links.linkedin;
  $("cta-github").href = S.links.github;
  $("foot-year").textContent = `${S.city} · ${new Date().getFullYear()}`;

  // --- hero matrix: real out-of-fold counts from the thesis (Fig. 4.30) -----
  const M = window.MATRIX;
  if (M) {
    const n = M.labels.length;
    const read = $("matrix-read");
    const idle = M.idle;
    read.textContent = idle;
    let cells = `<span></span>` + M.labels.map((l) => `<span class="mx-l mx-l--top">${l}</span>`).join("");
    M.rows.forEach((row, i) => {
      const total = row.reduce((a, b) => a + b, 0);
      cells += `<span class="mx-l">${M.labels[i]}</span>`;
      row.forEach((v, j) => {
        const rate = v / total;
        cells += `<span class="mx-c${i === j ? " mx-c--d" : ""}" style="--v:${(v ? Math.max(Math.sqrt(rate), 0.14) : 0).toFixed(3)};--d:${i + j}" data-i="${i}" data-j="${j}" data-v="${v}"></span>`;
      });
    });
    const grid = $("matrix");
    grid.style.setProperty("--n", n);
    grid.innerHTML = cells;
    grid.addEventListener("pointerover", (e) => {
      const c = e.target.closest(".mx-c");
      if (!c) return;
      const t = M.labels[c.dataset.i], p = M.labels[c.dataset.j], v = Number(c.dataset.v).toLocaleString("en-US");
      read.innerHTML = t === p
        ? `<b>${t}</b> correctly classified · <b>${v}</b> samples`
        : `True <b>${t}</b> → predicted <b>${p}</b> · <b>${v}</b> samples`;
    });
    grid.addEventListener("pointerleave", () => (read.textContent = idle));
  }

  // --- work ---------------------------------------------------------------
  const ext = (href, text) => `<a href="${esc(href)}" target="_blank" rel="noopener">${text} ↗</a>`;
  $("projects").innerHTML = P.map((p) => {
    const media = p.image
      ? `<div class="card__media"><img src="${esc(p.image)}" alt="" loading="lazy"></div>`
      : "";
    const stats = (p.stats || [])
      .map(([v, k]) => `<div><b>${esc(v)}</b><span>${esc(k)}</span></div>`)
      .join("");
    const links = [
      p.demo && ext(p.demo, "Live"),
      p.paper && ext(p.paper, "Paper"),
      p.github && ext(p.github, "Code"),
    ].filter(Boolean).join("");
    const title = p.page ? `<a class="card__link" href="${esc(p.page)}">${esc(p.title)}</a>` : esc(p.title);
    return `
      <article class="card${p.image ? " card--feature" : ""}" data-reveal>
        ${media}
        <div class="card__body">
          <p class="card__meta">${p.label ? `<span class="tag">${esc(p.label)}</span>` : ""}<span>${esc(p.year)}</span></p>
          <h3 class="card__title">${title}</h3>
          ${p.description ? `<p class="card__desc">${esc(p.description)}</p>` : ""}
          ${stats ? `<div class="card__stats">${stats}</div>` : ""}
          <p class="card__stack">${p.stack.map(esc).join(" · ")}</p>
          <div class="card__foot">
            ${p.page ? `<a class="more" href="${esc(p.page)}">Read case study <span aria-hidden="true">→</span></a>` : ""}
            <span class="card__ext">${links}</span>
          </div>
        </div>
      </article>`;
  }).join("");

  // --- contact ------------------------------------------------------------
  const labels = { linkedin: "LinkedIn", github: "GitHub", email: "Email" };
  $("links").innerHTML = Object.entries(S.links)
    .filter(([, url]) => url)
    .map(([k, url]) => {
      const href = k === "email" ? `mailto:${url}` : url;
      const shown = url.replace(/^https?:\/\/(www\.)?/, "");
      return `<li><a href="${esc(href)}" target="_blank" rel="noopener"><span>${labels[k] || k}</span><span class="muted">${esc(shown)}</span><span aria-hidden="true">↗</span></a></li>`;
    })
    .join("");

  // --- motion -------------------------------------------------------------
  // numbers count up to their real value
  const countUp = (el) => {
    const raw = el.textContent.trim();
    const target = parseFloat(raw.replace(/,/g, ""));
    if (isNaN(target)) return;
    const dec = (raw.split(".")[1] || "").length;
    const fmt = (x) => (raw.includes(",") ? Math.round(x).toLocaleString("en-US") : x.toFixed(dec));
    const t0 = performance.now(), dur = 1400;
    const step = (t) => {
      const k = Math.min((t - t0) / dur, 1);
      el.textContent = fmt(target * (1 - Math.pow(1 - k, 4)));
      if (k < 1) requestAnimationFrame(step);
    };
    el.textContent = fmt(0);
    requestAnimationFrame(step);
  };

  document.documentElement.classList.add("js");
  if (still) {
    document.documentElement.classList.add("ready");
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("in"));
    return;
  }
  requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add("ready")));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      e.target.querySelectorAll(".card__stats b").forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
})();
