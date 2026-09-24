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

// Newest-generation carousel on Home. The row is a native scroll-snap list,
// so it already swipes; this adds previous/next, a pause button, and a slow
// autoplay that returns to the start after the last card. Autoplay stops
// while the pointer is over the row or focus is inside it, while it is off
// screen, when the visitor pauses it, and entirely under reduced motion.
for (const carousel of document.querySelectorAll('[data-carousel]')) {
  const track = carousel.querySelector('[data-carousel-track]');
  const controls = carousel.querySelector('[data-carousel-controls]');
  const toggle = carousel.querySelector('[data-carousel-toggle]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = reduce ? 'auto' : 'smooth';

  const overflowing = () => track.scrollWidth > track.clientWidth + 2;
  const step = () => track.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap);
  const go = (direction) => {
    const end = track.scrollWidth - track.clientWidth;
    if (direction > 0 && track.scrollLeft >= end - 2) track.scrollTo({ left: 0, behavior });
    else if (direction < 0 && track.scrollLeft <= 2) track.scrollTo({ left: end, behavior });
    else track.scrollBy({ left: direction * step(), behavior });
  };

  let playing = !reduce;
  let held = false;
  let visible = false;
  const setPlaying = (on) => {
    playing = on;
    toggle.dataset.state = on ? 'playing' : 'paused';
    toggle.setAttribute('aria-label', on ? toggle.dataset.pause : toggle.dataset.play);
  };

  carousel.querySelector('[data-carousel-prev]').addEventListener('click', () => go(-1));
  carousel.querySelector('[data-carousel-next]').addEventListener('click', () => go(1));
  toggle.addEventListener('click', () => setPlaying(!playing));
  carousel.addEventListener('pointerenter', () => { held = true; });
  carousel.addEventListener('pointerleave', () => { held = false; });
  carousel.addEventListener('focusin', () => { held = true; });
  carousel.addEventListener('focusout', (event) => { held = carousel.contains(event.relatedTarget); });
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(track);

  // The controls only appear when there are more cards than fit.
  const sync = () => { controls.hidden = !overflowing(); };
  sync();
  addEventListener('resize', sync);
  setPlaying(playing);

  setInterval(() => {
    if (playing && !held && visible && !document.hidden && overflowing()) go(1);
  }, 5000);
}
