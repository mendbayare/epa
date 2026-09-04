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

const homeHero = document.querySelector('.home-hero');
const siteHeader = document.querySelector('[data-header]');

if (homeHero && siteHeader) {
  const headerObserver = new IntersectionObserver(([entry]) => {
    siteHeader.classList.toggle('is-scrolled', !entry.isIntersecting);
  }, { rootMargin: `-${siteHeader.offsetHeight}px 0px 0px`, threshold: 0 });

  headerObserver.observe(homeHero);
}

// Copy-link control on news articles. No third-party script is involved; the
// Facebook control beside it is a plain outbound link.
const copyLink = document.querySelector('[data-copy-link]');

if (copyLink && navigator.clipboard) {
  copyLink.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      copyLink.classList.add('is-copied');
      copyLink.setAttribute('aria-label', copyLink.dataset.copied);
      setTimeout(() => copyLink.classList.remove('is-copied'), 2000);
    } catch {
      // Clipboard access can be refused; leaving the control unchanged is
      // preferable to reporting a success that did not happen.
    }
  });
}
