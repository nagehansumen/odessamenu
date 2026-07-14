const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];

function activateTab(tab) {
  const category = tab.dataset.category;

  tabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
  });

  panels.forEach((panel) => {
    const active = panel.id === `panel-${category}`;
    panel.hidden = !active;
    panel.classList.toggle('is-active', active);
  });

  window.scrollTo({ top: document.querySelector('.tabs-wrap').offsetTop, behavior: 'smooth' });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));

  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    let targetIndex = index;
    if (event.key === 'ArrowRight') targetIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') targetIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') targetIndex = 0;
    if (event.key === 'End') targetIndex = tabs.length - 1;

    tabs[targetIndex].focus();
    activateTab(tabs[targetIndex]);
  });
});


const themeToggle = document.querySelector('.theme-toggle');
const themeColor = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme, persist = true) {
  const isLight = theme === 'light';
  document.documentElement.dataset.theme = isLight ? 'light' : 'dark';
  themeToggle.setAttribute('aria-checked', String(isLight));
  themeToggle.setAttribute('aria-label', isLight ? 'Karanlık moda geç' : 'Aydınlık moda geç');
  themeColor.setAttribute('content', isLight ? '#f3eadc' : '#0a0806');

  if (persist) {
    try {
      localStorage.setItem('odessa-theme', isLight ? 'light' : 'dark');
    } catch (error) {
      // Menü, depolama kapalı olsa da tema değiştirmeye devam eder.
    }
  }
}

applyTheme(document.documentElement.dataset.theme || 'dark', false);

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(nextTheme);
});
