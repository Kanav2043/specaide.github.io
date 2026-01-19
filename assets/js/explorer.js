(function(){
  const DATA = window.SPECAIDE_DATA;

  const el = (sel, root=document) => root.querySelector(sel);
  const els = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  function waLink(extraMessage){
    const base = `https://wa.me/${DATA.contact.phoneE164}`;
    const text = encodeURIComponent(extraMessage || DATA.whatsappPrefill);
    return `${base}?text=${text}`;
  }

  function setContact(){
    const brand = el('#brand');
    if(brand) brand.textContent = 'specaide';
    const email = el('#contactEmail');
    const phone = el('#contactPhone');
    if(email){
      email.textContent = DATA.contact.email;
      email.href = `mailto:${DATA.contact.email}`;
    }
    if(phone){
      phone.textContent = DATA.contact.phoneDisplay;
      phone.href = `tel:${DATA.contact.phoneE164}`;
    }
    els('[data-wa]').forEach(a => a.href = waLink());
  }

  function renderOfficeScene(){
    const container = el('#officeScene');
    if(!container) return;

    // Background: a clean, architectural plan-style SVG (lightweight, scalable)
    container.innerHTML = `
      <div class="office-bg" aria-hidden="true">
        <svg viewBox="0 0 1200 720" role="img" aria-label="Interactive office layout">
          <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stop-color="rgba(255,255,255,0.08)"/>
              <stop offset="1" stop-color="rgba(255,255,255,0.02)"/>
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="1200" height="720" rx="30" fill="url(#g)"/>
          <!-- Zones -->
          <rect x="60" y="80" width="720" height="420" rx="22" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.10)"/>
          <rect x="820" y="80" width="320" height="250" rx="22" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.10)"/>
          <rect x="820" y="360" width="320" height="250" rx="22" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.10)"/>
          <rect x="60" y="530" width="1080" height="140" rx="22" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.10)"/>

          <!-- Open plan desks -->
          ${Array.from({length:6}).map((_,i)=>{
            const x = 110 + (i%3)*210;
            const y = 140 + Math.floor(i/3)*170;
            return `
              <rect x="${x}" y="${y}" width="180" height="80" rx="16" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
              <rect x="${x+18}" y="${y+18}" width="70" height="44" rx="10" fill="rgba(255,255,255,0.03)" />
              <rect x="${x+100}" y="${y+18}" width="62" height="44" rx="10" fill="rgba(255,255,255,0.03)" />
            `;
          }).join('')}

          <!-- Collaboration (soft seating shapes) -->
          <circle cx="910" cy="440" r="48" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
          <circle cx="1030" cy="440" r="48" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
          <rect x="905" y="520" width="170" height="22" rx="11" fill="rgba(255,255,255,0.03)"/>

          <!-- Meeting room table -->
          <rect x="860" y="120" width="240" height="140" rx="30" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
          ${Array.from({length:8}).map((_,i)=>{
            const x = 880 + (i%4)*58;
            const y = 110 + (i<4?0:168);
            return `<circle cx="${x+18}" cy="${y+18}" r="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>`;
          }).join('')}

          <!-- Reception / feature wall -->
          <rect x="90" y="560" width="340" height="80" rx="18" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
          <rect x="460" y="560" width="210" height="80" rx="18" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)"/>
          <rect x="700" y="560" width="410" height="80" rx="18" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)"/>

          <!-- Switchable glass band (meeting room partition) -->
          <rect x="810" y="90" width="340" height="8" rx="4" fill="rgba(255,255,255,0.16)"/>
          <rect x="810" y="330" width="340" height="8" rx="4" fill="rgba(255,255,255,0.10)"/>

          <!-- Acoustic ceiling cloud -->
          <rect x="160" y="96" width="520" height="18" rx="9" fill="rgba(255,255,255,0.08)"/>
          <rect x="160" y="118" width="420" height="12" rx="6" fill="rgba(255,255,255,0.06)"/>
        </svg>
      </div>
    `;

    // Place product visuals (real brand assets extracted from your PDFs / uploads)
    const placements = [
      { id:"seating", x: 155, y: 152, w: 130, img:"assets/images/products/steelcase_siento.jpg", label:"Seating" },
      { id:"workstations", x: 315, y: 150, w: 160, img:"assets/images/products/worklyfe_p-001.png", label:"Workstations" },
      { id:"shikam", x: 525, y: 150, w: 160, img:"assets/images/products/shikam_p-001.png", label:"Custom furniture" },
      { id:"flooring", x: 210, y: 360, w: 190, img:"assets/images/products/amtico_p-01.png", label:"Flooring" },
      { id:"carpets", x: 430, y: 360, w: 190, img:"assets/images/products/smj_p-01.png", label:"Carpet / LVT" },
      { id:"glass", x: 870, y: 130, w: 240, img:"assets/images/products/privetek_p-01.png", label:"Switchable glass" },
      { id:"nano", x: 870, y: 250, w: 240, img:"assets/images/products/nano.png", label:"Privacy film" },
      { id:"acoustics", x: 140, y: 94, w: 240, img:"assets/images/products/bajaj_p-01.png", label:"Acoustics" },
      { id:"lighting", x: 430, y: 92, w: 200, img:"assets/images/products/silentlight_p-01.png", label:"Lighting" },
      { id:"fragrance", x: 920, y: 520, w: 180, img:"assets/images/products/prolitec_p-01.png", label:"Scenting" },
      { id:"artwork", x: 120, y: 535, w: 140, img:"assets/images/products/artwork.png", label:"Artwork" },
    ];

    const layer = document.createElement('div');
    layer.className = 'hotspot-layer';

    placements.forEach(p => {
      const btn = document.createElement('button');
      btn.className = 'hotspot';
      btn.type = 'button';
      btn.dataset.system = p.id;
      btn.style.left = p.x + 'px';
      btn.style.top = p.y + 'px';
      btn.style.width = p.w + 'px';
      btn.setAttribute('aria-label', p.label);

      btn.innerHTML = `
        <span class="hs-pill"><span class="dot"></span>${p.label}</span>
        <img class="hs-img" alt="${p.label} product" loading="lazy" src="${p.img}" />
      `;

      layer.appendChild(btn);
    });

    container.appendChild(layer);
  }

  function openDrawer(systemId){
    const drawer = el('#drawer');
    const overlay = el('#drawerOverlay');
    const title = el('#drawerTitle');
    const subtitle = el('#drawerSubtitle');
    const body = el('#drawerBody');
    const actions = el('#drawerActions');

    const s = DATA.systems[systemId];
    if(!s) return;

    title.textContent = s.title;
    subtitle.textContent = s.subtitle;

    body.innerHTML = `
      <div class="drawer-grid">
        ${s.items.map(item => {
          const oem = item.oemUrl ? `<a class="btn btn-ghost" href="${item.oemUrl}" target="_blank" rel="noopener">Visit OEM site</a>` : `<span class="note">OEM website available upon request</span>`;
          const pdf = item.pdf ? `<a class="btn btn-ghost" href="${item.pdf}" target="_blank" rel="noopener">Open brochure</a>` : '';
          return `
            <div class="brand-card">
              <div class="brand-top">
                <div>
                  <div class="brand-name">${item.name}</div>
                  <div class="brand-meta">${item.productLabel || ''}</div>
                </div>
              </div>
              <div class="brand-media">
                <img src="${item.image}" alt="${item.name} product" loading="lazy" />
              </div>
              <div class="brand-actions">
                ${oem}
                ${pdf}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    const msg = `Hi Specaide — I’m specifying ${s.title} for an office project. Could you share options/specs, lead times, and help with comparison/value engineering?`;
    actions.innerHTML = `
      <a class="btn btn-primary" href="${waLink(msg)}" target="_blank" rel="noopener">Request specs / BOQ on WhatsApp</a>
      <a class="btn btn-ghost" href="mailto:${DATA.contact.email}?subject=${encodeURIComponent('Specification request — ' + s.title)}&body=${encodeURIComponent(msg)}">Email request</a>
    `;

    drawer.classList.add('open');
    overlay.classList.add('open');
    drawer.setAttribute('aria-hidden','false');
  }

  function closeDrawer(){
    const drawer = el('#drawer');
    const overlay = el('#drawerOverlay');
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    drawer.setAttribute('aria-hidden','true');
  }

  function bindInteractions(){
    const container = el('#officeScene');
    if(container){
      container.addEventListener('click', (e) => {
        const btn = e.target.closest('.hotspot');
        if(!btn) return;
        openDrawer(btn.dataset.system);
      });
    }

    const closeBtn = el('#drawerClose');
    const overlay = el('#drawerOverlay');
    if(closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if(overlay) overlay.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') closeDrawer();
    });
  }

  function setHeroCopy(){
    const tagline = el('#tagline');
    if(tagline) tagline.textContent = DATA.tagline;

    const primary = el('#primaryCTA');
    if(primary){
      primary.textContent = DATA.ctaLabel;
      primary.href = waLink(`Hi Specaide — can we do a quick ${DATA.ctaLabel.toLowerCase()}? I’d like to see your portfolio and discuss an upcoming project.`);
    }

    const call = el('#callCTA');
    if(call) call.href = `tel:${DATA.contact.phoneE164}`;
  }

  function init(){
    setContact();
    setHeroCopy();
    renderOfficeScene();
    bindInteractions();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
