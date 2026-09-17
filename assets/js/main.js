document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
    });
    navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));
  }

  // Header scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  // Form validation
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', e => {
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        } else {
          field.classList.remove('error');
        }
        if (field.type === 'email' && field.value) {
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!re.test(field.value)) { field.classList.add('error'); valid = false; }
        }
      });
      if (!valid) e.preventDefault();
    });
    form.querySelectorAll('[required]').forEach(f => {
      f.addEventListener('input', () => f.classList.remove('error'));
    });
  });

  // Slot selection
  document.querySelectorAll('.slot-btn:not(.unavailable)').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Fade-up observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.observe-fade').forEach(el => observer.observe(el));

  // Dashboard sidebar toggle
  const sideToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.dash-sidebar');
  if (sideToggle && sidebar) {
    sideToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }
});

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // Our Story interactive bars
  const stories = [
    { title: '2018 — First Steps', text: 'Playora opened with one soft-play zone and a small team who believed every child deserves a safe place to play — and every parent deserves real peace of mind.' },
    { title: '2020 — Growing Stronger', text: 'We added the Action Zone, expanded staff training and tightened safety checks so more families could play with confidence.' },
    { title: '2023 — Book With Ease', text: 'The parent dashboard launched: real-time slots, memberships and instant booking so planning a visit became simple.' },
    { title: '2025 — Night Glow', text: 'After-dark sessions and Night Owl membership arrived — new ways to play when the sun goes down.' },
    { title: 'Today — Your Family', text: 'Thousands of visits later, we still measure success by smiles, safety and the families who return again and again. Come write the next chapter with us.' }
  ];
  const panel = document.getElementById('storyPanel');
  document.querySelectorAll('.story-bar-wrap').forEach(wrap => {
    const base = wrap.querySelector('.story-bar').style.height;
    wrap.addEventListener('mouseenter', () => {
      const i = +wrap.dataset.story;
      if (panel && stories[i]) {
        panel.classList.add('active');
        panel.innerHTML = '<h3>' + stories[i].title + '</h3><p>' + stories[i].text + '</p>';
      }
    });
    wrap.addEventListener('mouseleave', () => {
      // bar height returns via CSS; keep last story visible
    });
  });

  // Cosmic snow background (all pages, below header)
  (function createCosmicSnow() {
    if (document.querySelector('.cosmic-snow')) return;
    const layer = document.createElement('div');
    layer.className = 'cosmic-snow';
    layer.setAttribute('aria-hidden', 'true');
    const count = window.innerWidth < 640 ? 28 : 48;
    for (let i = 0; i < count; i++) {
      const flake = document.createElement('span');
      const left = Math.random() * 100;
      const delay = Math.random() * 12;
      const duration = 8 + Math.random() * 14;
      const size = 2 + Math.random() * 4;
      flake.style.left = left + '%';
      flake.style.width = size + 'px';
      flake.style.height = size + 'px';
      flake.style.animationDelay = delay + 's';
      flake.style.animationDuration = duration + 's';
      layer.appendChild(flake);
    }
    // insert after header so snow sits under header visually
    const header = document.querySelector('.site-header');
    if (header && header.nextSibling) {
      header.parentNode.insertBefore(layer, header.nextSibling);
    } else {
      document.body.prepend(layer);
    }
  })();

// Dark / light theme switch
(function initThemeToggle() {
  const root = document.documentElement;
  const KEY = 'playora-theme';
  function applyTheme(theme) {
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.innerHTML = theme === 'dark' ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }
  let saved = 'light';
  try { saved = localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light'; } catch (e) {}
  applyTheme(saved);
  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(KEY, next); } catch (e) {}
      applyTheme(next);
    });
  });
})();
