(function(){
  const brands = (window.SPECAIDE_BRANDS || []).slice();
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  const grid = $('#brandGrid');
  const filter = $('#categoryFilter');
  const search = $('#brandSearch');

  const categories = Array.from(new Set(brands.map(b => b.category))).sort();
  if (filter) {
    filter.innerHTML = `<option value="">All categories</option>` + categories.map(c => `<option value="${c}">${c}</option>`).join('');
  }

  function card(b) {
    const oem = b.oemUrl ? `<a class="mini" href="${b.oemUrl}" target="_blank" rel="noopener">Visit OEM website</a>` : `<span class="mini muted">In-house solution</span>`;
    const msg = encodeURIComponent(`Hi Specaide, please share the brochure/specifications for ${b.name}.`);
    const pdf = `<a class="mini" href="https://wa.me/918882941379?text=${msg}" target="_blank" rel="noopener">Request brochure / specs</a>`;
    const detail = `brand.html?b=${encodeURIComponent(b.slug)}`;

    return `
      <article class="brand-card">
        <div>
          <h3><a class="brand-link" href="${detail}">${b.name}</a></h3>
          <p>${b.blurb}</p>
          <div class="mini-row">${oem}<span class="dot">•</span>${pdf}</div>
        </div>
        <span class="pill">${b.category}</span>
      </article>
    `;
  }

  function render() {
    if (!grid) return;
    const q = (search?.value || '').trim().toLowerCase();
    const c = (filter?.value || '').trim();

    const rows = brands.filter(b => {
      const okC = !c || b.category === c;
      const okQ = !q || (b.name + ' ' + b.category + ' ' + (b.blurb||'')).toLowerCase().includes(q);
      return okC && okQ;
    });

    grid.innerHTML = rows.map(card).join('') || `<div class="note"><p>No matches. Try a different search.</p></div>`;
  }

  if (filter) filter.addEventListener('change', render);
  if (search) search.addEventListener('input', render);
  render();
})();
