// Shared navigation component
// Usage: <script type="module"> import { initNav } from '/assets/js/nav.js'; initNav(); </script>

export function initNav() {
  const currentPath = window.location.pathname;

  const nav = document.createElement('nav');
  nav.id = 'site-nav';
  nav.innerHTML = `
    <div class="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
      <a href="/" class="text-lg font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors no-underline">
        Eltria
      </a>
      <div class="flex items-center gap-6">
        <a href="/tools/" class="${isActive(currentPath, '/tools/')} transition-colors no-underline">Tools</a>
        <a href="/diagrams/" class="${isActive(currentPath, '/diagrams/')} transition-colors no-underline">Diagrams</a>
        <button id="theme-toggle" class="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Toggle theme">
          <svg id="theme-icon-light" class="w-5 h-5 hidden dark:block text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
          <svg id="theme-icon-dark" class="w-5 h-5 block dark:hidden text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  document.body.prepend(nav);

  // Init theme toggle
  document.getElementById('theme-toggle').addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  });
}

function isActive(current, path) {
  const base = 'text-sm font-medium';
  if (current.startsWith(path)) {
    return `${base} text-blue-600 dark:text-blue-400`;
  }
  return `${base} text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200`;
}
