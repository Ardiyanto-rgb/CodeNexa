/**
 * materi.js
 * Sidebar navigation & chapter switching for materi.html
 * CodeNexa | Informatika SMA Kelas X
 */

'use strict';

/* ─── Sidebar Mobile ─── */
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

/* ─── Chapter Navigation ─── */
function showChapter(idx) {
  // Hide all chapters
  document.querySelectorAll('.chapter').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));

  // Show target chapter
  const chapter = document.getElementById('ch' + idx);
  const sideBtn = document.querySelector(`.sidebar-item[data-ch="${idx}"]`);

  if (chapter) chapter.classList.add('active');
  if (sideBtn) sideBtn.classList.add('active');

  closeSidebar();
  scrollToTop();
}

/* ─── Init on DOM ready ─── */
document.addEventListener('DOMContentLoaded', () => {
  // Read hash from URL (e.g. materi.html#tujuan, materi.html#bab1)
  const hashMap = {
    '#tujuan': 'tujuan',
    '#bab1': 0, '#bab2': 1, '#bab3': 2,
    '#bab4': 3, '#bab5': 4, '#bab6': 5, '#bab7': 6
  };
  const startIdx = hashMap[window.location.hash] ?? 'tujuan';
  showChapter(startIdx);
});
