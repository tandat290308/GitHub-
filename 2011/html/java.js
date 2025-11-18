// --- MỞ TRANG CHÍNH KHI ẤN NÚT ---
const enterBtn = document.getElementById('enterBtn');
const welcome = document.getElementById('welcome');
// const mainContent = document.getElementById('mainContent');

enterBtn.addEventListener('click', () => {


    
    // Ẩn trang chào
    welcome.style.opacity = '0';
    welcome.style.transition = 'opacity .5s ease';
    setTimeout(() => { welcome.style.display = 'none'; }, 500);

});

// Basic slideshow controller
const slides = Array.from(document.querySelectorAll('.slide'));
const caption = document.getElementById('slide-caption');
const progress = document.getElementById('progress');
const bg = document.getElementById('bgmusic');
let muted = false;



let idx = 0;
let playing = true;
let autoplayInterval = 4500; // ms
let timer = null;

function show(i) {
     bg.muted = false; 
    bg.play();
    slides.forEach((s, k) => s.classList.toggle('show', k === i));
    const c = slides[i].dataset.caption || '';
    caption.textContent = c;
    progress.textContent = (i + 1) + ' / ' + slides.length;
    // subtle typewriter highlight change
    const t = document.getElementById('typewriter');
    t.style.opacity = 0.95; t.style.transform = 'translateY(0px)';
}
function next() { idx = (idx + 1) % slides.length; show(idx); }
function prev() { idx = (idx - 1 + slides.length) % slides.length; show(idx); }
document.getElementById('next').addEventListener('click', () => { pause(); next(); });
document.getElementById('prev').addEventListener('click', () => { pause(); prev(); });
function startAuto() { if (timer) clearInterval(timer); timer = setInterval(() => { next(); }, autoplayInterval); playing = true; document.getElementById('playpause').textContent = '⏸️ Tạm dừng'; }
function pause() { if (timer) clearInterval(timer); timer = null; playing = false; document.getElementById('playpause').textContent = '▶️ Phát'; }
document.getElementById('playpause').addEventListener('click', () => { if (playing) pause(); else startAuto(); });
// Music control
bg.volume = 0.55;
document.getElementById('mute').addEventListener('click', () => {
    muted = !muted; bg.muted = muted; document.getElementById('mute').textContent = muted ? '🔇 Tắt nhạc' : '🔈 Nhạc';
});
// Auto start
startAuto();
// Attempt to play music (some browsers block autoplay) — user can press the Play button.

// bg.play().catch(() => {/* blocked */ });

// Confetti implementation (simple)
// const canvas = document.getElementById('confetti');
// const ctx = canvas.getContext('2d');
// let W, H;
// function resize() { W = canvas.width = canvas.clientWidth; H = canvas.height = canvas.clientHeight; }
// window.addEventListener('resize', resize); resize();
// function random(min, max) { return Math.random() * (max - min) + min }
// let confettiPieces = [];
// function makeConfetti() {
//     const count = 90;
//     confettiPieces = [];
//     for (let i = 0; i < count; i++) {
//         confettiPieces.push({
//             x: random(0, W),
//             y: random(-H, 0),
//             w: random(6, 12),
//             h: random(8, 16),
//             vx: random(-0.6, 0.6),
//             vy: random(1, 3.2),
//             rot: random(0, Math.PI * 2),
//             rotSpeed: random(-0.06, 0.06),
//             color: ['#ff6b6b', '#ffd166', '#6bcB77', '#6bd0ff'][Math.floor(random(0, 4))]
//         })
//     }
// }
function drawConfetti() {
    ctx.clearRect(0, 0, W, H);
    for (const p of confettiPieces) {
        p.x += p.vx; p.y += p.vy; p.rot += p.rotSpeed; p.vy += 0.02; // gravity
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
    }
    confettiPieces = confettiPieces.filter(p => p.y < H + 50);
}
let confettiPlaying = false; let confettiAnim = null;
function confettiLoop() { drawConfetti(); if (confettiPieces.length > 0) { confettiAnim = requestAnimationFrame(confettiLoop); } else { stopConfetti(); } }
function startConfetti() { if (confettiPlaying) return; confettiPlaying = true; makeConfetti(); confettiLoop(); }
function stopConfetti() { confettiPlaying = false; if (confettiAnim) cancelAnimationFrame(confettiAnim); confettiAnim = null; ctx.clearRect(0, 0, W, H); }
document.getElementById('toggle-confetti').addEventListener('click', () => {
    if (confettiPlaying) stopConfetti(); else startConfetti();
});
// Small typewriter entrance effect for header
(function typeIn() { const el = document.getElementById('typewriter'); el.style.transition = 'transform 0.8s ease, opacity 0.9s ease'; el.style.transform = 'translateY(-6px)'; el.style.opacity = 1; })();
// Accessibility: let keyboard control slideshow
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { pause(); next(); }
    if (e.key === 'ArrowLeft') { pause(); prev(); }
    if (e.key === ' ') { e.preventDefault(); if (playing) pause(); else startAuto(); }
});
// If user clicks any slide, pause - lets them read
document.getElementById('slides').addEventListener('click', pause);
// Initial caption
show(idx);
// Helpful: quickly let user replace images programmatically (example)
// Usage: setImages(['url1','url2',...])
function setImages(imgs) {
    const slideWrap = document.getElementById('slides');
    slideWrap.innerHTML = '';
    imgs.forEach((u, i) => {
        const d = document.createElement('div'); d.className = 'slide'; if (i === 0) d.classList.add('show');
        d.style.backgroundImage = `url('${u}')`;
        d.dataset.caption = '';
        slideWrap.appendChild(d);
    });
}
// Expose for quick tweaks in console
window._greeting = { next, prev, startAuto, pause, startConfetti, stopConfetti, setImages };
// --- HIỆU ỨNG RƠI BIỂU TƯỢNG ---
const icons = ["❤️", "🩷", "🧡", "💛", "💚", "💙", "🩵", "💜", "🤎", "🖤", "🩶", "🤍", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "❤️‍🔥", "❤️‍🩹", "🫶", "🫰", "🤟", "🫀", "👫", "💑", "💏", "💋", "♥️", "😍", "🎓", "⭐"];

function createFalling() {
    const el = document.createElement('div');
    el.className = 'fallingIcon';
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (20 + Math.random() * 20) + 'px';
    el.style.animationDuration = (3 + Math.random() * 4) + 's';
    document.body.appendChild(el);

    setTimeout(() => el.remove(), 7000);
}

// tạo rơi đều đặn nhưng không quá dày
timer = setInterval(createFalling, 150);

// Hiển thị hiệu ứng tim sau 200s
setTimeout(() => {
    document.getElementById('heartEffect').style.display = 'block';
    startHeartEffect();
}, 200000);
// --- HEART EFFECT CODE ---
// function startHeartEffect() {
//     const canvas = document.getElementById('pinkboard');
//     const ctx = canvas.getContext('2d');

//     let width, height, hearts = [];

//     function resize() {
//         width = canvas.width = innerWidth;
//         height = canvas.height = innerHeight;
//     }
//     resize();
//     window.addEventListener('resize', resize);

//     function Heart() {
//         this.x = Math.random() * width;
//         this.y = height + Math.random() * 200;
//         this.size = 10 + Math.random() * 20;
//         this.speed = 1 + Math.random() * 2;
//         this.alpha = 0.7 + Math.random() * 0.3;
//         this.color = `hsl(${Math.random() * 360}, 80%, 70%)`;
//     }

//     Heart.prototype.draw = function () {
//         ctx.save();
//         ctx.translate(this.x, this.y);
//         ctx.scale(this.size / 20, this.size / 20);
//         ctx.beginPath();
//         ctx.moveTo(0, -10);
//         ctx.bezierCurveTo(12, -25, 35, -5, 0, 20);
//         ctx.bezierCurveTo(-35, -5, -12, -25, 0, -10);
//         ctx.fillStyle = this.color;
//         ctx.globalAlpha = this.alpha;
//         ctx.fill();
//         ctx.restore();
//     };

//     function update() {
//         ctx.clearRect(0, 0, width, height);
//         if (hearts.length < 50) hearts.push(new Heart());

//         hearts.forEach((h, i) => {
//             h.y -= h.speed;
//             h.x += Math.sin(Date.now() / 300 + i) * 0.5;
//             if (h.y < -40) hearts[i] = new Heart();
//             h.draw();
//         });

//         requestAnimationFrame(update);
//     }
//     update();
// }