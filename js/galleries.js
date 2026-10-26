// Gallery data
const galleries = {
  iit: {
    title: 'IIT Surat — Synergy Arena',
    images: [
      { src: 'images/projects/iit-01.jpg', caption: 'Aerial view — Synergy Arena complex' },
      { src: 'images/projects/iit-01.jpg', caption: 'North elevation with glass dome' },
      { src: 'images/projects/iit-04.jpg', caption: 'Landscaped courtyard & approach' },
    ]
  },
  srd: {
    title: 'SRD CBSE School — Prakriya Architects',
    images: [
      { src: 'images/projects/srd-01.jpg', caption: 'South facade — The Curious Lab signage' },
      { src: 'images/projects/srd-02.jpg', caption: 'Street-level elevation — SRD branding' },
      { src: 'images/projects/srd-02.jpg', caption: 'Rear elevation — vertical greens & murals' },
      { src: 'images/projects/srd-03.jpg', caption: 'Corner view — circular gateway arch' },
      { src: 'images/projects/srd-04.jpg', caption: 'Side facade — exposed brick & terraces' },
    ]
  },
  sbi: {
    title: 'SBI Bhubaneswar, Odisha',
    images: [
      { src: 'images/projects/sbi-01.jpg', caption: 'SBI Bhubaneswar — site view 1' },
      { src: 'images/projects/sbi-02.jpg', caption: 'SBI Bhubaneswar — site view 2' },
      { src: 'images/projects/sbi-03.jpg', caption: 'SBI Bhubaneswar — site view 3' },
    ]
  },
  smjv: {
    title: 'SMJV Auditorium — Shree Mahaveer Jain Vidyalay, Pune',
    images: [
     //  { src: 'images/projects/smjv-01.jpg' },
      { src: 'images/projects/smjv-02.jpg' },
      // { src: 'images/projects/smjv-03.jpg' },
      // { src: 'images/projects/smjv-04.jpg' },
      // { src: 'images/projects/smjv-05.jpg' }
    ]
  },
  mml: {
    title: "Marathwada Mitra Mandal, Lohgaon \u2014 5-Floor Extension",
    images: [
      // { src: 'images/projects/mml-01.jpg' },
      { src: 'images/projects/mml-02.jpg' },
      { src: 'images/projects/mml-03.jpg' },
      // { src: 'images/projects/mml-04.jpg' },
      // { src: 'images/projects/mml-05.jpg' },
      { src: 'images/projects/mml-06.jpg' },
      // { src: 'images/projects/mml-07.jpg' }
    ]
  },
};

let currentGallery = null;
let currentIndex = 0;

function openLightbox(galleryKey, idx) {
  currentGallery = galleryKey;
  currentIndex = idx;
  const lb = document.getElementById('cpLightbox');
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderLightbox();
}

function closeLightbox() {
  document.getElementById('cpLightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function closeLightboxOnBg(e) {
  if (e.target === document.getElementById('cpLightbox')) closeLightbox();
}

function renderLightbox() {
  const g = galleries[currentGallery];
  const item = g.images[currentIndex];
  const img = document.getElementById('lbImg');
  const loader = document.querySelector('.cp-lb-loader');

  loader.style.opacity = '1';
  img.style.opacity = '0';

  img.onload = () => {
    loader.style.opacity = '0';
    img.style.opacity = '1';
  };
  img.src = item.src;
  document.getElementById('lbTitle').textContent = item.caption || g.title;
  document.getElementById('lbCounter').textContent = (currentIndex + 1) + ' / ' + g.images.length;

  // Thumbnails
  const thumbs = document.getElementById('lbThumbs');
  thumbs.innerHTML = g.images.map((im, i) =>
    `<img src="${im.src}" class="cp-lb-thumb ${i === currentIndex ? 'active' : ''}" onclick="jumpLb(${i})" alt="">`
  ).join('');
}

function lbNav(dir) {
  const g = galleries[currentGallery];
  currentIndex = (currentIndex + dir + g.images.length) % g.images.length;
  renderLightbox();
}

function jumpLb(idx) {
  currentIndex = idx;
  renderLightbox();
}

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (!document.getElementById('cpLightbox').classList.contains('open')) return;
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'ArrowLeft') lbNav(-1);
  if (e.key === 'Escape') closeLightbox();
});

// Filter functionality
document.querySelectorAll('.cp-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cp-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.cp-card').forEach(card => {
      if (filter === 'all' || card.dataset.type === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
