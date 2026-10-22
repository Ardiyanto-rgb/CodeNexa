/**
 * app.js
 * Shared utilities — navbar, active link, shared helpers
 * PembelajaranKode | Informatika SMA Kelas X
 */

'use strict';

/* ─── Navbar Mobile Toggle ─── */
function toggleNav() {
  const navLinks = document.getElementById('nav-links');
  const toggle   = document.getElementById('menu-toggle');
  if (!navLinks) return;
  const isOpen = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
}

/* Close nav when clicking outside */
document.addEventListener('click', (e) => {
  const navLinks = document.getElementById('nav-links');
  const toggle   = document.getElementById('menu-toggle');
  if (!navLinks || !toggle) return;
  if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

/* ─── Mark active nav link based on current page ─── */
(function markActiveNavLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (
      (page === 'index.html'  && href.includes('index'))  ||
      (page === 'materi.html' && href.includes('materi')) ||
      (page === 'kuis.html'   && href.includes('kuis'))   ||
      (page === 'game.html'   && href.includes('game'))
    ) {
      link.classList.add('active');
    }
    // Also handle root/empty path → index
    if (page === '' && href.includes('index')) link.classList.add('active');
  });
})();

/* ─── Smooth scroll to top on chapter change ─── */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
