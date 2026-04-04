// Theme initialization — load before page render to prevent flash
// Usage: <script src="/assets/js/theme.js"></script> in <head>

(function() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
})();
