document.addEventListener('DOMContentLoaded', () => {
  // Dashboard sidebar toggle
  const sideToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.dash-sidebar');
  if (sideToggle && sidebar) {
    const backdrop = document.querySelector('.dash-backdrop');
    const closeButton = sidebar.querySelector('.dash-close');
    const mobile = window.matchMedia('(max-width: 1024px)');
    const setSidebar = (open, restoreFocus = false) => {
      open = open && mobile.matches;
      sidebar.classList.toggle('open', open);
      sidebar.inert = mobile.matches && !open;
      sideToggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('dash-menu-open', open);
      if (backdrop) backdrop.hidden = !open;
      if (open) closeButton?.focus();
      else if (restoreFocus) sideToggle.focus();
    };
    // The shared script handles the open class; synchronize drawer state afterward.
    sideToggle.addEventListener('click', () => setSidebar(sidebar.classList.contains('open')));
    closeButton?.addEventListener('click', () => setSidebar(false, true));
    backdrop?.addEventListener('click', () => setSidebar(false, true));
    sidebar.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setSidebar(false, true)));
    document.addEventListener('keydown', event => {
      if (!sidebar.classList.contains('open')) return;
      if (event.key === 'Escape') setSidebar(false, true);
      if (event.key === 'Tab') {
        const items = [...sidebar.querySelectorAll('a, button')];
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
    mobile.addEventListener('change', () => setSidebar(false));
    setSidebar(false);
  }
});
