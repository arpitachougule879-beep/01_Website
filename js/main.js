// Custom cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    setTimeout(() => {
      ring.style.left = e.clientX + 'px';
      ring.style.top = e.clientY + 'px';
    }, 80);
  });
  document.querySelectorAll('a, button, .service-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px'; cursor.style.height = '20px';
      ring.style.width = '60px'; ring.style.height = '60px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '12px'; cursor.style.height = '12px';
      ring.style.width = '40px'; ring.style.height = '40px';
    });
  });

  // Navbar scroll
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Award certificate lightbox
  function openAwardLightbox(src, caption) {
    const lb = document.getElementById('awardLightbox');
    document.getElementById('awardLbImg').src = src;
    document.getElementById('awardLbImg').alt = caption;
    document.getElementById('awardLbCaption').textContent = caption;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeAwardLightbox() {
    document.getElementById('awardLightbox').classList.remove('open');
    document.body.style.overflow = '';
  }
  function closeAwardLightboxOnBg(e) {
    if (e.target.id === 'awardLightbox') closeAwardLightbox();
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAwardLightbox();
  });

  // Form submit
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('.form-submit');
    const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'; // ← Replace with your Formspree ID

    // Show loading state
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    // Collect form data
    const data = {};
    form.querySelectorAll('input, textarea, select').forEach(el => {
      if (el.name) data[el.name] = el.value;
    });
    // Also collect unnamed fields by placeholder
    const inputs = form.querySelectorAll('input, textarea, select');
    const labels = ['name','email','phone','service','message'];
    inputs.forEach((el, i) => { if (!el.name && labels[i]) el.name = labels[i]; data[labels[i]] = el.value; });

    if (FORMSPREE_ID === 'YOUR_FORMSPREE_ID') {
      // Demo mode — no Formspree ID yet
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Demo: Add Formspree ID to send real emails';
        btn.style.background = '#c87a00';
        btn.disabled = false;
        setTimeout(() => {
          btn.innerHTML = 'Send Enquiry <i class="fas fa-paper-plane"></i>';
          btn.style.background = '';
          form.reset();
        }, 4000);
      }, 800);
      return;
    }

    try {
      const res = await fetch('https://formspree.io/f/' + FORMSPREE_ID, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        btn.innerHTML = '<i class="fas fa-check"></i> Enquiry Sent!';
        btn.style.background = '#2a7a4a';
        form.reset();
      } else {
        throw new Error('Failed');
      }
    } catch {
      btn.innerHTML = '<i class="fas fa-times"></i> Failed — Try Again';
      btn.style.background = '#c84b2f';
    }
    btn.disabled = false;
    setTimeout(() => {
      btn.innerHTML = 'Send Enquiry <i class="fas fa-paper-plane"></i>';
      btn.style.background = '';
    }, 4000);
  }
