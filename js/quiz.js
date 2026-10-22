/**
 * quiz.js
 * Quiz Engine — Pengelolaan Kuis 10 Soal, Interaktivitas & Skor
 * PembelajaranKode | Informatika SMA Kelas X
 */

'use strict';

/* ─── Helper Acak Array ─── */
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandomQuestions(pool, count = 10) {
  return shuffleArray(pool).slice(0, Math.min(count, pool.length));
}

/* ─── Kelas QuizSession (10 Soal) ─── */
class QuizSession {
  constructor({ containerId, pool, count = 10, title, babKey }) {
    this.containerId = containerId;
    this.pool        = pool;
    this.count       = count;
    this.title       = title;
    this.babKey      = babKey;
    this.questions   = pickRandomQuestions(pool, count);
    this.answered    = [];
    this.score       = 0;
    this.render();
  }

  render() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    this.answered = new Array(this.questions.length).fill(false);
    this.score    = 0;

    const LABELS = ['A', 'B', 'C', 'D'];

    const questionsHtml = this.questions.map((q, qi) => {
      const optsHtml = q.opts.map((opt, oi) => `
        <button
          class="opt-btn"
          id="opt-${qi}-${oi}"
          onclick="ActiveQuiz.answer(${qi}, ${oi})"
          aria-label="Pilihan ${LABELS[oi]}: ${opt}"
        >
          <span class="opt-label">${LABELS[oi]}</span>
          <span class="opt-text">${opt}</span>
        </button>
      `).join('');

      return `
        <div class="question-item" id="qi-${qi}">
          <div class="question-text">
            <span class="question-num">${qi + 1}.</span> ${q.q}
          </div>
          <div class="options-grid">${optsHtml}</div>
          <div class="feedback-box" id="fb-${qi}"></div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="quiz-block fade-in">
        <div class="quiz-block-header">
          <div>
            <div class="quiz-block-title">
              ✏️ &nbsp;${this.title}
            </div>
            <div class="quiz-block-subtitle">10 Soal Pilihan Ganda Interaktif</div>
          </div>
          <div class="quiz-meta">
            <span class="quiz-block-badge" id="counter-badge">
              0 / ${this.questions.length} dijawab
            </span>
          </div>
        </div>

        <div class="questions-list">
          ${questionsHtml}
        </div>

        <!-- Completion Card (Muncul setelah 10 soal dijawab) -->
        <div class="completion-card" id="completion-card" style="display:none;">
          <div class="completion-icon" id="comp-icon">🎉</div>
          <h3 class="completion-title" id="comp-title">Kuis Selesai!</h3>
          <p class="completion-desc" id="comp-desc">Kamu telah menyelesaikan seluruh 10 soal.</p>
          <div class="completion-score-badge" id="comp-score">Skor: 0 / 10 (Nilai: 0)</div>
          <div class="completion-actions">
            <button class="btn btn-primary" onclick="ActiveQuiz.resetNew()">
              🔄 Acak 10 Soal Baru
            </button>
            <button class="btn btn-outline" onclick="ActiveQuiz.retrySame()">
              🔁 Ulangi Kuis Ini
            </button>
            <a class="btn btn-outline" href="materi.html">
              📖 Buka Materi Belajar
            </a>
            <a class="btn btn-primary" href="game.html" style="background: linear-gradient(135deg, #2563eb, #1d4ed8);">
              🎮 Mainkan Mini Game →
            </a>
          </div>
        </div>

        <!-- Actions Bawah -->
        <div class="block-actions">
          <button class="btn btn-outline btn-sm" onclick="ActiveQuiz.resetNew()">
            🔄 Acak 10 Soal Baru
          </button>
          <button class="btn btn-outline btn-sm" onclick="ActiveQuiz.retrySame()">
            🔁 Ulangi Kuis
          </button>
        </div>
      </div>
    `;

    this.updateStatsUI();
  }

  handleAnswer(qi, selected) {
    if (this.answered[qi]) return;
    this.answered[qi] = true;

    const q         = this.questions[qi];
    const isCorrect = selected === q.ans;
    const LABELS    = ['A', 'B', 'C', 'D'];

    // Tandai tombol
    q.opts.forEach((_, oi) => {
      const btn = document.getElementById(`opt-${qi}-${oi}`);
      if (!btn) return;
      btn.classList.add('disabled');
      if (oi === q.ans)                  btn.classList.add('correct');
      else if (oi === selected && !isCorrect) btn.classList.add('wrong');
    });

    // Tampilkan Umpan Balik
    const fb = document.getElementById(`fb-${qi}`);
    if (fb) {
      fb.className = `feedback-box show ${isCorrect ? 'correct' : 'wrong'}`;
      fb.innerHTML = isCorrect
        ? `✅ <strong>Benar!</strong> ${q.exp}`
        : `❌ <strong>Kurang tepat.</strong> Jawaban yang benar adalah <strong>${LABELS[q.ans]}</strong>. ${q.exp}`;
    }

    if (isCorrect) this.score++;

    this.updateStatsUI();

    // Cek jika seluruh 10 soal sudah dijawab
    const answeredCount = this.answered.filter(Boolean).length;
    if (answeredCount === this.questions.length) {
      this.showCompletion();
    }
  }

  updateStatsUI() {
    const answeredCount = this.answered.filter(Boolean).length;
    const total         = this.questions.length;
    const scoreVal      = this.score;
    const finalGrade    = Math.round((scoreVal / total) * 100);

    // Update Counter di Block
    const badge = document.getElementById('counter-badge');
    if (badge) badge.textContent = `${answeredCount} / ${total} dijawab`;

    // Update Bar Global di Halaman
    const statAnswered = document.getElementById('stat-answered');
    const statScore    = document.getElementById('stat-score');
    const statGrade    = document.getElementById('stat-grade');
    const statProgress = document.getElementById('progress-fill');

    if (statAnswered) statAnswered.textContent = `${answeredCount} / ${total}`;
    if (statScore)    statScore.textContent    = `${scoreVal} / ${total}`;
    if (statGrade)    statGrade.textContent    = `${finalGrade}`;

    if (statProgress) {
      const pct = (answeredCount / total) * 100;
      statProgress.style.width = pct + '%';
    }
  }

  showCompletion() {
    const card = document.getElementById('completion-card');
    if (!card) return;

    const total      = this.questions.length;
    const finalGrade = Math.round((this.score / total) * 100);

    const iconEl  = document.getElementById('comp-icon');
    const titleEl = document.getElementById('comp-title');
    const descEl  = document.getElementById('comp-desc');
    const scoreEl = document.getElementById('comp-score');

    if (scoreEl) {
      scoreEl.textContent = `Skor Akhir: ${this.score} / ${total} (Nilai: ${finalGrade})`;
    }

    if (finalGrade >= 85) {
      iconEl.textContent = '🏆';
      titleEl.textContent = 'Luar Biasa!';
      descEl.textContent = 'Kamu telah menguasai materi pemrograman dengan sangat baik!';
    } else if (finalGrade >= 70) {
      iconEl.textContent = '👏';
      titleEl.textContent = 'Bagus Sekali!';
      descEl.textContent = 'Pemahamanmu sudah baik. Terus tingkatkan dengan latihan rutin!';
    } else {
      iconEl.textContent = '💪';
      titleEl.textContent = 'Tetap Semangat!';
      descEl.textContent = 'Kamu bisa mengulang materi di halaman Materi dan mencoba kuis lagi.';
    }

    card.style.display = 'block';
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  resetNew() {
    this.questions = pickRandomQuestions(this.pool, this.count);
    this.render();
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }

  retrySame() {
    this.render();
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }
}

/* ─── Singleton Controller untuk Kuis Aktif ─── */
let currentQuizSession = null;

const ActiveQuiz = {
  init(pool, title, babKey = 'gabungan') {
    currentQuizSession = new QuizSession({
      containerId: 'quiz-active-block',
      pool: pool,
      count: 10,
      title: title,
      babKey: babKey
    });
  },

  answer(qi, selected) {
    if (currentQuizSession) {
      currentQuizSession.handleAnswer(qi, selected);
    }
  },

  resetNew() {
    if (currentQuizSession) {
      currentQuizSession.resetNew();
    }
  },

  retrySame() {
    if (currentQuizSession) {
      currentQuizSession.retrySame();
    }
  }
};
