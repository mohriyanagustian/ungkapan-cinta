/* ══════════════════════════════════════════
   BIRTHDAY LUXURY — script.js
   Features: Particles · Countdown · Pesan ·
   Galeri Lightbox · Puisi Tabs · Doa Animate ·
   Surat Envelope · Music Player · Wish Board ·
   Navbar scroll · Back-to-top · Confetti
══════════════════════════════════════════ */

// ─── POPUP ───────────────────────────────
function masuk() {
  const popup = document.getElementById('popup');
  popup.style.transition = 'opacity 0.7s ease';
  popup.style.opacity = '0';
  setTimeout(() => { popup.style.display = 'none'; }, 700);
  launchConfetti();
  startCountdown();
  startParticles();
}

// ─── SMOOTH SCROLL ───────────────────────
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ─── NAVBAR ──────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');

  const btn = document.getElementById('backTop');
  if (window.scrollY > 400) btn.classList.add('visible');
  else btn.classList.remove('visible');
});

function toggleNav() {
  document.getElementById('navMobile').classList.toggle('open');
}
function closeNav() {
  document.getElementById('navMobile').classList.remove('open');
}

// ─── PARTICLES ───────────────────────────
function startParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  const SYMBOLS = ['✦', '✧', '◇', '·', '⋆'];
  const COLORS  = ['rgba(212,175,55,', 'rgba(245,230,163,', 'rgba(192,57,94,'];
  const count   = 55;

  const pts = Array.from({ length: count }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    size: 8 + Math.random() * 10,
    sym: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    col: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: 0.05 + Math.random() * 0.2,
    pulse: Math.random() * Math.PI * 2,
  }));

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.pulse += 0.015;
      const a = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
      ctx.fillStyle = p.col + a + ')';
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.sym, p.x, p.y);
      p.x += p.vx; p.y += p.vy;
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20;
      if (p.y > H + 20) p.y = -20;
    });
    requestAnimationFrame(loop);
  })();
}

// Start particles immediately too
document.addEventListener('DOMContentLoaded', startParticles);

// ─── COUNTDOWN ───────────────────────────
function startCountdown() {
  const target = new Date('2026-11-10T00:00:00');

  function tick() {
    const now  = new Date();
    const diff = target - now;

    if (diff <= 0) {
      document.getElementById('countdown').style.display = 'none';
      document.getElementById('birthday-msg').style.display = 'block';
      launchConfetti();
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    document.getElementById('cd-days').textContent  = String(d).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-mins').textContent  = String(m).padStart(2, '0');
    document.getElementById('cd-secs').textContent  = String(s).padStart(2, '0');

    setTimeout(tick, 1000);
  }
  tick();
}

// ─── PESAN ───────────────────────────────
const pesanData = [
  {
    icon: '💌',
    text: 'Selamat ulang tahun ke-25, sayang. Semoga setiap harimu dipenuhi kebahagiaan yang tulus dan keberkahan yang tak pernah habis. Usiamu yang baru ini semoga menjadi babak terindah dalam hidupmu.'
  },
  {
    icon: '🌹',
    text: 'Terima kasih karena telah menjadi bagian terindah dalam hidupku. Setiap momen bersamamu adalah hadiah yang paling berharga. Kehadiranmu mengubah duniaku menjadi lebih bermakna dan lebih berwarna.'
  },
  {
    icon: '❤️',
    text: 'Aku berharap senyummu selalu menghiasi setiap langkah perjalanan hidupmu. Karena senyummu adalah keajaiban kecil yang membuatku jatuh cinta setiap harinya, tanpa pernah berhenti.'
  },
  {
    icon: '🎂',
    text: 'Hari ini adalah hari spesial untuk seseorang yang sangat berarti bagiku. Semesta seolah merayakanmu — dan memang sudah sepatutnya begitu, karena kamu adalah keistimewaan itu sendiri.'
  },
  {
    icon: '👑',
    text: 'Kamu adalah hadiah terindah yang pernah hadir dalam hidupku. Setiap tawa, setiap peluk, setiap kata darimu adalah perhiasan yang tak ternilai. Selamat ulang tahun, cintaku.'
  },
  {
    icon: '🌙',
    text: 'Di setiap malam ketika aku menatap langit, aku selalu teringat padamu. Kamu adalah bintang paling terang yang pernah ada di langitku — selalu ada, selalu menerangi, selalu menakjubkan.'
  },
  {
    icon: '⭐',
    text: 'Kamu bersinar seperti bintang, sayang. Di manapun kamu berada, cahayamu selalu terasa. Dan aku sangat bersyukur bisa menjadi orang yang paling dekat dengan cahaya itu setiap harinya.'
  }
];

function showMsg(i) {
  const card = document.getElementById('pesan-card');
  card.style.opacity = '0';
  card.style.transform = 'translateY(10px)';

  setTimeout(() => {
    document.getElementById('pesan-icon').textContent = pesanData[i].icon;
    document.getElementById('pesan-text').textContent = pesanData[i].text;
    card.style.transition = 'opacity 0.4s, transform 0.4s';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 250);

  document.querySelectorAll('.pesan-btn').forEach((b, idx) => {
    b.classList.toggle('active', idx === i);
  });
}

// Init pesan
showMsg(0);

// ─── GALERI / LIGHTBOX ───────────────────
const lbData = [
  { img: true,  src: 'anggiani.jpg', caption: 'Kamu yang Selalu Indah ✨' },
  { img: true,  src: 'foto1.jpg',    caption: 'Kenangan Indah Bersamamu 💌' },
  { img: true,  src: 'foto2.jpg',    caption: 'Momen Bahagia Kita 💫' },
  { img: true,  src: 'foto3.jpg',    caption: 'Kebersamaan yang Tak Terlupakan 🌹' },
  { img: true,  src: 'foto4.jpg',    caption: 'Canda Tawa Kita Bersama 🌸' },
];

function openLightbox(i) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lb-img');
  const ph  = document.getElementById('lb-placeholder');
  const cap = document.getElementById('lb-caption');

  const d = lbData[i];
  img.src = d.src;
  img.style.display = 'block';
  ph.style.display  = 'none';
  cap.textContent = d.caption;
  lb.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// ─── PUISI TABS ──────────────────────────
function showPuisi(i) {
  [0, 1, 2].forEach(n => {
    document.getElementById('puisi-' + n).classList.toggle('hidden', n !== i);
  });
  document.querySelectorAll('.puisi-tab').forEach((t, n) => {
    t.classList.toggle('active', n === i);
  });
}

// ─── DOA SCROLL ANIMATION ────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, _) => {
    if (entry.isIntersecting) {
      const cards = document.querySelectorAll('.doa-card');
      cards.forEach((c, idx) => {
        setTimeout(() => c.classList.add('visible'), idx * 90);
      });
      observer.disconnect();
    }
  });
}, { threshold: 0.15 });

const doaSection = document.getElementById('doa');
if (doaSection) observer.observe(doaSection);

// ─── SURAT CINTA ─────────────────────────
function openSurat() {
  const env  = document.getElementById('envelope');
  const letter = document.getElementById('letter');
  env.style.transition = 'opacity 0.4s, transform 0.4s';
  env.style.opacity = '0';
  env.style.transform = 'scale(0.9)';
  setTimeout(() => {
    env.style.display = 'none';
    letter.style.display = 'block';
    letter.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 400);
}

// ─── MUSIC PLAYER ────────────────────────
let audioCtx = null;
let isPlaying = false;
let intervalId = null;

function createAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

// Happy Birthday melody — notes & durations
const HBD = [
  // "Hap-py birth-day to you"
  [261.63, 0.25], [261.63, 0.125], [293.66, 0.375], [261.63, 0.375], [349.23, 0.375], [329.63, 0.75],
  // "Hap-py birth-day to you"
  [261.63, 0.25], [261.63, 0.125], [293.66, 0.375], [261.63, 0.375], [392.00, 0.375], [349.23, 0.75],
  // "Hap-py birth-day dear An-ggi-a-ni"
  [261.63, 0.25], [261.63, 0.125], [523.25, 0.375], [440.00, 0.375], [349.23, 0.375], [329.63, 0.375], [293.66, 0.375],
  // "Hap-py birth-day to you"
  [466.16, 0.25], [466.16, 0.125], [440.00, 0.375], [349.23, 0.375], [392.00, 0.375], [349.23, 0.75],
];

function playNote(freq, start, duration, ctx) {
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(0.35, start + 0.02);
  gain.gain.linearRampToValueAtTime(0, start + duration - 0.02);
  osc.start(start);
  osc.stop(start + duration);
}

function toggleMusic() {
  const btn   = document.getElementById('playBtn');
  const cover = document.querySelector('.music-cover');

  if (isPlaying) {
    if (audioCtx) { audioCtx.close(); audioCtx = null; }
    isPlaying = false;
    btn.textContent = '▶ Play Musik';
    cover.classList.remove('spinning');
    return;
  }

  isPlaying = true;
  btn.textContent = '⏸ Pause Musik';
  cover.classList.add('spinning');

  const ctx = createAudioCtx();
  let t = ctx.currentTime + 0.1;

  HBD.forEach(([freq, dur]) => {
    playNote(freq, t, dur * 0.9, ctx);
    t += dur;
  });

  // Auto stop after melody ends
  setTimeout(() => {
    isPlaying = false;
    btn.textContent = '▶ Play Lagi';
    cover.classList.remove('spinning');
  }, t * 1000 - audioCtx.currentTime * 1000 + 500);
}

// ─── WISH BOARD ──────────────────────────
const defaultWishes = [
  { name: '🌹 Seseorang Istimewa', text: 'Selamat ulang tahun, Anggiani! Semoga selalu bahagia dan sehat selalu ya!' },
  { name: '⭐ Sahabat Terbaik',    text: 'Happy birthday kak! Semoga semua impian terwujud di usia 25 ini 🎉' },
  { name: '💌 Kekasih',            text: 'Kamu adalah yang terbaik. Selamat ulang tahun, cintaku. Aku selalu ada untukmu 🌹' },
];

function renderWishes() {
  const wall = document.getElementById('wishes-wall');
  wall.innerHTML = '';
  defaultWishes.forEach(w => {
    const d = new Date();
    const note = document.createElement('div');
    note.className = 'wish-note';
    note.innerHTML = `
      <div class="wish-note-name">${escHtml(w.name)}</div>
      <div class="wish-note-text">"${escHtml(w.text)}"</div>
      <div class="wish-note-time">Ditulis dengan ❤️</div>
    `;
    wall.appendChild(note);
  });
}

function addWish() {
  const name = document.getElementById('wish-name').value.trim();
  const text = document.getElementById('wish-text').value.trim();
  if (!name || !text) {
    alert('Isi namamu dan harapanmu terlebih dahulu ya 💌');
    return;
  }
  defaultWishes.unshift({ name, text });
  renderWishes();
  document.getElementById('wish-name').value = '';
  document.getElementById('wish-text').value = '';
  launchConfetti();
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

renderWishes();

// ─── CONFETTI ────────────────────────────
function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#d4af37','#f5e6a3','#c0395e','#ff6b8a','#ffffff','#ffd700'];
  const SHAPES = ['circle','rect','star'];

  const pieces = Array.from({ length: 130 }, () => ({
    x: Math.random() * canvas.width,
    y: -10 - Math.random() * 200,
    r: 4 + Math.random() * 7,
    vx: (Math.random() - 0.5) * 3,
    vy: 2 + Math.random() * 4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    rot: Math.random() * Math.PI * 2,
    rv: (Math.random() - 0.5) * 0.15,
    life: 1,
  }));

  let frame = 0;
  (function drop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      p.rot += p.rv;
      if (p.y > canvas.height * 0.7) p.life -= 0.025;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      if (p.shape === 'circle') {
        ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2); ctx.fill();
      } else if (p.shape === 'rect') {
        ctx.fillRect(-p.r, -p.r * 0.5, p.r * 2, p.r);
      } else {
        drawStar(ctx, 0, 0, 5, p.r, p.r * 0.4);
        ctx.fill();
      }
      ctx.restore();
    });
    frame++;
    if (frame < 150) requestAnimationFrame(drop);
    else { ctx.clearRect(0, 0, canvas.width, canvas.height); canvas.remove(); }
  })();
}

function drawStar(ctx, cx, cy, spikes, outerR, innerR) {
  let rot = (Math.PI / 2) * 3;
  const step = Math.PI / spikes;
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerR);
  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR); rot += step;
    ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR); rot += step;
  }
  ctx.lineTo(cx, cy - outerR);
  ctx.closePath();
}

// ─── AUTO-INIT ON LOAD ───────────────────
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
});
