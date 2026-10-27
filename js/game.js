/**
 * game.js
 * Arena Game Mini Edukatif — PembelajaranKode
 * 3 Mini-Games: Bug Smasher, Memory Code Match, Speed Code
 */

'use strict';

/* ─── Helper: HTML Escaping to prevent HTML Injection & Navigation Bugs ─── */
function escapeHTML(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ─── 1. Web Audio API Synthesizer (Zero External Dependencies) ─── */
const SoundFX = {
  ctx: null,
  enabled: true,

  init() {
    if (!this.ctx) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      } catch (e) {
        console.warn('AudioContext not supported:', e);
      }
    }
  },

  toggle() {
    this.enabled = !this.enabled;
    const btn = document.getElementById('sound-toggle-btn');
    if (btn) {
      btn.innerHTML = this.enabled ? '🔊 Suara: ON' : '🔇 Suara: OFF';
    }
  },

  play(type) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === 'hit') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(500, t);
        osc.frequency.exponentialRampToValueAtTime(150, t + 0.12);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.12);
        osc.start(t);
        osc.stop(t + 0.12);
      } else if (type === 'bomb') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, t);
        osc.frequency.exponentialRampToValueAtTime(40, t + 0.25);
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.25);
        osc.start(t);
        osc.stop(t + 0.25);
      } else if (type === 'flip') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.exponentialRampToValueAtTime(580, t + 0.06);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.06);
        osc.start(t);
        osc.stop(t + 0.06);
      } else if (type === 'match') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, t);
        osc.frequency.setValueAtTime(659.25, t + 0.08);
        osc.frequency.setValueAtTime(783.99, t + 0.16);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.28);
        osc.start(t);
        osc.stop(t + 0.28);
      } else if (type === 'win') {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          o.connect(g);
          g.connect(this.ctx.destination);
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.18, t + idx * 0.09);
          g.gain.linearRampToValueAtTime(0.01, t + idx * 0.09 + 0.22);
          o.start(t + idx * 0.09);
          o.stop(t + idx * 0.09 + 0.22);
        });
      }
    } catch (e) {
      console.warn('Sound play error:', e);
    }
  }
};

/* ─── 2. GAME 1: BUG SMASHER ─── */
const BugSmasher = {
  score: 0,
  timeLeft: 30,
  timerInterval: null,
  peepTimeout: null,
  lastHole: null,
  isPlaying: false,
  combo: 0,
  highScore: parseInt(localStorage.getItem('pk_bug_highscore') || '0', 10),

  init() {
    this.renderContainer();
    this.updateStats();
  },

  renderContainer() {
    const container = document.getElementById('game-stage');
    container.innerHTML = `
      <div class="bug-game-container">
        <div class="bug-grid" id="bug-grid">
          ${Array(9).fill(0).map((_, i) => `
            <div class="bug-hole" id="hole-${i}" role="button" tabindex="0" onclick="BugSmasher.whack(${i}, event)" onkeydown="if(event.key==='Enter'||event.key===' ')BugSmasher.whack(${i}, event)" aria-label="Lubang bug ${i + 1}">
              <div class="bug-character" id="bug-${i}">🐞</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="game-overlay-modal" id="game-modal">
        <div class="game-modal-icon">🐞</div>
        <h2 class="game-modal-title">Basmi Bug Kode!</h2>
        <p class="game-modal-desc">
          Terminal diserang bug! Tangkap bug sebanyak mungkin dalam waktu 30 detik. Hindari bom 💣 yang mengurangi skor!
        </p>
        <button class="btn-game-play" onclick="BugSmasher.start()">
          ▶ Mulai Main (30 Detik)
        </button>
      </div>
    `;
  },

  randomHole() {
    const holes = document.querySelectorAll('.bug-hole');
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === this.lastHole) return this.randomHole();
    this.lastHole = hole;
    return { hole, idx };
  },

  peep() {
    if (!this.isPlaying) return;
    const { hole, idx } = this.randomHole();
    const bugEl = document.getElementById(`bug-${idx}`);

    // Tentukan jenis target (Bug biasa, Emas, atau Bom)
    const rand = Math.random();
    let char = '🐞';
    let type = 'normal';

    if (rand < 0.18) {
      char = '💣';
      type = 'bomb';
    } else if (rand < 0.35) {
      char = '⭐';
      type = 'gold';
    } else if (rand < 0.65) {
      char = '🪳';
      type = 'normal';
    }

    bugEl.textContent = char;
    hole.dataset.type = type;
    hole.classList.add('up');
    hole.classList.remove('whacked');

    const peepTime = Math.floor(Math.random() * 500) + 650;

    this.peepTimeout = setTimeout(() => {
      hole.classList.remove('up');
      if (this.isPlaying) this.peep();
    }, peepTime);
  },

  whack(idx, e) {
    if (!this.isPlaying) return;
    const hole = document.getElementById(`hole-${idx}`);
    if (!hole || !hole.classList.contains('up') || hole.classList.contains('whacked')) return;

    hole.classList.add('whacked');
    hole.classList.remove('up');

    clearTimeout(this.peepTimeout);
    this.peepTimeout = setTimeout(() => {
      hole.classList.remove('whacked');
      if (this.isPlaying) this.peep();
    }, 280);

    const type = hole.dataset.type || 'normal';
    let pts = 10;

    if (type === 'bomb') {
      pts = -20;
      this.combo = 0;
      SoundFX.play('bomb');
      this.spawnParticle(hole, '-20 💣', true);
    } else if (type === 'gold') {
      this.combo++;
      pts = 25 + (this.combo > 2 ? 10 : 0);
      SoundFX.play('match');
      this.spawnParticle(hole, `+${pts} ⭐`);
    } else {
      this.combo++;
      pts = 10 + (this.combo > 3 ? 5 : 0);
      SoundFX.play('hit');
      this.spawnParticle(hole, `+${pts}`);
    }

    this.score = Math.max(0, this.score + pts);
    this.updateStats();
  },

  spawnParticle(hole, text, isNeg = false) {
    const p = document.createElement('div');
    p.className = `float-point ${isNeg ? 'neg' : ''}`;
    p.textContent = text;
    p.style.left = '40%';
    p.style.top = '25%';
    hole.appendChild(p);
    setTimeout(() => p.remove(), 600);
  },

  start() {
    document.getElementById('game-modal').style.display = 'none';
    this.score = 0;
    this.timeLeft = 30;
    this.combo = 0;
    this.isPlaying = true;
    this.updateStats();

    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateStats();
      if (this.timeLeft <= 0) {
        this.gameOver();
      }
    }, 1000);

    this.peep();
  },

  gameOver() {
    this.isPlaying = false;
    clearInterval(this.timerInterval);
    clearTimeout(this.peepTimeout);

    document.querySelectorAll('.bug-hole').forEach(h => h.classList.remove('up'));

    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('pk_bug_highscore', this.highScore);
    }

    SoundFX.play('win');

    const modal = document.getElementById('game-modal');
    modal.innerHTML = `
      <div class="game-modal-icon">🏆</div>
      <h2 class="game-modal-title">Waktu Habis!</h2>
      <div class="game-score-banner">Skor Kamu: ${this.score} Poin</div>
      <p class="game-modal-desc">
        ${this.score >= 120 ? 'Gila keren banget! Kamu programmer pembasmi bug sejati!' :
          this.score >= 60 ? 'Mantap! Bug-bug berhasil dibersihkan dengan baik!' :
          'Bagus! Terus latih refleksmu membasmi bug kode.'}
      </p>
      <button class="btn-game-play" onclick="BugSmasher.start()">
        🔄 Main Lagi
      </button>
    `;
    modal.style.display = 'flex';
  },

  updateStats() {
    const sEl = document.getElementById('stat-1-val');
    const tEl = document.getElementById('stat-2-val');
    const cEl = document.getElementById('stat-3-val');
    const hEl = document.getElementById('stat-4-val');

    if (sEl) sEl.textContent = this.score;
    if (tEl) tEl.textContent = `${this.timeLeft}s`;
    if (cEl) cEl.textContent = `${this.combo}x`;
    if (hEl) hEl.textContent = this.highScore;
  }
};

/* ─── 3. GAME 2: MEMORY CARD MATCH ─── */
const MemoryGame = {
  // 8 pasang gambar & istilah identik (total 16 kartu)
  cardsData: [
    { id: 1, text: 'Searching',   icon: '🔍' },
    { id: 1, text: 'Searching',   icon: '🔍' },
    { id: 2, text: 'Coding',      icon: '💻' },
    { id: 2, text: 'Coding',      icon: '💻' },
    { id: 3, text: 'Web Browser', icon: '🌐' },
    { id: 3, text: 'Web Browser', icon: '🌐' },
    { id: 4, text: 'Function',    icon: '⚙️' },
    { id: 4, text: 'Function',    icon: '⚙️' },
    { id: 5, text: 'CSS Style',   icon: '🎨' },
    { id: 5, text: 'CSS Style',   icon: '🎨' },
    { id: 6, text: 'Variable',    icon: '📦' },
    { id: 6, text: 'Variable',    icon: '📦' },
    { id: 7, text: 'JavaScript',  icon: '⚡' },
    { id: 7, text: 'JavaScript',  icon: '⚡' },
    { id: 8, text: 'Security',    icon: '🛡️' },
    { id: 8, text: 'Security',    icon: '🛡️' }
  ],
  flippedCards: [],
  matchedPairs: 0,
  turns: 0,
  seconds: 0,
  timerInterval: null,
  matchTimeout: null,
  isLocked: false,

  clearMatchTimeout() {
    if (this.matchTimeout) {
      clearTimeout(this.matchTimeout);
      this.matchTimeout = null;
    }
  },

  init() {
    this.clearMatchTimeout();
    clearInterval(this.timerInterval);
    this.matchedPairs = 0;
    this.turns = 0;
    this.seconds = 0;
    this.flippedCards = [];
    this.isLocked = false;

    this.renderContainer();
    this.renderInitialCards();
    this.updateStats();
  },

  renderContainer() {
    const container = document.getElementById('game-stage');
    if (!container) return;
    container.innerHTML = `
      <div class="memory-grid" id="memory-grid"></div>
      <div class="game-overlay-modal" id="game-modal">
        <div class="game-modal-icon">🃏</div>
        <h2 class="game-modal-title">Memory Match</h2>
        <p class="game-modal-desc">
          Buka kartu dan temukan pasangan gambar yang sama. Selesaikan semua 8 pasang dengan langkah paling sedikit!
        </p>
        <button class="btn-game-play" onclick="MemoryGame.start()">
          ▶ Mulai Main
        </button>
      </div>
    `;
  },

  renderInitialCards() {
    const grid = document.getElementById('memory-grid');
    if (!grid) return;
    grid.innerHTML = Array(16).fill(0).map((_, idx) => `
      <div class="memory-card preview-card" aria-hidden="true">
        <div class="card-face card-back">&lt;/&gt;</div>
      </div>
    `).join('');
  },

  start() {
    const modal = document.getElementById('game-modal');
    if (modal) modal.style.display = 'none';

    this.clearMatchTimeout();
    this.matchedPairs = 0;
    this.turns = 0;
    this.seconds = 0;
    this.flippedCards = [];
    this.isLocked = false;

    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.seconds++;
      this.updateStats();
    }, 1000);

    // Kocok kartu
    const shuffled = [...this.cardsData].sort(() => Math.random() - 0.5);
    const grid = document.getElementById('memory-grid');
    if (!grid) return;

    grid.innerHTML = shuffled.map((card, idx) => {
      const displayText = escapeHTML(card.text);
      return `
        <div class="memory-card" id="mcard-${idx}" data-id="${card.id}" role="button" tabindex="0"
             onclick="MemoryGame.flip(${idx})"
             onkeydown="MemoryGame.handleKey(event, ${idx})"
             aria-label="Kartu nomor ${idx + 1}">
          <div class="card-face card-back">&lt;/&gt;</div>
          <div class="card-face card-front">
            <span class="card-icon" aria-hidden="true">${card.icon}</span>
            <span class="card-text">${displayText}</span>
          </div>
        </div>
      `;
    }).join('');

    this.updateStats();
  },

  handleKey(e, idx) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.flip(idx);
    }
  },

  flip(idx) {
    if (this.isLocked) return;
    const card = document.getElementById(`mcard-${idx}`);
    if (!card) return;
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
    if (this.flippedCards.some(c => c.idx === idx)) return;
    if (this.flippedCards.length >= 2) return;

    SoundFX.play('flip');
    card.classList.add('flipped');
    this.flippedCards.push({ idx, card, id: card.dataset.id });

    if (this.flippedCards.length === 2) {
      this.turns++;
      this.updateStats();
      this.checkMatch();
    }
  },

  checkMatch() {
    this.isLocked = true;
    if (this.flippedCards.length !== 2) {
      this.isLocked = false;
      return;
    }

    const [c1, c2] = this.flippedCards;
    if (!c1 || !c2 || !c1.card || !c2.card) {
      this.flippedCards = [];
      this.isLocked = false;
      return;
    }

    if (c1.id === c2.id) {
      // Cocok!
      this.clearMatchTimeout();
      this.matchTimeout = setTimeout(() => {
        try {
          SoundFX.play('match');
          if (c1.card) c1.card.classList.add('matched');
          if (c2.card) c2.card.classList.add('matched');
          this.matchedPairs++;
          this.flippedCards = [];
          this.isLocked = false;
          this.updateStats();

          if (this.matchedPairs >= 8) {
            this.victory();
          }
        } catch (err) {
          console.error(err);
          this.isLocked = false;
        }
      }, 350);
    } else {
      // Tidak cocok
      this.clearMatchTimeout();
      this.matchTimeout = setTimeout(() => {
        try {
          if (c1.card) c1.card.classList.add('mismatch');
          if (c2.card) c2.card.classList.add('mismatch');

          setTimeout(() => {
            if (c1.card) c1.card.classList.remove('flipped', 'mismatch');
            if (c2.card) c2.card.classList.remove('flipped', 'mismatch');
            this.flippedCards = [];
            this.isLocked = false;
            this.updateStats();
          }, 350);
        } catch (err) {
          console.error(err);
          this.flippedCards = [];
          this.isLocked = false;
        }
      }, 500);
    }
  },

  victory() {
    clearInterval(this.timerInterval);
    SoundFX.play('win');

    const modal = document.getElementById('game-modal');
    if (!modal) return;
    modal.innerHTML = `
      <div class="game-modal-icon">🎉</div>
      <h2 class="game-modal-title">Hebat! Semua Pasangan Ditemukan</h2>
      <div class="game-score-banner">${this.turns} Langkah • Waktu: ${this.seconds} Detik</div>
      <p class="game-modal-desc">
        Daya ingat visualmu luar biasa tajam!
      </p>
      <button class="btn-game-play" onclick="MemoryGame.start()">
        🔄 Main Lagi
      </button>
    `;
    modal.style.display = 'flex';
  },

  updateStats() {
    const sEl = document.getElementById('stat-1-val');
    const tEl = document.getElementById('stat-2-val');
    const cEl = document.getElementById('stat-3-val');
    const hEl = document.getElementById('stat-4-val');

    if (sEl) sEl.textContent = `${this.matchedPairs} / 8`;
    if (tEl) tEl.textContent = `${this.seconds}s`;
    if (cEl) cEl.textContent = `${this.turns}`;
    if (hEl) hEl.textContent = '8 Pasang';
  }
};

/* ─── 4. GAME 3: SPEED CODE (TEBAK KILAT) ─── */
const SpeedCode = {
  questions: [
    { code: 'console.log(2 + "2")', q: 'Berapa output kode JavaScript di atas?', opts: ['"22"', '4', 'NaN', 'Error'], ans: 0 },
    { code: 'typeof true', q: 'Tipe data dari nilai tersebut adalah?', opts: ['string', 'boolean', 'undefined', 'object'], ans: 1 },
    { code: '10 > 5 && 3 < 1', q: 'Hasil evaluasi logika di atas adalah?', opts: ['true', 'false', 'undefined', 'null'], ans: 1 },
    { code: '<a href="link">', q: 'Fungsi utama elemen HTML ini adalah?', opts: ['Menampilkan teks tebal', 'Membuat tautan/link', 'Membuat form input', 'Memuat video'], ans: 1 },
    { code: 'display: flex', q: 'Dalam CSS, properti ini mengatur?', opts: ['Ukuran font teks', 'Tata letak elemen fleksibel', 'Warna latar belakang', 'Animasi berputar'], ans: 1 },
    { code: '[1, 2, 3].length', q: 'Berapa panjang array tersebut?', opts: ['2', '3', '4', 'undefined'], ans: 1 },
    { code: 'let x = 5; x += 3;', q: 'Berapa nilai x sekarang?', opts: ['8', '15', '53', '5'], ans: 0 },
    { code: 'Math.max(4, 9, 2)', q: 'Output fungsi matematika ini adalah?', opts: ['4', '2', '9', '15'], ans: 2 }
  ],
  currentIndex: 0,
  score: 0,
  streak: 0,
  timer: null,
  timeMs: 7000,
  startTime: 0,

  init() {
    this.renderContainer();
    this.updateStats();
  },

  renderContainer() {
    const container = document.getElementById('game-stage');
    container.innerHTML = `
      <div class="speed-game-container">
        <div class="speed-timer-bar">
          <div class="speed-timer-fill" id="speed-timer-fill"></div>
        </div>
        <div class="speed-snippet-box" id="speed-code">&lt;/&gt;</div>
        <div class="speed-question-text" id="speed-question">...</div>
        <div class="speed-options-grid" id="speed-options"></div>
      </div>

      <div class="game-overlay-modal" id="game-modal">
        <div class="game-modal-icon">⚡</div>
        <h2 class="game-modal-title">Tebak Kilat Kode!</h2>
        <p class="game-modal-desc">
          Kamu hanya punya waktu <strong>7 detik</strong> per pertanyaan. Jawab cepat dan kumpulkan streak tertinggi!
        </p>
        <button class="btn-game-play" onclick="SpeedCode.start()">
          ▶ Mulai Tebak Kilat
        </button>
      </div>
    `;
  },

  start() {
    document.getElementById('game-modal').style.display = 'none';
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.questions.sort(() => Math.random() - 0.5);
    this.nextQuestion();
  },

  nextQuestion() {
    if (this.currentIndex >= this.questions.length) {
      this.finish();
      return;
    }

    const q = this.questions[this.currentIndex];
    document.getElementById('speed-code').textContent = q.code;
    document.getElementById('speed-question').textContent = q.q;

    const optsContainer = document.getElementById('speed-options');
    optsContainer.innerHTML = q.opts.map((opt, i) => `
      <button class="speed-opt-btn" id="sopt-${i}" onclick="SpeedCode.answer(${i})">
        ${opt}
      </button>
    `).join('');

    this.startTimer();
    this.updateStats();
  },

  startTimer() {
    clearInterval(this.timer);
    const fill = document.getElementById('speed-timer-fill');
    this.startTime = Date.now();
    const duration = 7000;

    this.timer = setInterval(() => {
      const elapsed = Date.now() - this.startTime;
      const rem = Math.max(0, duration - elapsed);
      const pct = (rem / duration) * 100;
      fill.style.width = pct + '%';

      if (pct < 30) fill.style.backgroundColor = '#ef4444';
      else fill.style.backgroundColor = '#2563eb';

      if (rem <= 0) {
        clearInterval(this.timer);
        this.timeOut();
      }
    }, 50);
  },

  answer(selected) {
    clearInterval(this.timer);
    const q = this.questions[this.currentIndex];
    const isCorrect = selected === q.ans;
    const btn = document.getElementById(`sopt-${selected}`);

    if (isCorrect) {
      SoundFX.play('match');
      if (btn) btn.classList.add('correct');
      this.score += 10 + (this.streak * 2);
      this.streak++;
    } else {
      SoundFX.play('bomb');
      if (btn) btn.classList.add('wrong');
      const correctBtn = document.getElementById(`sopt-${q.ans}`);
      if (correctBtn) correctBtn.classList.add('correct');
      this.streak = 0;
    }

    this.currentIndex++;
    this.updateStats();

    setTimeout(() => {
      this.nextQuestion();
    }, 800);
  },

  timeOut() {
    SoundFX.play('bomb');
    this.streak = 0;
    const q = this.questions[this.currentIndex];
    const correctBtn = document.getElementById(`sopt-${q.ans}`);
    if (correctBtn) correctBtn.classList.add('correct');

    this.currentIndex++;
    this.updateStats();

    setTimeout(() => {
      this.nextQuestion();
    }, 900);
  },

  finish() {
    SoundFX.play('win');
    const modal = document.getElementById('game-modal');
    modal.innerHTML = `
      <div class="game-modal-icon">🏆</div>
      <h2 class="game-modal-title">Tebak Kilat Selesai!</h2>
      <div class="game-score-banner">Total Skor: ${this.score} Poin</div>
      <p class="game-modal-desc">
        Refleks kode kamu sangat responsif! Mau coba tantangan berikutnya?
      </p>
      <button class="btn-game-play" onclick="SpeedCode.start()">
        🔄 Main Lagi
      </button>
    `;
    modal.style.display = 'flex';
  },

  updateStats() {
    const sEl = document.getElementById('stat-1-val');
    const tEl = document.getElementById('stat-2-val');
    const cEl = document.getElementById('stat-3-val');
    const hEl = document.getElementById('stat-4-val');

    if (sEl) sEl.textContent = this.score;
    if (tEl) tEl.textContent = `${this.currentIndex} / ${this.questions.length}`;
    if (cEl) cEl.textContent = `${this.streak}🔥`;
    if (hEl) hEl.textContent = 'Kilat';
  }
};

/* ─── 5. Controller Pengganti Game ─── */
let activeGame = 'bug';

function setGameMode(mode) {
  activeGame = mode;

  // Bersihkan timer lama
  clearInterval(BugSmasher.timerInterval);
  clearTimeout(BugSmasher.peepTimeout);
  clearInterval(MemoryGame.timerInterval);
  MemoryGame.clearMatchTimeout();
  clearInterval(SpeedCode.timer);

  // Update tabs
  document.querySelectorAll('.game-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.game === mode);
  });

  const stat1Label = document.getElementById('stat-1-label');
  const stat2Label = document.getElementById('stat-2-label');
  const stat3Label = document.getElementById('stat-3-label');
  const stat4Label = document.getElementById('stat-4-label');

  if (mode === 'bug') {
    stat1Label.textContent = 'Skor';
    stat2Label.textContent = 'Sisa Waktu';
    stat3Label.textContent = 'Combo';
    stat4Label.textContent = 'Rekor Terbaik';
    BugSmasher.init();
  } else if (mode === 'memory') {
    stat1Label.textContent = 'Pasangan';
    stat2Label.textContent = 'Waktu';
    stat3Label.textContent = 'Langkah';
    stat4Label.textContent = 'Target';
    MemoryGame.init();
  } else if (mode === 'speed') {
    stat1Label.textContent = 'Skor';
    stat2Label.textContent = 'Soal';
    stat3Label.textContent = 'Streak';
    stat4Label.textContent = 'Mode';
    SpeedCode.init();
  }
}

// Inisialisasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  setGameMode('bug');
});
