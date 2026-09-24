const toggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.toggleAttribute('data-open', !open);
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

const homeHero = document.querySelector('[data-hero]');
const siteHeader = document.querySelector('[data-header]');

if (homeHero && siteHeader) {
  const headerObserver = new IntersectionObserver(([entry]) => {
    siteHeader.toggleAttribute('data-scrolled', !entry.isIntersecting);
  }, { rootMargin: `-${siteHeader.offsetHeight}px 0px 0px`, threshold: 0 });

  headerObserver.observe(homeHero);
}

// Copy controls: the link button on news articles and the email on Contact.
// `data-copy` holds the text to copy; left empty, it copies the page URL.
// `data-copied` is the label announced for two seconds after a copy.
if (navigator.clipboard) {
  for (const control of document.querySelectorAll('[data-copy]')) {
    const label = control.getAttribute('aria-label');
    control.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(control.dataset.copy || window.location.href);
        control.setAttribute('data-copied-state', '');
        control.setAttribute('aria-label', control.dataset.copied);
        setTimeout(() => {
          control.removeAttribute('data-copied-state');
          control.setAttribute('aria-label', label);
        }, 2000);
      } catch {
        // Clipboard access can be refused; leaving the control unchanged is
        // preferable to reporting a success that did not happen.
      }
    });
  }
}
