(function () {
  const S = window.SITE;
  const P = window.PROJECTS || [];
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // --- hero ---------------------------------------------------------------
  $("place").textContent = S.city;
  $("headline").textContent = S.headline;
  $("role").textContent = S.role;
  $("cta-primary").href = S.links.linkedin;
  $("nav-cta").href = S.links.linkedin;
  $("cta-github").href = S.links.github;
  $("foot-year").textContent = `${S.city} · ${new Date().getFullYear()}`;

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
      <article class="card${p.image ? " card--feature" : ""}">
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
})();
