(function () {
  // ---- CONFIG ----
  // To enable a hosted contact form (recommended), create a Formspree form and paste the endpoint below.
  // Example: https://formspree.io/f/abcdwxyz
  const FORMSPREE_ENDPOINT = "";

  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  // Mobile nav
  const navBtn = $('#navToggle');
  const nav = $('#siteNav');
  if (navBtn && nav) {
    navBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navBtn.setAttribute('aria-expanded', String(open));
    });
    $$('#siteNav a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      navBtn.setAttribute('aria-expanded', 'false');
    }));
  }

  // Smooth scroll with header offset
  const header = $('.header');
  const headerH = () => header ? header.getBoundingClientRect().height : 0;

  $$('.scroll').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      const target = $(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - (headerH() + 12);
      window.scrollTo({ top, behavior: 'smooth' });
      history.replaceState(null, '', href);
    });
  });

  // Active link on scroll
  const sections = ['#solutions', '#brands', '#process', '#architects', '#specs', '#contact']
    .map(id => $(id))
    .filter(Boolean);
  const navLinks = $$('#siteNav a[href^="#"]');

  const setActive = () => {
    const y = window.scrollY + headerH() + 40;
    let currentId = sections[0]?.id;
    for (const s of sections) {
      if (s.offsetTop <= y) currentId = s.id;
    }
    navLinks.forEach(l => {
      const id = (l.getAttribute('href') || '').replace('#','');
      l.classList.toggle('active', id === currentId);
    });
  };
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

  // Contact form: lightweight client-side validation + friendly status
  const form = $("#contactForm");
  const status = $('#formStatus');
  const preferWhatsApp = $('#preferWhatsApp');

  function setStatus(msg, type='info') {
    if (!status) return;
    status.textContent = msg;
    status.className = 'formStatus ' + type;
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const message = String(data.get('message') || '').trim();
      const company = String(data.get('company') || '').trim();
      const role = String(data.get('role') || '');

      if (!name || !email || !message) {
        setStatus('Please fill in your name, email, and message.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus('Please enter a valid email address.', 'error');
        return;
      }

      // If WhatsApp is preferred, open WhatsApp with a prefilled message (still submit if endpoint is configured)
      if (preferWhatsApp && preferWhatsApp.checked) {
        const txt = `Hi Specaide — I'm ${name}${company ? ' from ' + company : ''}.\n\nRole: ${role || '—'}\nEmail: ${email}\n\nMessage:\n${message}`;
        const wa = `https://wa.me/918882941379?text=${encodeURIComponent(txt)}`;
        window.open(wa, '_blank', 'noopener,noreferrer');
      }

      const endpoint = (FORMSPREE_ENDPOINT || form.getAttribute('action') || '').trim();
      if (!endpoint) {
        // fallback: mailto
        const subject = `Website enquiry${company ? ' — ' + company : ''}`;
        const body = `Name: ${name}\nCompany: ${company || '—'}\nRole: ${role || '—'}\nEmail: ${email}\n\nMessage:\n${message}`;
        window.location.href = `mailto:Shradha@specaide.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setStatus('Opening your email client… If nothing happens, email Shradha@specaide.com.', 'ok');
        form.reset();
        return;
      }

      try {
        setStatus('Sending…', 'info');
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: data
        });
        if (res.ok) {
          setStatus('Thanks — we\'ll get back to you shortly.', 'ok');
          form.reset();
        } else {
          setStatus('Could not send right now. Please email Shradha@specaide.com.', 'error');
        }
      } catch {
        setStatus('Network error. Please email Shradha@specaide.com.', 'error');
      }
    });
  }
})();
