// Shared navigation component
// Usage: <script type="module"> import { initNav } from '/assets/js/nav.js'; initNav(); </script>

// All tools registry — used by command palette, favorites, recent
export const TOOLS = [
  { name: 'Remote Clipboard', icon: '📋', path: '/tools/clipboard/', keywords: 'clipboard copy paste share sync' },
  { name: 'JSON Formatter', icon: '{ }', path: '/tools/json-formatter/', keywords: 'json format validate minify tree' },
  { name: 'Regex Tester', icon: '.*', path: '/tools/regex/', keywords: 'regex regular expression pattern match' },
  { name: 'Text Diff', icon: '+/-', path: '/tools/diff/', keywords: 'diff compare text difference' },
  { name: 'Markdown Preview', icon: 'M', path: '/tools/markdown/', keywords: 'markdown preview mermaid katex math' },
  { name: 'JWT Decoder', icon: 'JWT', path: '/tools/jwt-decoder/', keywords: 'jwt token decode header payload' },
  { name: 'Base64', icon: 'B64', path: '/tools/base64/', keywords: 'base64 encode decode' },
  { name: 'URL Encoder', icon: '%', path: '/tools/url-encoder/', keywords: 'url encode decode uri' },
  { name: 'Timestamp', icon: 'T', path: '/tools/timestamp/', keywords: 'timestamp unix epoch date time' },
  { name: 'Hash Generator', icon: '#', path: '/tools/hash/', keywords: 'hash sha256 sha512 digest' },
  { name: 'Color Picker', icon: 'C', path: '/tools/color-picker/', keywords: 'color hex rgb hsl pick' },
  { name: 'Cron Parser', icon: '⏰', path: '/tools/cron/', keywords: 'cron schedule expression timer' },
  { name: 'QR Code', icon: '▣', path: '/tools/qrcode/', keywords: 'qr code generate scan' },
  { name: 'SQL Formatter', icon: 'SQL', path: '/tools/sql-formatter/', keywords: 'sql format query database' },
  { name: 'JSON to Types', icon: '→T', path: '/tools/json-to-types/', keywords: 'json typescript go python type struct interface' },
  { name: 'HTTP Status', icon: '200', path: '/tools/http-status/', keywords: 'http status code api rest' },
  { name: 'CSS Playground', icon: '▦', path: '/tools/css-playground/', keywords: 'css flexbox grid layout visual' },
  { name: 'Pastebin', icon: '📄', path: '/tools/pastebin/', keywords: 'paste share code snippet gist' },
  { name: 'Poll', icon: '📊', path: '/tools/poll/', keywords: 'poll vote survey question' },
  { name: 'Life-Style API', icon: 'API', path: '/tools/life-style-api/', keywords: 'life style api rest todo wardrobe food billsplit knowledge chat layeros' },
];

const PAGES = [
  { name: 'Home', icon: '⌂', path: '/', keywords: 'home index' },
  { name: 'All Tools', icon: '⚙', path: '/tools/', keywords: 'tools directory' },
  { name: 'Diagrams', icon: '◇', path: '/diagrams/', keywords: 'diagram architecture' },
  { name: 'Workspace', icon: '▤', path: '/workspace/', keywords: 'workspace tabs multi' },
];

export function initNav() {
  const currentPath = window.location.pathname;

  const nav = document.createElement('nav');
  nav.id = 'site-nav';
  nav.innerHTML = `
    <div class="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
      <a href="/" class="text-lg font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors no-underline">
        Eltria
      </a>
      <div class="flex items-center gap-5">
        <a href="/tools/" class="${isActive(currentPath, '/tools/')} transition-colors no-underline">Tools</a>
        <a href="/diagrams/" class="${isActive(currentPath, '/diagrams/')} transition-colors no-underline">Diagrams</a>
        <a href="/workspace/" class="${isActive(currentPath, '/workspace/')} transition-colors no-underline">Workspace</a>
        <button id="cmd-k-btn" class="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg hover:text-gray-600 dark:hover:text-gray-300 transition-colors" aria-label="Command palette">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <kbd class="font-mono text-[10px]">⌘K</kbd>
        </button>
        <button id="theme-toggle" class="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Toggle theme">
          <svg class="w-5 h-5 hidden dark:block text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
          <svg class="w-5 h-5 block dark:hidden text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  document.body.prepend(nav);

  // Theme toggle
  document.getElementById('theme-toggle').addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  });

  // Command palette
  initCommandPalette();

  // Track recent usage
  trackRecent(currentPath);
}

function isActive(current, path) {
  const base = 'text-sm font-medium';
  if (current.startsWith(path)) {
    return `${base} text-blue-600 dark:text-blue-400`;
  }
  return `${base} text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200`;
}

// --- Command Palette (Cmd+K) ---

function initCommandPalette() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'cmd-palette';
  overlay.className = 'fixed inset-0 z-[9999] hidden';
  overlay.innerHTML = `
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" id="cmd-backdrop"></div>
    <div class="relative max-w-lg w-full mx-auto mt-[20vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <svg class="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input id="cmd-input" type="text" class="flex-1 bg-transparent text-sm focus:outline-none text-gray-800 dark:text-gray-200" placeholder="Search tools..." spellcheck="false" autocomplete="off">
        <kbd class="text-[10px] text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono">ESC</kbd>
      </div>
      <div id="cmd-results" class="max-h-72 overflow-auto py-2"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const allItems = [...PAGES, ...TOOLS];
  const input = document.getElementById('cmd-input');
  const results = document.getElementById('cmd-results');
  let selectedIdx = 0;

  function render(items) {
    results.innerHTML = items.map((item, i) => `
      <a href="${item.path}" class="cmd-item flex items-center gap-3 px-4 py-2.5 text-sm no-underline transition-colors ${i === selectedIdx ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}" data-idx="${i}">
        <span class="w-7 text-center text-xs font-mono shrink-0">${item.icon}</span>
        <span class="font-medium">${item.name}</span>
      </a>
    `).join('') || '<div class="px-4 py-6 text-center text-sm text-gray-400">No results</div>';
  }

  function filter() {
    const q = input.value.toLowerCase().trim();
    const filtered = allItems.filter(item => {
      const text = (item.name + ' ' + item.keywords).toLowerCase();
      return !q || q.split(/\s+/).every(w => text.includes(w));
    });
    selectedIdx = 0;
    render(filtered);
    return filtered;
  }

  function open() {
    overlay.classList.remove('hidden');
    input.value = '';
    filter();
    input.focus();
  }

  function close() {
    overlay.classList.add('hidden');
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      overlay.classList.contains('hidden') ? open() : close();
    }
    if (!overlay.classList.contains('hidden')) {
      const items = results.querySelectorAll('.cmd-item');
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowDown') { e.preventDefault(); selectedIdx = Math.min(selectedIdx + 1, items.length - 1); render(filter()); }
      if (e.key === 'ArrowUp') { e.preventDefault(); selectedIdx = Math.max(selectedIdx - 1, 0); render(filter()); }
      if (e.key === 'Enter' && items[selectedIdx]) { items[selectedIdx].click(); }
    }
  });

  input.addEventListener('input', filter);
  document.getElementById('cmd-backdrop').addEventListener('click', close);
  document.getElementById('cmd-k-btn')?.addEventListener('click', open);
}

// --- Recent & Favorites ---

export function trackRecent(path) {
  const tool = TOOLS.find(t => t.path === path);
  if (!tool) return;
  let recent = JSON.parse(localStorage.getItem('eltria-recent') || '[]');
  recent = recent.filter(p => p !== path);
  recent.unshift(path);
  recent = recent.slice(0, 8);
  localStorage.setItem('eltria-recent', JSON.stringify(recent));
}

export function getRecent() {
  const recent = JSON.parse(localStorage.getItem('eltria-recent') || '[]');
  return recent.map(p => TOOLS.find(t => t.path === p)).filter(Boolean);
}

export function getFavorites() {
  return JSON.parse(localStorage.getItem('eltria-favorites') || '[]');
}

export function toggleFavorite(path) {
  let favs = getFavorites();
  if (favs.includes(path)) {
    favs = favs.filter(p => p !== path);
  } else {
    favs.push(path);
  }
  localStorage.setItem('eltria-favorites', JSON.stringify(favs));
  return favs;
}
