/* =========================================================
   Birthday website for Aashu
   ---------------------------------------------------------
   EDIT HERE: your photos, videos and timeline entries.
   Put files in the assets/ folders and list them below.
   ========================================================= */
const CONFIG = {

  // Photos for "Some Memories Never Fade..."
  // ratio = shape of the placeholder shown until your real photo exists ("4 / 5", "1 / 1", "16 / 10"...)
  // Real photos keep their own natural shape. Add or remove lines freely.
  gallery: [
    { src: "IMG-20261120-WA0019.jpg", caption: "Caption for memory 1", ratio: "4 / 5" },
    { src: "IMG-20261120-WA0020.jpg", caption: "Caption for memory 2", ratio: "1 / 1" },
    { src: "IMG-20261120-WA0018.jpg", caption: "Caption for memory 3", ratio: "16 / 11" },
    { src: "IMG-20261120-WA0014.jpg", caption: "Caption for memory 4", ratio: "3 / 4" },
    { src: "IMG-20261120-WA0015.jpg", caption: "Caption for memory 5", ratio: "4 / 3" },
    { src: "IMG-20261120-WA0012.jpg", caption: "Caption for memory 6", ratio: "4 / 5" },
    { src: "IMG-20261120-WA0011.jpg", caption: "Caption for memory 7", ratio: "1 / 1" },
    { src: "IMG-20261120-WA0010.jpg", caption: "Caption for memory 8", ratio: "3 / 4" }
  ],

  // Videos for "Little Moments, Lifetime Memories."
  // poster = thumbnail image (optional, leave "" for none)
  videos: [
    { src: "VID-20261120-WA0025.mp4", poster: "", title: "Memory 1", caption: "" },
    { src: "VID-20261120-WA0028.mp4", poster: "", title: "Memory 2", caption: "" },
    { src: "VID-20261120-WA0029.mp4", poster: "", title: "Memory 3", caption: "" }
  ],

  // Timeline for "Two Brothers. Countless Memories."
  // text = short line on the card, more = extra line shown when the card is tapped
  // date = optional small label on the card (leave out or "" for none)
  timeline: [
    { title: "Our First Memorable Moment", text: "Every beautiful bond has moments that make it special, and every moment spent with you has become a memory worth keeping.", more: "I may not remember every little detail, but I will always remember how special those moments felt. Some memories never fade, especially when they are made with someone who means so much." },
    { title: "A Funny Experience", text: "From silly jokes to endless laughter, we have shared so many moments that can make us smile even on the worst days.", more: "Sometimes we laugh at the most random things, and honestly, those little crazy moments are among my favourite memories. Life would be a lot less fun without you, Bhai!" },
    { title: "A Special Celebration", text: "Celebrations become even more beautiful when shared with the people who matter most. Every special occasion with you adds another beautiful memory to my life.", more: "It's never just about the occasion, the gifts or the celebrations. It's about having you there, sharing happiness and making moments that I will always cherish." },
    { title: "Our Adventure Together", text: "Every journey becomes special when you have the right person beside you. Whether it's a little outing or a big adventure, being together makes it memorable.", more: "It's not always about where we go, but about the fun, conversations, laughter and little unexpected moments along the way. I hope we create countless more adventures together." },
    { title: "An Unforgettable Memory", text: "Among all the memories life gives us, some moments hold a special place in our hearts. For me, every moment that reminds me of our bond is one of them.", more: "No matter how many years pass or how much life changes, I never want to lose the bond we share. You will always be an irreplaceable part of my life, Sachin. Forever brothers!" }
  ]
};


/* =========================================================
   Code below normally needs no changes.
   ========================================================= */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isSmall = () => window.innerWidth < 700;

  function esc(str) {
    const d = document.createElement("div");
    d.textContent = str == null ? "" : String(str);
    return d.innerHTML;
  }

  /* ---------- Toast ---------- */
  const toastEl = $("#toast");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3200);
  }

  /* ---------- Loader ---------- */
  const loader = $("#loader");
  const loadStart = performance.now();
  let loaderGone = false;
  function hideLoader() {
    if (loaderGone) return;
    loaderGone = true;
    const wait = Math.max(0, 1100 - (performance.now() - loadStart));
    setTimeout(() => loader.classList.add("done"), wait);
  }
  window.addEventListener("load", hideLoader);
  setTimeout(hideLoader, 4000);

  /* ---------- Cake artwork ---------- */
  const cakeTpl = $("#cakeTemplate");
  $$("[data-cake]").forEach((el) => el.appendChild(cakeTpl.content.cloneNode(true)));

  /* ---------- Welcome stars ---------- */
  (function makeStars() {
    const box = $("#stars");
    const n = isSmall() ? 45 : 90;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      const size = 1 + Math.random() * 2.5;
      s.style.width = s.style.height = size + "px";
      s.style.setProperty("--t", 2 + Math.random() * 4 + "s");
      s.style.setProperty("--dl", Math.random() * 4 + "s");
      frag.appendChild(s);
    }
    box.appendChild(frag);
  })();

  /* ---------- Golden particles (canvas) ---------- */
  const pCanvas = $("#particles");
  const pCtx = pCanvas.getContext("2d");
  let particles = [];
  let pw = 0, ph = 0, pRunning = true, pLoopActive = false;

  function sizeParticles() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    pw = window.innerWidth; ph = window.innerHeight;
    pCanvas.width = pw * dpr; pCanvas.height = ph * dpr;
    pCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = isSmall() ? 28 : 55;
    particles = Array.from({ length: count }, () => newParticle(true));
  }
  function newParticle(anywhere) {
    return {
      x: Math.random() * pw,
      y: anywhere ? Math.random() * ph : ph + 10,
      r: 0.8 + Math.random() * 2.2,
      vy: 0.12 + Math.random() * 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      a: 0.25 + Math.random() * 0.55,
      tw: Math.random() * Math.PI * 2,
      lav: Math.random() < 0.22
    };
  }
  function drawParticles() {
    if (!pRunning) { pLoopActive = false; return; }
    pCtx.clearRect(0, 0, pw, ph);
    for (const p of particles) {
      p.y -= p.vy; p.x += p.vx; p.tw += 0.03;
      if (p.y < -10) Object.assign(p, newParticle(false));
      const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
      pCtx.beginPath();
      pCtx.fillStyle = p.lav ? "rgba(196,167,255," + alpha + ")" : "rgba(212,175,55," + alpha + ")";
      pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      pCtx.fill();
      pCtx.beginPath();
      pCtx.fillStyle = p.lav ? "rgba(196,167,255," + alpha * 0.15 + ")" : "rgba(212,175,55," + alpha * 0.15 + ")";
      pCtx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2);
      pCtx.fill();
    }
    requestAnimationFrame(drawParticles);
  }
  function startParticles() {
    if (pLoopActive || reduceMotion) return; // prevents double loops (speed-up bug)
    pLoopActive = true;
    requestAnimationFrame(drawParticles);
  }
  sizeParticles();
  startParticles();
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { sizeParticles(); sizeConfetti(); }, 150);
  });
  document.addEventListener("visibilitychange", () => {
    pRunning = !document.hidden;
    if (pRunning) startParticles();
  });

  /* ---------- Floating hearts ---------- */
  const heartsLayer = $("#hearts");
  const heartChars = ["❤", "♥", "💜", "✦"];
  let heartTimer = null;
  function spawnHeart() {
    if (document.hidden || heartsLayer.childElementCount > 18) return;
    const h = document.createElement("span");
    h.className = "float-heart";
    h.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
    h.style.left = Math.random() * 100 + "%";
    h.style.fontSize = 12 + Math.random() * 20 + "px";
    h.style.animationDuration = 8 + Math.random() * 7 + "s";
    h.style.setProperty("--sway", (Math.random() - 0.5) * 120 + "px");
    h.addEventListener("animationend", () => h.remove());
    heartsLayer.appendChild(h);
  }
  function startHearts() {
    if (reduceMotion || heartTimer) return;
    heartTimer = setInterval(spawnHeart, 1100);
  }
  function heartBurst(x, y, n) {
    for (let i = 0; i < n; i++) {
      const h = document.createElement("span");
      h.className = "float-heart";
      h.textContent = heartChars[i % 3];
      h.style.left = x + (Math.random() - 0.5) * 120 + "px";
      h.style.bottom = "auto";
      h.style.top = y + "px";
      h.style.fontSize = 16 + Math.random() * 22 + "px";
      h.style.animationDuration = 3 + Math.random() * 3 + "s";
      h.style.setProperty("--sway", (Math.random() - 0.5) * 160 + "px");
      h.addEventListener("animationend", () => h.remove());
      heartsLayer.appendChild(h);
    }
  }

  /* ---------- Confetti (canvas) ---------- */
  const cCanvas = $("#confetti");
  const cCtx = cCanvas.getContext("2d");
  let confetti = [];
  let cw = 0, ch = 0, cRunning = false;
  const confettiColors = ["#D4AF37", "#f1d57a", "#C4A7FF", "#ffffff", "#b8932a", "#8f63d9"];

  function sizeConfetti() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cw = window.innerWidth; ch = window.innerHeight;
    cCanvas.width = cw * dpr; cCanvas.height = ch * dpr;
    cCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  sizeConfetti();

  function addConfetti(x, y, count, spread, power) {
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * spread;
      const speed = power * (0.5 + Math.random());
      confetti.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        w: 6 + Math.random() * 7,
        h: 4 + Math.random() * 6,
        rot: Math.random() * 6.28,
        vr: (Math.random() - 0.5) * 0.4,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        life: 0,
        max: 150 + Math.random() * 90,
        round: Math.random() < 0.3
      });
    }
    if (!cRunning) { cRunning = true; requestAnimationFrame(drawConfetti); }
  }
  function drawConfetti() {
    cCtx.clearRect(0, 0, cw, ch);
    confetti = confetti.filter((c) => c.life < c.max && c.y < ch + 20);
    for (const c of confetti) {
      c.life++;
      c.vy += 0.16; c.vx *= 0.99; c.vy *= 0.995;
      c.x += c.vx; c.y += c.vy; c.rot += c.vr;
      cCtx.save();
      cCtx.globalAlpha = Math.max(0, 1 - c.life / c.max);
      cCtx.translate(c.x, c.y);
      cCtx.rotate(c.rot);
      cCtx.fillStyle = c.color;
      if (c.round) { cCtx.beginPath(); cCtx.arc(0, 0, c.w / 2.2, 0, 6.28); cCtx.fill(); }
      else cCtx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
      cCtx.restore();
    }
    if (confetti.length) requestAnimationFrame(drawConfetti);
    else { cRunning = false; cCtx.clearRect(0, 0, cw, ch); }
  }
  function confettiBurst(x, y) {
    const n = isSmall() ? 70 : 120;
    addConfetti(x, y, n, Math.PI * 1.1, 13);
  }
  function confettiShower() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const before = confetti.length;
        addConfetti(Math.random() * cw, -10, isSmall() ? 25 : 45, 0, 0);
        for (let k = before; k < confetti.length; k++) {
          const c = confetti[k];
          c.x = Math.random() * cw;
          c.vx = (Math.random() - 0.5) * 3;
          c.vy = 1 + Math.random() * 3;
        }
      }, i * 260);
    }
  }
  function centerOf(el) {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }

  /* ---------- Music ---------- */
  const bgm = $("#bgm");
  const musicBtn = $("#musicBtn");
  let musicWanted = false;

  function setMusicUI(on) {
    musicBtn.classList.toggle("playing", on);
    musicBtn.setAttribute("aria-pressed", String(on));
    musicBtn.setAttribute("aria-label", on ? "Pause music" : "Play music");
  }
  function playMusic() {
    musicWanted = true;
    const p = bgm.play();
    if (p && p.then) {
      p.then(() => setMusicUI(true)).catch(() => {
        musicWanted = false;
        setMusicUI(false);
        toast("Music file not found. Add song.mp3");
      });
    } else setMusicUI(true);
  }
  function pauseMusic() {
    musicWanted = false;
    bgm.pause();
    setMusicUI(false);
  }
  musicBtn.addEventListener("click", () => (bgm.paused ? playMusic() : pauseMusic()));
  bgm.addEventListener("error", () => { musicWanted = false; setMusicUI(false); });

  /* ---------- Welcome -> main site ---------- */
  const welcome = $("#welcome");
  const site = $("#site");
  $("#openBtn").addEventListener("click", function () {
    this.disabled = true;
    welcome.classList.add("leaving");
    site.hidden = false;
    window.scrollTo(0, 0);
    requestAnimationFrame(() => requestAnimationFrame(() => site.classList.add("show")));
    setTimeout(() => {
      welcome.hidden = true;
      document.body.classList.remove("locked");
      observeReveals();
      startHearts();
      onScroll();
      if (!reduceMotion) confettiBurst(cw / 2, ch * 0.7);
    }, 800);
  });

  /* ---------- Navigation ---------- */
  const nav = $("#nav");
  const navLinks = $("#navLinks");
  const menuBtn = $("#menuBtn");
  const toTop = $("#toTop");
  const sections = $$("main section[id]");

  function setMenu(open) {
    navLinks.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  $$("a", navLinks).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("open") && !nav.contains(e.target)) setMenu(false);
  });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  const tlFill = $("#tlFill");
  const tlList = $("#timelineList");
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      nav.classList.toggle("scrolled", y > 30);
      toTop.classList.toggle("show", y > 700);

      let current = sections[0] && sections[0].id;
      const probe = window.innerHeight * 0.35;
      for (const s of sections) if (s.getBoundingClientRect().top <= probe) current = s.id;
      $$("a", navLinks).forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));

      // timeline progress line
      const r = tlList.getBoundingClientRect();
      const line = Math.min(Math.max(window.innerHeight * 0.55 - r.top, 0), r.height);
      tlFill.style.height = line + "px";
      $$(".tl-item", tlList).forEach((it) => {
        const top = it.getBoundingClientRect().top;
        it.classList.toggle("active", top < window.innerHeight * 0.55);
      });
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  /* ---------- Scroll reveal ---------- */
  let revealObserver = null;
  function observeReveals() {
    const items = $$(".reveal:not(.in)");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const el = en.target;
            el.classList.add("in");
            revealObserver.unobserve(el);
            // drop the entrance delay so hover effects stay snappy afterwards
            setTimeout(() => el.style.setProperty("--d", "0s"), 1700);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    }
    items.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- Hero photo fallback ---------- */
  const heroImg = $("#heroPhoto");
  if (heroImg) {
    const heroFrame = heroImg.closest(".photo-frame");
    if (heroFrame) {
      heroImg.addEventListener("error", () => heroFrame.classList.add("missing"));
      if (heroImg.complete && heroImg.naturalWidth === 0) heroFrame.classList.add("missing");
    }
  }

  /* ---------- Gallery + lightbox ---------- */
  const gallery = $("#gallery");
  CONFIG.gallery.forEach((g, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "g-item reveal";
    btn.style.setProperty("--d", (i % 3) * 0.1 + "s");
    btn.setAttribute("aria-label", "Open photo: " + (g.caption || "memory " + (i + 1)));
    btn.innerHTML =
      '<img src="' + esc(g.src) + '" alt="' + esc(g.caption) + '" decoding="async">' +
      '<div class="ph" style="--ratio:' + esc(g.ratio || "4 / 5") + '"><span>📷</span><p>Add your photo<br><small>' + esc(g.src) + '</small></p></div>' +
      (g.caption ? '<span class="cap">' + esc(g.caption) + '</span>' : "");
    const img = $("img", btn);
    const markMissing = () => btn.classList.add("missing");
    img.addEventListener("error", markMissing);
    // image may already have failed before the listener was attached
    if (img.complete && img.naturalWidth === 0) markMissing();
    btn.addEventListener("click", () => openLightbox(i));
    gallery.appendChild(btn);
  });

  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbMissing = $("#lbMissing");
  const lbMissingText = $("#lbMissingText");
  const lbCaption = $("#lbCaption");
  let lbIndex = 0;
  let lastFocus = null;

  function showLightbox(i) {
    const n = CONFIG.gallery.length;
    lbIndex = (i + n) % n;
    const g = CONFIG.gallery[lbIndex];
    lbCaption.textContent = g.caption || "";
    lbMissing.hidden = true;
    lbImg.hidden = false;
    lbImg.alt = g.caption || "";
    lbImg.onerror = () => {
      if (!lbImg.getAttribute("src")) return;
      lbImg.hidden = true;
      lbMissing.hidden = false;
      lbMissingText.textContent = "Add your photo: " + g.src;
    };
    lbImg.src = g.src;
  }
  function openLightbox(i) {
    lastFocus = document.activeElement;
    showLightbox(i);
    lb.hidden = false;
    document.body.classList.add("locked");
    $("#lbClose").focus();
  }
  function closeLightbox() {
    lb.hidden = true;
    lbImg.removeAttribute("src");
    document.body.classList.remove("locked");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lbPrev").addEventListener("click", () => showLightbox(lbIndex - 1));
  $("#lbNext").addEventListener("click", () => showLightbox(lbIndex + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") showLightbox(lbIndex - 1);
    else if (e.key === "ArrowRight") showLightbox(lbIndex + 1);
    else if (e.key === "Tab") {
      const focusables = $$("button", lb);
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  let touchX = null;
  lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showLightbox(lbIndex + (dx < 0 ? 1 : -1));
    touchX = null;
  }, { passive: true });

  /* ---------- Video gallery ---------- */
  const videoGrid = $("#videoGrid");
  const videoCards = [];
  let musicWasOn = false;

  CONFIG.videos.forEach((v, i) => {
    const vTitle = v.title || "Video " + (i + 1);
    const card = document.createElement("article");
    card.className = "video-card glass reveal";
    card.style.setProperty("--d", i * 0.1 + "s");
    card.innerHTML =
      '<div class="video-wrap">' +
        '<video preload="metadata" playsinline ' + (v.poster ? 'poster="' + esc(v.poster) + '"' : "") + ' src="' + esc(v.src) + '"></video>' +
        '<button type="button" class="play-btn" aria-label="Play video: ' + esc(vTitle) + '">▶</button>' +
      '</div>' +
      '<div class="video-info"><h3>' + esc(vTitle) + '</h3>' + (v.caption ? '<p>' + esc(v.caption) + '</p>' : "") + '</div>';

    const video = $("video", card);
    const btn = $(".play-btn", card);
    const wrap = $(".video-wrap", card);

    function showMsg(text) {
      let m = $(".video-msg", wrap);
      if (!m) { m = document.createElement("div"); m.className = "video-msg"; wrap.appendChild(m); }
      m.textContent = text;
    }
    function toggle() {
      if (video.paused) {
        videoCards.forEach((o) => { if (o.video !== video) o.video.pause(); });
        const p = video.play();
        if (p && p.catch) p.catch(() => showMsg("Video not found. Add " + v.src));
      } else video.pause();
    }
    btn.addEventListener("click", toggle);
    video.addEventListener("click", toggle);
    video.addEventListener("play", () => {
      card.classList.add("playing");
      video.controls = true;
      btn.textContent = "❚❚";
      btn.setAttribute("aria-label", "Pause video");
      if (!bgm.paused) { musicWasOn = true; bgm.pause(); setMusicUI(false); }
    });
    video.addEventListener("pause", () => {
      card.classList.remove("playing");
      btn.textContent = "▶";
      btn.setAttribute("aria-label", "Play video: " + vTitle);
      if (!videoCards.some((o) => !o.video.paused) && musicWasOn) {
        musicWasOn = false;
        playMusic();
      }
    });
    video.addEventListener("ended", () => { video.controls = false; });
    video.addEventListener("error", () => { if (video.getAttribute("src")) showMsg("Video not found. Add " + v.src); });

    videoCards.push({ video });
    videoGrid.appendChild(card);
  });

  /* ---------- Timeline ---------- */
  CONFIG.timeline.forEach((t, i) => {
    const item = document.createElement("div");
    item.className = "tl-item " + (i % 2 === 0 ? "left" : "right") + " reveal";
    item.innerHTML =
      '<span class="tl-dot"></span>' +
      '<div class="tl-card glass" role="button" tabindex="0" aria-expanded="false">' +
        (t.date ? '<span class="tl-date">' + esc(t.date) + '</span>' : "") +
        '<h3>' + esc(t.title) + '</h3>' +
        '<p>' + esc(t.text) + '</p>' +
        (t.more ? '<div class="tl-more"><div><p>' + esc(t.more) + '</p></div></div><span class="tl-hint">Tap to read more ↓</span>' : "") +
      '</div>';
    const card = $(".tl-card", item);
    const hint = $(".tl-hint", item);
    function toggle() {
      if (!t.more) return;
      const open = card.classList.toggle("open");
      card.setAttribute("aria-expanded", String(open));
      if (hint) hint.textContent = open ? "Tap to close ↑" : "Tap to read more ↓";
      if (open) heartBurst(card.getBoundingClientRect().left + 40, card.getBoundingClientRect().top + 30, 4);
    }
    card.addEventListener("click", toggle);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
    tlList.appendChild(item);
  });

  /* ---------- Interactive cake ---------- */
  const wishCake = $("#wishCake");
  const wishBtn = $("#wishBtn");
  const wishMessage = $("#wishMessage");
  let candlesOut = false;

  wishBtn.addEventListener("click", () => {
    if (!candlesOut) {
      candlesOut = true;
      wishCake.classList.add("out");
      wishBtn.textContent = "Light The Candles Again 🕯️";
      wishMessage.hidden = false;
      wishMessage.style.animation = "none";
      void wishMessage.offsetWidth;
      wishMessage.style.animation = "";
      const c = centerOf(wishCake);
      setTimeout(() => {
        confettiBurst(c.x, c.y);
        confettiShower();
        heartBurst(c.x, c.y, 10);
      }, 350);
      setTimeout(() => wishMessage.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" }), 700);
    } else {
      candlesOut = false;
      wishCake.classList.remove("out");
      wishBtn.textContent = "Make A Wish";
      wishMessage.hidden = true;
    }
  });

  /* ---------- Final button ---------- */
  const foreverBtn = $("#foreverBtn");
  const foreverMsg = $("#foreverMsg");
  foreverBtn.addEventListener("click", () => {
    const open = foreverMsg.hidden;
    foreverMsg.hidden = !open;
    foreverBtn.setAttribute("aria-expanded", String(open));
    if (open) {
      const c = centerOf(foreverBtn);
      heartBurst(c.x, c.y, 16);
      confettiBurst(c.x, c.y);
      setTimeout(() => foreverMsg.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" }), 250);
    }
  });

  onScroll();
})();
