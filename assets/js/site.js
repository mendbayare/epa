const toggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
}

const themeToggle = document.querySelector('[data-theme-toggle]');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('epa-theme', next);
  });
}

const projectBrowser = document.querySelector('[data-project-browser]');

if (projectBrowser) {
  const filters = projectBrowser.querySelectorAll('[data-filter]');
  const cards = projectBrowser.querySelectorAll('[data-project-card]');

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      const selected = filter.dataset.filter;
      filters.forEach((item) => item.classList.toggle('is-active', item === filter));
      cards.forEach((card) => {
        card.hidden = selected !== 'all' && card.dataset.category !== selected;
      });
    });
  });
}

const homeHero = document.querySelector('.home-hero');
const siteHeader = document.querySelector('[data-header]');

if (homeHero && siteHeader) {
  const headerObserver = new IntersectionObserver(([entry]) => {
    siteHeader.classList.toggle('is-scrolled', !entry.isIntersecting);
  }, { rootMargin: `-${siteHeader.offsetHeight}px 0px 0px`, threshold: 0 });

  headerObserver.observe(homeHero);
}
