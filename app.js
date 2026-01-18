// ==================== PCM × TECH OCEAN - MAIN APP ====================

// App State
const AppState = {
  currentSection: 'game',
  currentPlaylist: 'chill_vibes',
  currentSongIndex: 0,
  isPlaying: false,
  userProgress: {
    xp: 0,
    level: 1,
    streak: 0,
    completedLevels: [],
    lastActive: Date.now()
  },
  audio: null
};

// Initialize App
function initApp() {
  // Hide loading screen after 2 seconds
  setTimeout(() => {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    
    // Load user progress
    loadUserProgress();
    
    // Initialize audio
    AppState.audio = document.getElementById('audio-player');
    setupAudioListeners();
    
    // Show default section
    showSection('game');
    
    console.log('🌊 App Initialized Successfully!');
  }, 2000);
}

// Load User Progress
function loadUserProgress() {
  const saved = localStorage.getItem('userProgress');
  if (saved) {
    AppState.userProgress = JSON.parse(saved);
    updateStatsDisplay();
  }
}

// Save User Progress
function saveUserProgress() {
  localStorage.setItem('userProgress', JSON.stringify(AppState.userProgress));
  updateStatsDisplay();
}

// Update Stats Display
function updateStatsDisplay() {
  const { xp, level, streak } = AppState.userProgress;
  document.getElementById('total-xp').textContent = `${xp} XP`;
  document.getElementById('level-display').textContent = `Level ${level}`;
  document.getElementById('streak-days').textContent = `${streak} Day Streak`;
}

// Show Section
function showSection(section) {
  AppState.currentSection = section;
  
  // Update active nav button
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  event?.target?.classList.add('active');
  
  const content = document.getElementById('content-area');
  
  switch(section) {
    case 'game':
      renderGameLevels(content);
      break;
    case 'music':
      renderMusicPlayer(content);
      break;
    case 'pomodoro':
      renderPomodoro(content);
      break;
    case 'feynman':
      renderFeynmanTechnique(content);
      break;
    case 'spaced':
      renderSpacedRepetition(content);
      break;
    case 'active-recall':
      renderActiveRecall(content);
      break;
    case 'mind-maps':
      renderMindMaps(content);
      break;
    case 'progress':
      renderProgress(content);
      break;
    case 'notes':
      renderNotes(content);
      break;
    case 'challenges':
      renderChallenges(content);
      break;
    default:
      content.innerHTML = '<h1>Section coming soon!</h1>';
  }
}

// ==================== GAME LEVELS ====================
function renderGameLevels(container) {
  const html = `
    <div class="game-section">
      <h1 class="section-title">🎮 Your PCM × Tech Journey</h1>
      <p class="section-subtitle">Progress through levels, earn XP, unlock achievements!</p>
      
      <div class="journey-tabs">
        <button class="journey-tab active" onclick="showJourney('class11')">
          🎓 Class 11 (${GAME_LEVELS.class11.totalLevels} Levels)
        </button>
        <button class="journey-tab" onclick="showJourney('class12')">
          🚀 Class 12 (${GAME_LEVELS.class12.totalLevels} Levels)
        </button>
        <button class="journey-tab" onclick="showJourney('grandMaster')">
          👑 Grand Master (${GAME_LEVELS.grandMaster.totalLevels} Levels)
        </button>
      </div>
      
      <div id="journey-content" class="journey-content"></div>
    </div>
    
    <style>
      .game-section {
        max-width: 1400px;
        margin: 0 auto;
      }
      
      .section-title {
        font-size: 48px;
        text-align: center;
        background: linear-gradient(135deg, var(--primary), var(--accent));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 15px;
      }
      
      .section-subtitle {
        text-align: center;
        color: var(--text-secondary);
        font-size: 18px;
        margin-bottom: 40px;
      }
      
      .journey-tabs {
        display: flex;
        gap: 15px;
        margin-bottom: 40px;
        justify-content: center;
      }
      
      .journey-tab {
        padding: 15px 30px;
        background: var(--bg-card);
        border: 2px solid var(--border);
        border-radius: 15px;
        color: var(--text-secondary);
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 16px;
        font-weight: 600;
      }
      
      .journey-tab:hover {
        border-color: var(--primary);
        color: var(--text-primary);
      }
      
      .journey-tab.active {
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
        border-color: var(--primary);
        color: var(--text-primary);
        box-shadow: var(--glow);
      }
      
      .levels-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 25px;
      }
      
      .level-card {
        background: var(--bg-card);
        border: 2px solid var(--border);
        border-radius: 20px;
        padding: 25px;
        transition: all 0.3s ease;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      
      .level-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, var(--primary), var(--accent));
        transform: scaleX(0);
        transition: transform 0.3s ease;
      }
      
      .level-card:hover {
        border-color: var(--primary);
        transform: translateY(-5px);
        box-shadow: var(--glow);
      }
      
      .level-card:hover::before {
        transform: scaleX(1);
      }
      
      .level-header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 15px;
      }
      
      .level-number {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 18px;
      }
      
      .level-xp {
        padding: 6px 12px;
        background: rgba(6, 255, 165, 0.2);
        border-radius: 20px;
        color: var(--accent);
        font-size: 14px;
        font-weight: 600;
      }
      
      .level-title {
        font-size: 20px;
        margin-bottom: 10px;
        color: var(--text-primary);
      }
      
      .level-meta {
        display: flex;
        gap: 15px;
        margin-bottom: 15px;
        flex-wrap: wrap;
      }
      
      .meta-tag {
        padding: 5px 12px;
        background: rgba(102, 126, 234, 0.1);
        border-radius: 12px;
        font-size: 13px;
        color: var(--text-secondary);
      }
      
      .level-concepts {
        margin-bottom: 15px;
      }
      
      .level-concepts h4 {
        font-size: 14px;
        color: var(--text-secondary);
        margin-bottom: 8px;
      }
      
      .concept-tag {
        display: inline-block;
        padding: 4px 10px;
        background: rgba(118, 75, 162, 0.2);
        border-radius: 10px;
        font-size: 12px;
        margin: 3px;
      }
      
      .tech-blend-badge {
        padding: 12px;
        background: linear-gradient(135deg, rgba(6, 255, 165, 0.1), rgba(0, 212, 255, 0.1));
        border: 1px solid var(--accent);
        border-radius: 12px;
        font-size: 13px;
        color: var(--text-secondary);
        margin-top: 15px;
      }
      
      .level-card.completed {
        opacity: 0.7;
      }
      
      .level-card.completed .level-number {
        background: var(--accent);
      }
      
      .completed-badge {
        position: absolute;
        top: 15px;
        right: 15px;
        background: var(--accent);
        color: #000;
        padding: 5px 12px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: bold;
      }
    </style>
  `;
  
  container.innerHTML = html;
  showJourney('class11');
}

function showJourney(journey) {
  // Update active tab
  document.querySelectorAll('.journey-tab').forEach(tab => tab.classList.remove('active'));
  event?.target?.classList.add('active');
  
  const data = GAME_LEVELS[journey];
  const content = document.getElementById('journey-content');
  
  const html = `
    <div class="levels-grid">
      ${data.levels.map(level => `
        <div class="level-card ${AppState.userProgress.completedLevels.includes(level.id) ? 'completed' : ''}" 
             onclick="openLevel(${level.id})">
          ${AppState.userProgress.completedLevels.includes(level.id) ? '<div class="completed-badge">✓ Completed</div>' : ''}
          
          <div class="level-header">
            <div class="level-number">${level.id}</div>
            <div class="level-xp">+${level.xp} XP</div>
          </div>
          
          <h3 class="level-title">${level.title}</h3>
          
          <div class="level-meta">
            <span class="meta-tag">📚 ${level.subject}</span>
            <span class="meta-tag">⚡ ${level.difficulty}</span>
            ${level.chapter ? `<span class="meta-tag">📖 ${level.chapter}</span>` : ''}
          </div>
          
          <div class="level-concepts">
            <h4>Concepts:</h4>
            ${level.concepts.map(c => `<span class="concept-tag">${c}</span>`).join('')}
          </div>
          
          <div class="tech-blend-badge">
            💻 ${level.techBlend}
          </div>
        </div>
      `).join('')}
    </div>
  `;
  
  content.innerHTML = html;
}

function openLevel(levelId) {
  // Find level across all journeys
  let level = null;
  for (const journey of Object.values(GAME_LEVELS)) {
    level = journey.levels.find(l => l.id === levelId);
    if (level) break;
  }
  
  if (!level) return;
  
  // Show level detail modal
  alert(`Level ${levelId}: ${level.title}\n\nThis will open the full level interface with challenges, code editor, and rewards!`);
}

// ==================== MUSIC PLAYER ====================
function renderMusicPlayer(container) {
  const playlists = Object.entries(MUSIC_LIBRARY.playlists);
  
  const html = `
    <div class="music-player-section">
      <h1 class="section-title">🎵 Music Ocean</h1>
      <p class="section-subtitle">150+ songs • No ads • Pure vibes</p>
      
      <div class="playlist-selector">
        ${playlists.map(([key, playlist]) => `
          <button class="playlist-card ${key === AppState.currentPlaylist ? 'active' : ''}" 
                  onclick="selectPlaylist('${key}')">
            <img src="${playlist.cover}" alt="${playlist.name}">
            <h3>${playlist.name}</h3>
            <p>${playlist.songs.length} songs</p>
          </button>
        `).join('')}
      </div>
      
      <div id="song-list" class="song-list"></div>
    </div>
    
    <style>
      .music-player-section {
        max-width: 1400px;
        margin: 0 auto;
      }
      
      .playlist-selector {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 40px;
      }
      
      .playlist-card {
        background: var(--bg-card);
        border: 2px solid var(--border);
        border-radius: 15px;
        padding: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
      }
      
      .playlist-card img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 10px;
        margin-bottom: 15px;
      }
      
      .playlist-card h3 {
        font-size: 18px;
        margin-bottom: 8px;
      }
      
      .playlist-card p {
        color: var(--text-secondary);
        font-size: 14px;
      }
      
      .playlist-card:hover {
        border-color: var(--primary);
        transform: translateY(-5px);
      }
      
      .playlist-card.active {
        border-color: var(--accent);
        box-shadow: var(--glow);
      }
      
      .song-list {
        display: grid;
        gap: 12px;
      }
      
      .song-item {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 15px;
        display: flex;
        align-items: center;
        gap: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .song-item:hover {
        border-color: var(--primary);
        transform: translateX(5px);
      }
      
      .song-item.playing {
        border-color: var(--accent);
        background: rgba(6, 255, 165, 0.05);
      }
      
      .song-item img {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        object-fit: cover;
      }
      
      .song-info {
        flex: 1;
      }
      
      .song-info h4 {
        font-size: 16px;
        margin-bottom: 5px;
      }
      
      .song-info p {
        color: var(--text-secondary);
        font-size: 14px;
      }
      
      .song-duration {
        color: var(--text-secondary);
        font-size: 14px;
      }
    </style>
  `;
  
  container.innerHTML = html;
  renderSongList();
}

function selectPlaylist(playlistKey) {
  AppState.currentPlaylist = playlistKey;
  AppState.currentSongIndex = 0;
  
  // Update UI
  document.querySelectorAll('.playlist-card').forEach(card => card.classList.remove('active'));
  event?.target?.closest('.playlist-card')?.classList.add('active');
  
  renderSongList();
}

function renderSongList() {
  const playlist = MUSIC_LIBRARY.playlists[AppState.currentPlaylist];
  const container = document.getElementById('song-list');
  
  if (!container) return;
  
  container.innerHTML = playlist.songs.map((song, index) => `
    <div class="song-item ${index === AppState.currentSongIndex && AppState.isPlaying ? 'playing' : ''}" 
         onclick="playSong(${index})">
      <img src="${song.cover}" alt="${song.title}">
      <div class="song-info">
        <h4>${song.title}</h4>
        <p>${song.artist}</p>
      </div>
      <span class="song-duration">${song.duration}</span>
    </div>
  `).join('');
}

function playSong(index) {
  const playlist = MUSIC_LIBRARY.playlists[AppState.currentPlaylist];
  const song = playlist.songs[index];
  
  AppState.currentSongIndex = index;
  AppState.audio.src = song.url;
  AppState.audio.play();
  AppState.isPlaying = true;
  
  // Update floating player
  document.getElementById('current-song-cover').src = song.cover;
  document.getElementById('current-song-title').textContent = song.title;
  document.getElementById('current-song-artist').textContent = song.artist;
  document.getElementById('play-icon').className = 'fas fa-pause';
  
  // Update song list
  renderSongList();
}

function togglePlay() {
  if (AppState.isPlaying) {
    AppState.audio.pause();
    AppState.isPlaying = false;
    document.getElementById('play-icon').className = 'fas fa-play';
  } else {
    AppState.audio.play();
    AppState.isPlaying = true;
    document.getElementById('play-icon').className = 'fas fa-pause';
  }
}

function nextSong() {
  const playlist = MUSIC_LIBRARY.playlists[AppState.currentPlaylist];
  AppState.currentSongIndex = (AppState.currentSongIndex + 1) % playlist.songs.length;
  playSong(AppState.currentSongIndex);
}

function previousSong() {
  const playlist = MUSIC_LIBRARY.playlists[AppState.currentPlaylist];
  AppState.currentSongIndex = (AppState.currentSongIndex - 1 + playlist.songs.length) % playlist.songs.length;
  playSong(AppState.currentSongIndex);
}

function seekSong(event) {
  const bar = event.currentTarget;
  const clickX = event.offsetX;
  const width = bar.offsetWidth;
  const percentage = clickX / width;
  AppState.audio.currentTime = AppState.audio.duration * percentage;
}

function setupAudioListeners() {
  AppState.audio.addEventListener('timeupdate', () => {
    const percentage = (AppState.audio.currentTime / AppState.audio.duration) * 100;
    document.getElementById('progress-fill').style.width = percentage + '%';
    
    const current = formatTime(AppState.audio.currentTime);
    const duration = formatTime(AppState.audio.duration);
    document.getElementById('current-time').textContent = current;
    document.getElementById('duration').textContent = duration;
  });
  
  AppState.audio.addEventListener('ended', () => {
    nextSong();
  });
}

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ==================== OTHER SECTIONS (Placeholders) ====================
function renderPomodoro(container) {
  container.innerHTML = '<h1>🍅 Pomodoro Timer Coming Soon!</h1>';
}

function renderFeynmanTechnique(container) {
  container.innerHTML = '<h1>💡 Feynman Technique Coming Soon!</h1>';
}

function renderSpacedRepetition(container) {
  container.innerHTML = '<h1>📅 Spaced Repetition Coming Soon!</h1>';
}

function renderActiveRecall(container) {
  container.innerHTML = '<h1>🧠 Active Recall Coming Soon!</h1>';
}

function renderMindMaps(container) {
  container.innerHTML = '<h1>🗺️ Mind Maps Coming Soon!</h1>';
}

function renderProgress(container) {
  container.innerHTML = '<h1>📊 Progress Dashboard Coming Soon!</h1>';
}

function renderNotes(container) {
  container.innerHTML = '<h1>📝 Notes Coming Soon!</h1>';
}

function renderChallenges(container) {
  container.innerHTML = '<h1>🏆 Daily Challenges Coming Soon!</h1>';
}

// Initialize on load
window.addEventListener('DOMContentLoaded', initApp);

console.log('🚀 App.js Loaded Successfully!');
