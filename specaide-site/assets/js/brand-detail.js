(function(){
  const brands = window.SPECAIDE_BRANDS || [];
  const $ = (s, r=document) => r.querySelector(s);

  function getParam(name){
    const url = new URL(window.location.href);
    return url.searchParams.get(name) || '';
  }

  const slug = getParam('b');
  const brand = brands.find(x => x.slug === slug) || brands[0];
  if (!brand) return;

  const crumbName = $('#crumbName');
  const brandName = $('#brandName');
  const brandBlurb = $('#brandBlurb');
  const brandMeta = $('#brandMeta');
  const oemLink = $('#oemLink');
  const pdfLink = $('#pdfLink');

  document.title = `${brand.name} | specaide`;
  if (crumbName) crumbName.textContent = brand.name;
  if (brandName) brandName.textContent = brand.name;
  if (brandBlurb) brandBlurb.textContent = brand.blurb || '';

  // Tags
  if (brandMeta){
    brandMeta.innerHTML = '';
    const tags = [];
    if (brand.category) tags.push(brand.category);
    if (!brand.oemUrl) tags.push('In-house / Specaide');
    tags.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = t;
      brandMeta.appendChild(span);
    });
  }

  // OEM link
  if (oemLink){
    if (brand.oemUrl){
      oemLink.href = brand.oemUrl;
      oemLink.style.display = '';
      oemLink.textContent = 'Visit OEM website';
    } else {
      oemLink.style.display = 'none';
    }
  }

  // Brochure/spec request
  if (pdfLink){
    if (brand.pdf){
      pdfLink.href = `../${brand.pdf}`;
      pdfLink.textContent = 'Open brochure (PDF)';
      pdfLink.style.display = '';
    } else {
      const msg = encodeURIComponent(`Hi Specaide, please share the brochure/specifications for ${brand.name}.`);
      pdfLink.href = `https://wa.me/918882941379?text=${msg}`;
      pdfLink.textContent = 'Request brochure / specs';
      pdfLink.style.display = '';
    }
  }
})();
