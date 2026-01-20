// ==================== MAIN APP - FIXED & WORKING ====================

// Global instances
let gameEngine;
let learningTools;
let themeManager;

// App initialization
document.addEventListener('DOMContentLoaded', () => {
  console.log('🌊 DOM Content Loaded - Starting initialization...');
  
  try {
    initializeApp();
  } catch (error) {
    console.error('❌ Initialization Error:', error);
    showErrorScreen(error.message);
  }
});

async function initializeApp() {
  console.log('🌊 Initializing PCM × Tech Ocean...');
  
  // Verify dependencies
  if (!verifyDependencies()) {
    throw new Error('Required dependencies not loaded');
  }
  
  // Show loading screen
  showLoadingProgress();
  
  // Initialize core systems
  await initializeSystems();
  
  // Setup navigation
  setupNavigation();
  
  // Setup sidebar toggle
  setupSidebarToggle();
  
  // Load default section
  setTimeout(() => {
    hideLoadingScreen();
    showSection('dashboard');
  }, 2000);
  
  console.log('✅ App Initialized Successfully!');
}

function verifyDependencies() {
  const required = ['APP_CONFIG', 'MUSIC_LIBRARY', 'GAME_LEVELS', 'DEEP_LEARNING_TECHNIQUES'];
  const missing = [];
  
  required.forEach(dep => {
    if (typeof window[dep] === 'undefined') {
      missing.push(dep);
      console.error(`❌ Missing: ${dep}`);
    } else {
      console.log(`✅ Loaded: ${dep}`);
    }
  });
  
  if (missing.length > 0) {
    console.error('❌ Missing dependencies:', missing);
    return false;
  }
  
  return true;
}

async function initializeSystems() {
  try {
    // Initialize Theme Manager
    if (typeof ThemeManager !== 'undefined') {
      themeManager = new ThemeManager();
      console.log('✅ Theme Manager initialized');
    } else {
      console.warn('⚠️ ThemeManager not available');
    }
    await sleep(200);
    
    // Initialize Music Player
    if (typeof MusicPlayer !== 'undefined') {
      musicPlayer = new MusicPlayer();
      console.log('✅ Music Player initialized');
    } else {
      console.warn('⚠️ MusicPlayer not available');
    }
    await sleep(200);
    
    // Initialize Game Engine
    if (typeof GameEngine !== 'undefined') {
      gameEngine = new GameEngine();
      console.log('✅ Game Engine initialized');
    } else {
      console.warn('⚠️ GameEngine not available');
    }
    await sleep(200);
    
    // Initialize Learning Tools
    if (typeof LearningTools !== 'undefined') {
      learningTools = new LearningTools();
      console.log('✅ Learning Tools initialized');
    } else {
      console.warn('⚠️ LearningTools not available');
    }
    await sleep(200);
    
    console.log('✅ All systems initialized');
  } catch (error) {
    console.error('❌ System initialization error:', error);
  }
}

function showLoadingProgress() {
  const progress = document.getElementById('loading-progress');
  if (!progress) return;
  
  let width = 0;
  const interval = setInterval(() => {
    width += 3;
    progress.style.width = width + '%';
    if (width >= 100) clearInterval(interval);
  }, 30);
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  const app = document.getElementById('app');
  
  if (loadingScreen) loadingScreen.style.display = 'none';
  if (app) app.style.display = 'block';
}

function showErrorScreen(message) {
  document.body.innerHTML = `
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
      color: white;
      font-family: 'Inter', sans-serif;
      text-align: center;
      padding: 20px;
    ">
      <div>
        <h1 style="font-size: 48px; margin-bottom: 20px;">⚠️ Error</h1>
        <p style="font-size: 18px; color: #94a3b8; margin-bottom: 30px;">${message}</p>
        <button onclick="location.reload()" style="
          padding: 12px 30px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        ">Reload Page</button>
      </div>
    </div>
  `;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ===== NAVIGATION =====
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const section = item.getAttribute('data-section');
      if (section) {
        showSection(section);
        
        // Update active state
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Close sidebar on mobile
        if (window.innerWidth <= 1024) {
          const sidebar = document.getElementById('sidebar');
          if (sidebar) sidebar.classList.remove('open');
        }
      }
    });
  });
}

function showSection(sectionName) {
  const content = document.getElementById('main-content');
  if (!content) return;
  
  console.log('📄 Loading section:', sectionName);
  
  // Render appropriate section
  try {
    switch(sectionName) {
      case 'dashboard':
        renderDashboard(content);
        break;
      case 'game-levels':
        renderGameLevels(content);
        break;
      case 'music-ocean':
        renderMusicOcean(content);
        break;
      case 'pomodoro':
        renderPomodoro(content);
        break;
      case 'feynman':
        renderFeynman(content);
        break;
      case 'spaced-repetition':
        renderSpacedRepetition(content);
        break;
      case 'active-recall':
        renderActiveRecall(content);
        break;
      case 'mind-maps':
        renderMindMaps(content);
        break;
      case 'notes':
        renderNotes(content);
        break;
      case 'flashcards':
        renderFlashcards(content);
        break;
      case 'progress':
        renderProgress(content);
        break;
      case 'challenges':
        renderChallenges(content);
        break;
      case 'achievements':
        renderAchievements(content);
        break;
      default:
        renderComingSoon(content, sectionName);
    }
  } catch (error) {
    console.error('❌ Section render error:', error);
    content.innerHTML = `
      <div style="text-align: center; padding: 50px;">
        <h2 style="color: #ff4444;">Error loading section</h2>
        <p style="color: #94a3b8;">${error.message}</p>
      </div>
    `;
  }
  
  // Scroll to top
  content.scrollTop = 0;
}

// ===== DASHBOARD =====
function renderDashboard(container) {
  const progress = gameEngine ? gameEngine.getProgress() : {
    level: 1,
    xp: 0,
    streak: 0,
    completedLevels: []
  };
  
  const dueCards = learningTools ? learningTools.getDueFlashcards() : [];
  
  container.innerHTML = `
    <div class="dashboard">
      <div class="dashboard-header">
        <h1 class="text-gradient">Welcome Back! 🌊</h1>
        <p class="subtitle">Continue your PCM × Tech journey</p>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card glass-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-value">${progress.level}</div>
          <div class="stat-label">Current Level</div>
        </div>
        
        <div class="stat-card glass-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-value">${progress.xp}</div>
          <div class="stat-label">Total XP</div>
        </div>
        
        <div class="stat-card glass-card">
          <div class="stat-icon">🔥</div>
          <div class="stat-value">${progress.streak}</div>
          <div class="stat-label">Day Streak</div>
        </div>
        
        <div class="stat-card glass-card">
          <div class="stat-icon">✅</div>
          <div class="stat-value">${progress.completedLevels.length}</div>
          <div class="stat-label">Levels Completed</div>
        </div>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card glass-card">
          <h3>📚 Continue Learning</h3>
          <p>Pick up where you left off</p>
          <button class="btn-primary" onclick="showSection('game-levels')">
            Start Learning
          </button>
        </div>
        
        <div class="dashboard-card glass-card">
          <h3>🎵 Music Ocean</h3>
          <p>150+ songs to keep you focused</p>
          <button class="btn-primary" onclick="showSection('music-ocean')">
            Play Music
          </button>
        </div>
        
        <div class="dashboard-card glass-card">
          <h3>🧠 Flashcards Due</h3>
          <p>${dueCards.length} cards ready for review</p>
          <button class="btn-primary" onclick="showSection('flashcards')">
            Review Now
          </button>
        </div>
        
        <div class="dashboard-card glass-card">
          <h3>🍅 Pomodoro</h3>
          <p>Stay focused with timed sessions</p>
          <button class="btn-primary" onclick="showSection('pomodoro')">
            Start Timer
          </button>
        </div>
      </div>
    </div>
    
    <style>
      .dashboard {
        max-width: 1400px;
        margin: 0 auto;
      }
      
      .dashboard-header {
        text-align: center;
        margin-bottom: 40px;
      }
      
      .dashboard-header h1 {
        font-size: 48px;
        margin-bottom: 10px;
      }
      
      .subtitle {
        font-size: 18px;
        color: var(--text-secondary);
      }
      
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 40px;
      }
      
      .stat-card {
        padding: 30px;
        text-align: center;
        transition: var(--transition-normal);
      }
      
      .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--glow);
      }
      
      .stat-icon {
        font-size: 48px;
        margin-bottom: 15px;
      }
      
      .stat-value {
        font-size: 36px;
        font-weight: 700;
        color: var(--accent);
        margin-bottom: 8px;
      }
      
      .stat-label {
        font-size: 14px;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 25px;
      }
      
      .dashboard-card {
        padding: 30px;
        transition: var(--transition-normal);
      }
      
      .dashboard-card:hover {
        transform: translateY(-5px);
        border-color: var(--primary);
      }
      
      .dashboard-card h3 {
        font-size: 24px;
        margin-bottom: 10px;
      }
      
      .dashboard-card p {
        color: var(--text-secondary);
        margin-bottom: 20px;
      }
      
      .btn-primary {
        width: 100%;
        padding: 12px 24px;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        border: none;
        border-radius: var(--radius-md);
        color: white;
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition-normal);
      }
      
      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: var(--glow);
      }
    </style>
  `;
}

// ===== GAME LEVELS =====
function renderGameLevels(container) {
  if (!GAME_LEVELS) {
    container.innerHTML = '<p style="color: white; padding: 50px; text-align: center;">Game levels not loaded</p>';
    return;
  }
  
  container.innerHTML = `
    <div class="game-levels-section">
      <h1 class="section-title text-gradient">🎮 Game Levels</h1>
      <p class="section-subtitle">Master PCM × Tech through interactive challenges</p>
      
      <div class="journey-selector">
        <button class="journey-btn active" onclick="loadJourney('class11')">
          🎓 Class 11 (${GAME_LEVELS.class11.totalLevels} Levels)
        </button>
        <button class="journey-btn" onclick="loadJourney('class12')">
          🚀 Class 12 (${GAME_LEVELS.class12.totalLevels} Levels)
        </button>
        <button class="journey-btn" onclick="loadJourney('grandMaster')">
          👑 Grand Master (${GAME_LEVELS.grandMaster.totalLevels} Levels)
        </button>
      </div>
      
      <div id="levels-container" class="levels-container"></div>
    </div>
    
    <style>
      .section-title {
        font-size: 48px;
        text-align: center;
        margin-bottom: 10px;
      }
      
      .section-subtitle {
        text-align: center;
        color: var(--text-secondary);
        font-size: 18px;
        margin-bottom: 40px;
      }
      
      .journey-selector {
        display: flex;
        gap: 15px;
        justify-content: center;
        margin-bottom: 40px;
        flex-wrap: wrap;
      }
      
      .journey-btn {
        padding: 15px 30px;
        background: var(--bg-card);
        border: 2px solid var(--border);
        border-radius: var(--radius-lg);
        color: var(--text-secondary);
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition-normal);
      }
      
      .journey-btn:hover {
        border-color: var(--primary);
        color: var(--text-primary);
      }
      
      .journey-btn.active {
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
        border-color: var(--primary);
        color: var(--text-primary);
        box-shadow: var(--glow);
      }
      
      .levels-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 25px;
      }
    </style>
  `;
  
  loadJourney('class11');
}

function loadJourney(journeyKey) {
  if (!GAME_LEVELS || !GAME_LEVELS[journeyKey]) {
    console.error('Journey not found:', journeyKey);
    return;
  }
  
  const journey = GAME_LEVELS[journeyKey];
  const container = document.getElementById('levels-container');
  if (!container) return;
  
  // Update active button
  document.querySelectorAll('.journey-btn').forEach(btn => btn.classList.remove('active'));
  if (event && event.target) event.target.classList.add('active');
  
  const isCompleted = (levelId) => gameEngine ? gameEngine.isLevelCompleted(levelId) : false;
  
  container.innerHTML = journey.levels.map(level => `
    <div class="level-card glass-card ${isCompleted(level.id) ? 'completed' : ''}" onclick="openLevel(${level.id})">
      ${isCompleted(level.id) ? '<div class="completed-badge">✓ Completed</div>' : ''}
      
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
        <div class="concepts-list">
          ${level.concepts.map(c => `<span class="concept-tag">${c}</span>`).join('')}
        </div>
      </div>
      
      <div class="tech-blend-badge">
        💻 ${level.techBlend}
      </div>
    </div>
  `).join('');
  
  addLevelCardStyles();
}

function addLevelCardStyles() {
  if (document.getElementById('level-card-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'level-card-styles';
  style.textContent = `
    .level-card {
      padding: 25px;
      cursor: pointer;
      transition: var(--transition-normal);
      position: relative;
    }
    
    .level-card:hover {
      transform: translateY(-5px);
      border-color: var(--primary);
      box-shadow: var(--glow);
    }
    
    .level-card.completed {
      opacity: 0.8;
    }
    
    .completed-badge {
      position: absolute;
      top: 15px;
      right: 15px;
      padding: 6px 12px;
      background: var(--accent);
      color: #000;
      border-radius: var(--radius-md);
      font-size: 12px;
      font-weight: 700;
    }
    
    .level-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
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
      font-weight: 700;
      font-size: 18px;
    }
    
    .level-xp {
      padding: 6px 12px;
      background: rgba(6, 255, 165, 0.2);
      border-radius: var(--radius-full);
      color: var(--accent);
      font-size: 14px;
      font-weight: 600;
    }
    
    .level-title {
      font-size: 20px;
      margin-bottom: 15px;
    }
    
    .level-meta {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 15px;
    }
    
    .meta-tag {
      padding: 5px 12px;
      background: rgba(102, 126, 234, 0.1);
      border-radius: var(--radius-md);
      font-size: 13px;
      color: var(--text-secondary);
    }
    
    .level-concepts h4 {
      font-size: 14px;
      color: var(--text-secondary);
      margin-bottom: 8px;
    }
    
    .concepts-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    
    .concept-tag {
      padding: 4px 10px;
      background: rgba(118, 75, 162, 0.2);
      border-radius: var(--radius-sm);
      font-size: 12px;
    }
    
    .tech-blend-badge {
      margin-top: 15px;
      padding: 12px;
      background: linear-gradient(135deg, rgba(6, 255, 165, 0.1), rgba(0, 212, 255, 0.1));
      border: 1px solid var(--accent);
      border-radius: var(--radius-md);
      font-size: 13px;
      color: var(--text-secondary);
    }
  `;
  document.head.appendChild(style);
}

function openLevel(levelId) {
  alert(`🎮 Level ${levelId}\n\nInteractive challenge interface coming soon!\n\nWill include:\n✅ Quiz questions\n✅ Code editor\n✅ Real-time feedback\n✅ XP rewards`);
}

// ===== MUSIC OCEAN =====
function renderMusicOcean(container) {
  if (!MUSIC_LIBRARY) {
    container.innerHTML = '<p style="color: white; padding: 50px; text-align: center;">Music library not loaded</p>';
    return;
  }
  
  const playlists = Object.entries(MUSIC_LIBRARY.playlists);
  const currentPlaylist = musicPlayer ? musicPlayer.currentPlaylist : 'chill_vibes';
  
  container.innerHTML = `
    <div class="music-section">
      <h1 class="section-title text-gradient">🎵 Music Ocean</h1>
      <p class="section-subtitle">150+ songs • No ads • Pure vibes</p>
      
      <div class="playlists-grid">
        ${playlists.map(([key, playlist]) => `
          <div class="playlist-card glass-card ${key === currentPlaylist ? 'active' : ''}" 
               onclick="selectPlaylist('${key}')">
            <img src="${playlist.cover}" alt="${playlist.name}">
            <h3>${playlist.name}</h3>
            <p>${playlist.songs.length} songs</p>
          </div>
        `).join('')}
      </div>
      
      <div id="songs-list" class="songs-list"></div>
    </div>
    
    <style>
      .playlists-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 40px;
      }
      
      .playlist-card {
        padding: 20px;
        text-align: center;
        cursor: pointer;
        transition: var(--transition-normal);
      }
      
      .playlist-card img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: var(--radius-md);
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
        transform: translateY(-5px);
        border-color: var(--primary);
      }
      
      .playlist-card.active {
        border-color: var(--accent);
        box-shadow: var(--glow-accent);
      }
      
      .songs-list {
        display: grid;
        gap: 12px;
      }
    </style>
  `;
  
  renderSongsList();
}

function selectPlaylist(playlistKey) {
  if (musicPlayer) {
    musicPlayer.loadPlaylist(playlistKey);
    
    // Update UI
    document.querySelectorAll('.playlist-card').forEach(card => card.classList.remove('active'));
    if (event && event.target) {
      const card = event.target.closest('.playlist-card');
      if (card) card.classList.add('active');
    }
    
    renderSongsList();
  }
}

function renderSongsList() {
  const container = document.getElementById('songs-list');
  if (!container || !musicPlayer) return;
  
  const songs = musicPlayer.getQueue();
  const currentSong = musicPlayer.getCurrentSong();
  
  container.innerHTML = songs.map((song, index) => `
    <div class="song-item glass-card ${currentSong && currentSong.title === song.title ? 'playing' : ''}" 
         onclick="playSongFromList(${index})">
      <img src="${song.cover}" alt="${song.title}">
      <div class="song-info-item">
        <h4>${song.title}</h4>
        <p>${song.artist}</p>
      </div>
      <span class="song-duration">${song.duration}</span>
    </div>
  `).join('');
  
  addSongItemStyles();
}

function addSongItemStyles() {
  if (document.getElementById('song-item-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'song-item-styles';
  style.textContent = `
    .song-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 15px;
      cursor: pointer;
      transition: var(--transition-normal);
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
      border-radius: var(--radius-md);
      object-fit: cover;
    }
    
    .song-info-item {
      flex: 1;
    }
    
    .song-info-item h4 {
      font-size: 16px;
      margin-bottom: 5px;
    }
    
    .song-info-item p {
      font-size: 14px;
      color: var(--text-secondary);
    }
    
    .song-duration {
      color: var(--text-muted);
      font-size: 14px;
    }
  `;
  document.head.appendChild(style);
}

function playSongFromList(index) {
  if (musicPlayer) {
    musicPlayer.loadSong(index);
    musicPlayer.play();
    renderSongsList();
  }
}

// ===== OTHER SECTIONS (Placeholders) =====
function renderPomodoro(container) {
  renderComingSoon(container, 'Pomodoro Timer');
}

function renderFeynman(container) {
  renderComingSoon(container, 'Feynman Technique');
}

function renderSpacedRepetition(container) {
  renderComingSoon(container, 'Spaced Repetition');
}

function renderActiveRecall(container) {
  renderComingSoon(container, 'Active Recall');
}

function renderMindMaps(container) {
  renderComingSoon(container, 'Mind Maps');
}

function renderNotes(container) {
  renderComingSoon(container, 'Notes');
}

function renderFlashcards(container) {
  renderComingSoon(container, 'Flashcards');
}

function renderProgress(container) {
  renderComingSoon(container, 'Progress Dashboard');
}

function renderChallenges(container) {
  renderComingSoon(container, 'Daily Challenges');
}

function renderAchievements(container) {
  renderComingSoon(container, 'Achievements');
}

function renderComingSoon(container, featureName) {
  container.innerHTML = `
    <div class="coming-soon">
      <div class="coming-soon-content">
        <h1 class="text-gradient">🚧 ${featureName}</h1>
        <p>This feature is being built with love...</p>
        <p class="subtitle">Check back soon for updates!</p>
      </div>
    </div>
    
    <style>
      .coming-soon {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 60vh;
      }
      
      .coming-soon-content {
        text-align: center;
      }
      
      .coming-soon h1 {
        font-size: 48px;
        margin-bottom: 20px;
      }
      
      .coming-soon p {
        font-size: 18px;
        color: var(--text-secondary);
        margin-bottom: 10px;
      }
    </style>
  `;
}

// ===== SIDEBAR TOGGLE =====
function setupSidebarToggle() {
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.getElementById('sidebar');
  
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

// ===== THEME SELECTOR =====
function showThemeSelector() {
  if (!themeManager) {
    alert('Theme manager not available');
    return;
  }
  
  const modal = document.getElementById('theme-modal');
  const grid = document.getElementById('theme-grid');
  
  if (!modal || !grid) return;
  
  const themes = themeManager.getAllThemes();
  
  grid.innerHTML = themes.map((theme, index) => `
    <div class="theme-option glass-card" onclick="selectTheme(${index})">
      <div class="theme-preview-large" style="background: ${theme.background}"></div>
      <h3>${theme.name}</h3>
      <p>${theme.type}</p>
      <span class="theme-desc">${theme.description}</span>
    </div>
  `).join('');
  
  modal.classList.add('active');
  
  addThemeOptionStyles();
}

function addThemeOptionStyles() {
  if (document.getElementById('theme-option-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'theme-option-styles';
  style.textContent = `
    .theme-selector {
      max-width: 1000px;
    }
    
    #theme-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }
    
    .theme-option {
      padding: 20px;
      cursor: pointer;
      transition: var(--transition-normal);
    }
    
    .theme-option:hover {
      transform: translateY(-5px);
      border-color: var(--primary);
    }
    
    .theme-preview-large {
      width: 100%;
      height: 120px;
      border-radius: var(--radius-md);
      margin-bottom: 15px;
    }
    
    .theme-option h3 {
      font-size: 18px;
      margin-bottom: 5px;
    }
    
    .theme-option p {
      font-size: 12px;
      color: var(--text-muted);
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    
    .theme-desc {
      font-size: 13px;
      color: var(--text-secondary);
    }
  `;
  document.head.appendChild(style);
}

function closeThemeSelector() {
  const modal = document.getElementById('theme-modal');
  if (modal) modal.classList.remove('active');
}

function selectTheme(index) {
  if (themeManager) {
    themeManager.currentThemeIndex = index;
    themeManager.applyTheme(index);
    themeManager.saveThemeData();
  }
  closeThemeSelector();
}

console.log('🚀 Main App Loaded Successfully!');
