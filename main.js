(function () {
  const S = window.SITE;
  const P = window.PROJECTS || [];
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // --- header -----------------------------------------------------------
  $("name").textContent = S.name;
  $("role").textContent = S.role;
  $("coords").textContent = S.coords;
  $("foot-name").textContent = S.name;
  $("foot-place").textContent = `${S.city} · ${new Date().getFullYear()}`;

  // --- hero code: typed out, generated from the data ---------------------
  const handle = S.name.split(" ").pop().toLowerCase();
  const code =
    `>>> ${handle}.projects()\n` +
    `[${P.map((p) => `'${p.title}'`).join(", ")}]\n` +
    `>>> `;
  const pre = $("hero-code");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    pre.textContent = code;
  } else {
    let i = 0;
    const tick = () => {
      pre.textContent = code.slice(0, ++i);
      if (i < code.length) setTimeout(tick, code[i - 1] === "\n" ? 380 : 32);
    };
    setTimeout(tick, 600);
  }

  // --- projects ---------------------------------------------------------
  $("count").textContent = String(P.length).padStart(2, "0");
  $("plist").innerHTML = P.map((p, i) => {
    const links = [
      p.demo && `<a href="${esc(p.demo)}" target="_blank" rel="noopener">live ↗</a>`,
      p.github && `<a href="${esc(p.github)}" target="_blank" rel="noopener">code ↗</a>`,
    ].filter(Boolean).join("");
    return `
      <li class="prow">
        <span class="prow__n">${String(i + 1).padStart(2, "0")}</span>
        <h3 class="prow__title">${esc(p.title)}${p.label ? ` <span class="prow__label">${esc(p.label)}</span>` : ""}</h3>
        <span class="prow__stack">${p.stack.map(esc).join(" / ")}</span>
        <span class="prow__year">${esc(p.year)}</span>
        <span class="prow__links">${links}</span>
        ${p.description ? `<p class="prow__desc">${esc(p.description)}</p>` : ""}
      </li>`;
  }).join("");

  // --- contact ----------------------------------------------------------
  const labels = { github: "GitHub", linkedin: "LinkedIn", email: "Email" };
  $("links").innerHTML = Object.entries(S.links)
    .filter(([, url]) => url)
    .map(([k, url]) => {
      const href = k === "email" ? `mailto:${url}` : url;
      const shown = url.replace(/^https?:\/\/(www\.)?/, "");
      return `<li><span>${labels[k] || k}</span><a href="${esc(href)}" target="_blank" rel="noopener">${esc(shown)}</a></li>`;
    })
    .join("");
})();
