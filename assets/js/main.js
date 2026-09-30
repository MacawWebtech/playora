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

// RTL / LTR switch (icon button next to the theme toggle)
(function initRtlToggle() {
  // Inline SVG icons so the RTL button never depends on the icon-font CDN
  const svg = lines => '<svg class="rtl-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">' + lines + '</svg>';
  const ICON_RIGHT = svg('<path d="M3 6h18M9 12h12M6 18h15"/>');  // text aligned right (switch to RTL)
  const ICON_LEFT  = svg('<path d="M3 6h18M3 12h12M3 18h15"/>');  // text aligned left (switch to LTR)
  const root = document.documentElement;
  const KEY = 'playora-dir';
  function applyDir(dir) {
    if (dir === 'rtl') root.setAttribute('dir', 'rtl');
    else root.removeAttribute('dir');
    document.querySelectorAll('.rtl-toggle').forEach(function (btn) {
      const rtl = dir === 'rtl';
      btn.textContent = rtl ? 'LTR' : 'RTL';
      btn.setAttribute('aria-pressed', rtl ? 'true' : 'false');
      btn.setAttribute('aria-label', rtl ? 'Switch to left-to-right layout' : 'Switch to right-to-left layout');
    });
  }
  let saved = 'ltr';
  try { saved = localStorage.getItem(KEY) === 'rtl' ? 'rtl' : 'ltr'; } catch (e) {}
  applyDir(saved);
  document.querySelectorAll('.rtl-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const next = root.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
      try { localStorage.setItem(KEY, next); } catch (e) {}
      applyDir(next);
    });
  });
})();

// Active nav link – safety net so the current page is always highlighted
document.addEventListener('DOMContentLoaded', () => {
  // Normalise the path so "/about", "/about/", "/about.html" and "/" all match
  const norm = p => {
    p = (p || '').split('#')[0].split('?')[0].toLowerCase().replace(/\/+$/, '');
    p = p.split('/').pop() || 'index';
    return p.replace(/\.html?$/, '');
  };
  const page = norm(location.pathname);
  const home = page === 'index' || page === 'index-night';
  document.querySelectorAll('.nav-menu .nav-link').forEach(a => {
    if (norm(a.getAttribute('href')) === page) { a.classList.add('active'); a.setAttribute('aria-current', 'page'); }
  });
  if (home) {
    const t = document.querySelector('.home-switch-trigger');
    if (t) { t.classList.add('active'); t.setAttribute('aria-current', 'page'); }
  }

  // Dashboard sidebar: highlight the section currently in view / clicked
  const dash = [...document.querySelectorAll('.dash-nav a')];
  if (dash.length) {
    const byHash = new Map();
    dash.forEach(a => {
      const h = a.getAttribute('href') || '';
      if (h.startsWith('#') && h.length > 1 && document.getElementById(h.slice(1))) byHash.set(h.slice(1), a);
    });
    const home = dash.find(a => norm(a.getAttribute('href')) === page && !(a.getAttribute('href') || '').startsWith('#'));
    const setActive = link => {
      dash.forEach(a => { a.classList.remove('active'); a.removeAttribute('aria-current'); });
      if (link) { link.classList.add('active'); link.setAttribute('aria-current', 'page'); }
    };
    let locked = false; // a clicked link stays active until the user scrolls by hand
    const update = () => {
      if (locked) return;
      let current = null;
      const line = window.innerHeight * 0.4;
      byHash.forEach((a, id) => {
        if (document.getElementById(id).getBoundingClientRect().top <= line) current = a;
      });
      setActive(current || home);
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('hashchange', update);
    ['wheel', 'touchmove', 'keydown'].forEach(ev =>
      window.addEventListener(ev, () => { locked = false; }, { passive: true }));
    dash.forEach(a => a.addEventListener('click', () => {
      const id = (a.getAttribute('href') || '').slice(1);
      if (byHash.has(id)) { locked = true; setActive(a); }
    }));
    update();
  }
});
