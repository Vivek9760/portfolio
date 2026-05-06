const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mx = -200,
  my = -200,
  rx = -200,
  ry = -200;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});

function animCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animCursor);
}
animCursor();

document.querySelectorAll("a, button, .skill-cat, .project-card, .contact-item").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.width = "20px";
    cursor.style.height = "20px";
    cursor.style.background = "rgba(123,97,255,0.9)";
    cursor.style.boxShadow = "0 0 20px rgba(123,97,255,0.8)";
    ring.style.width = "52px";
    ring.style.height = "52px";
    ring.style.borderColor = "rgba(123,97,255,0.5)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.width = "12px";
    cursor.style.height = "12px";
    cursor.style.background = "rgba(0,229,160,0.9)";
    cursor.style.boxShadow = "0 0 12px rgba(0,229,160,0.8)";
    ring.style.width = "36px";
    ring.style.height = "36px";
    ring.style.borderColor = "rgba(0,229,160,0.4)";
  });
});

// ── Cursor trail ──
let lastTrail = 0;
document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastTrail < 45) return;
  lastTrail = now;
  const p = document.createElement("div");
  p.style.cssText = `position:fixed;pointer-events:none;z-index:9997;left:${e.clientX}px;top:${e.clientY}px;width:4px;height:4px;border-radius:50%;background:rgba(0,229,160,0.5);transform:translate(-50%,-50%);transition:all .6s ease;`;
  document.body.appendChild(p);
  requestAnimationFrame(() => {
    p.style.opacity = "0";
    p.style.transform = `translate(${(Math.random() - 0.5) * 30}px,${(Math.random() - 0.5) * 30 - 20}px) scale(0)`;
  });
  setTimeout(() => p.remove(), 650);
});

// ── Scroll reveal ──
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
);
document.querySelectorAll(".reveal, .stagger").forEach((el) => obs.observe(el));

// ── Active nav ──
const sections = document.querySelectorAll("[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let cur = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 100) cur = s.id;
  });
  navLinks.forEach((a) => {
    a.style.color = a.getAttribute("href") === "#" + cur ? "var(--accent)" : "";
  });
});

// ── Parallax orbs ──
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 40;
  const y = (e.clientY / window.innerHeight - 0.5) * 40;
  document.querySelector(".orb-1").style.transform = `translate(${x * 0.6}px,${y * 0.6}px)`;
  document.querySelector(".orb-2").style.transform = `translate(${-x * 0.4}px,${-y * 0.4}px)`;
  document.querySelector(".orb-3").style.transform = `translate(${x * 0.25}px,${y * 0.25}px)`;
});

// ── 3D card tilt ──
function addTilt(sel) {
  document.querySelectorAll(sel).forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      const px = ((e.clientX - r.left) / r.width) * 100;
      const py = ((e.clientY - r.top) / r.height) * 100;
      card.style.transform = `perspective(800px) rotateX(${-dy * 7}deg) rotateY(${dx * 7}deg) translateY(-8px)`;
      card.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(0,229,160,0.07) 0%, var(--surface) 60%)`;
      card.style.transition = "transform .08s, box-shadow .2s, background 0s";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.background = "";
      card.style.transition = "transform .4s ease, box-shadow .3s, border-color .3s, background .4s";
    });
  });
}
addTilt(".project-card");
addTilt(".skill-cat");
addTilt(".exp-card");

// ── Magnetic buttons ──
document.querySelectorAll(".btn-primary, .btn-ghost").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const r = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    btn.style.transform = `translate(${dx * 0.25}px,${dy * 0.25 - 2}px)`;
    btn.style.transition = "transform .1s";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "";
    btn.style.transition = "transform .4s cubic-bezier(.34,1.56,.64,1)";
  });
});

// ── Year ──
document.getElementById("yr").textContent = new Date().getFullYear();
