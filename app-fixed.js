// ==================== MAIN APP - FIXED & WORKING ====================

// Global instances
let gameEngine;
let learningTools;
let themeManager;
let musicPlayer;

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
  console.log('🔍 Verifying dependencies...');
  
  // Check each dependency directly (not via window[])
  const checks = {
    'APP_CONFIG': typeof APP_CONFIG !== 'undefined',
    'MUSIC_LIBRARY': typeof MUSIC_LIBRARY !== 'undefined',
    'GAME_LEVELS': typeof GAME_LEVELS !== 'undefined',
    'DEEP_LEARNING_TECHNIQUES': typeof DEEP_LEARNING_TECHNIQUES !== 'undefined'
  };
  
  const missing = [];
  
  Object.entries(checks).forEach(([name, exists]) => {
    if (exists) {
      console.log(`✅ Loaded: ${name}`);
    } else {
      console.error(`❌ Missing: ${name}`);
      missing.push(name);
    }
  });
  
  if (missing.length > 0) {
    console.error('❌ Missing dependencies:', missing.join(', '));
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
  
  console.log('✅ Loading screen hidden, app visible');
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
  if (!content) {
    console.warn('⚠️ main-content element not found');
    return;
  }
  
  console.log('📄 Loading section:', sectionName);
  
  // Render appropriate section
  try {
    switch(sectionName) {
      case 'dashboard':
        renderDashboard();
        break;
      case 'game-levels':
        renderGameLevels();
        break;
      case 'music-ocean':
        renderMusicOcean();
        break;
      case 'pomodoro':
        renderPomodoro();
        break;
      case 'feynman':
        renderFeynman();
        break;
      case 'spaced-repetition':
        renderSpacedRepetition();
        break;
      case 'active-recall':
        renderActiveRecall();
        break;
      case 'mind-maps':
        renderMindMaps();
        break;
      case 'notes':
        renderNotes();
        break;
      case 'flashcards':
        renderFlashcards();
        break;
      case 'progress':
        renderProgress();
        break;
      case 'challenges':
        renderChallenges();
        break;
      case 'achievements':
        renderAchievements();
        break;
      default:
        renderDashboard();
    }
    
    // Update page title
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) {
      pageTitle.textContent = sectionName.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
  } catch (error) {
    console.error('❌ Error rendering section:', error);
    content.innerHTML = `
      <div class="error-message">
        <h2>⚠️ Error Loading Section</h2>
        <p>${error.message}</p>
      </div>
    `;
  }
}

// ===== SIDEBAR TOGGLE =====
function setupSidebarToggle() {
  const toggleBtns = document.querySelectorAll('.menu-toggle');
  const sidebar = document.getElementById('sidebar');
  
  if (!sidebar) return;
  
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  });
  
  // Close on outside click (mobile)
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
      if (!sidebar.contains(e.target) && !e.target.closest('.menu-toggle')) {
        sidebar.classList.remove('open');
      }
    }
  });
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
  }
}

// ===== RENDER FUNCTIONS =====

function renderDashboard() {
  const content = document.getElementById('main-content');
  if (!content) return;
  
  const progress = gameEngine ? gameEngine.userProgress : {
    level: 1,
    xp: 0,
    streak: 0,
    completedLevels: []
  };
  
  content.innerHTML = `
    <div class="dashboard">
      <div class="stats-grid">
        <div class="stat-card glass-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-value">${progress.level}</div>
          <div class="stat-label">Level</div>
        </div>
        
        <div class="stat-card glass-card">
          <div class="stat-icon">🎯</div>
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
          <div class="stat-label">Completed</div>
        </div>
      </div>
      
      <div class="quick-actions">
        <h3>Quick Actions</h3>
        <div class="action-grid">
          <div class="action-card glass-card" onclick="showSection('game-levels')">
            <div class="action-icon">🎮</div>
            <div class="action-title">Continue Learning</div>
            <div class="action-desc">Resume your progress</div>
          </div>
          
          <div class="action-card glass-card" onclick="showSection('music-ocean')">
            <div class="action-icon">🎵</div>
            <div class="action-title">Music Ocean</div>
            <div class="action-desc">Study with music</div>
          </div>
          
          <div class="action-card glass-card" onclick="showSection('flashcards')">
            <div class="action-icon">🎴</div>
            <div class="action-title">Flashcards</div>
            <div class="action-desc">Quick revision</div>
          </div>
          
          <div class="action-card glass-card" onclick="showSection('pomodoro')">
            <div class="action-icon">🍅</div>
            <div class="action-title">Pomodoro</div>
            <div class="action-desc">Focused study session</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderGameLevels() {
  const content = document.getElementById('main-content');
  if (!content) return;
  
  content.innerHTML = `
    <div class="game-levels">
      <h2>🎮 Game Levels</h2>
      <p>Choose your class and start learning!</p>
      
      <div class="class-selector">
        <button class="class-btn active" onclick="showClassLevels('class11')">Class 11</button>
        <button class="class-btn" onclick="showClassLevels('class12')">Class 12</button>
      </div>
      
      <div id="levels-container" class="levels-grid">
        <!-- Levels will be loaded here -->
      </div>
    </div>
  `;
  
  showClassLevels('class11');
}

function showClassLevels(className) {
  const container = document.getElementById('levels-container');
  if (!container) return;
  
  const classData = GAME_LEVELS[className];
  if (!classData) return;
  
  let html = '';
  
  Object.entries(classData.subjects).forEach(([subject, data]) => {
    html += `
      <div class="subject-section">
        <h3>${data.name}</h3>
        <div class="levels-list">
    `;
    
    data.levels.forEach(level => {
      const isCompleted = gameEngine && gameEngine.userProgress.completedLevels.includes(level.id);
      html += `
        <div class="level-card glass-card ${isCompleted ? 'completed' : ''}" onclick="startLevel('${level.id}')">
          <div class="level-number">${level.level}</div>
          <div class="level-info">
            <div class="level-title">${level.title}</div>
            <div class="level-xp">+${level.xp} XP</div>
          </div>
          ${isCompleted ? '<div class="level-check">✓</div>' : ''}
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

function startLevel(levelId) {
  console.log('🎮 Starting level:', levelId);
  alert(`Level ${levelId} - Coming soon! Full game implementation in progress.`);
}

function renderMusicOcean() {
  const content = document.getElementById('main-content');
  if (!content) return;
  
  content.innerHTML = `
    <div class="music-ocean">
      <h2>🎵 Music Ocean</h2>
      <p>Choose a playlist to enhance your study session</p>
      
      <div class="playlists-grid">
        ${Object.entries(MUSIC_LIBRARY.playlists).map(([id, playlist]) => `
          <div class="playlist-card glass-card" onclick="musicPlayer?.loadPlaylist('${id}')">
            <div class="playlist-cover">${playlist.emoji}</div>
            <div class="playlist-info">
              <div class="playlist-name">${playlist.name}</div>
              <div class="playlist-desc">${playlist.description}</div>
              <div class="playlist-count">${playlist.songs.length} songs</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Placeholder render functions
function renderPomodoro() {
  const content = document.getElementById('main-content');
  if (!content) return;
  content.innerHTML = '<div class="section-placeholder"><h2>🍅 Pomodoro Timer</h2><p>Coming soon!</p></div>';
}

function renderFeynman() {
  const content = document.getElementById('main-content');
  if (!content) return;
  content.innerHTML = '<div class="section-placeholder"><h2>🧠 Feynman Technique</h2><p>Coming soon!</p></div>';
}

function renderSpacedRepetition() {
  const content = document.getElementById('main-content');
  if (!content) return;
  content.innerHTML = '<div class="section-placeholder"><h2>📅 Spaced Repetition</h2><p>Coming soon!</p></div>';
}

function renderActiveRecall() {
  const content = document.getElementById('main-content');
  if (!content) return;
  content.innerHTML = '<div class="section-placeholder"><h2>💡 Active Recall</h2><p>Coming soon!</p></div>';
}

function renderMindMaps() {
  const content = document.getElementById('main-content');
  if (!content) return;
  content.innerHTML = '<div class="section-placeholder"><h2>🗺️ Mind Maps</h2><p>Coming soon!</p></div>';
}

function renderNotes() {
  const content = document.getElementById('main-content');
  if (!content) return;
  content.innerHTML = '<div class="section-placeholder"><h2>📝 Notes</h2><p>Coming soon!</p></div>';
}

function renderFlashcards() {
  const content = document.getElementById('main-content');
  if (!content) return;
  content.innerHTML = '<div class="section-placeholder"><h2>🎴 Flashcards</h2><p>Coming soon!</p></div>';
}

function renderProgress() {
  const content = document.getElementById('main-content');
  if (!content) return;
  content.innerHTML = '<div class="section-placeholder"><h2>📊 Progress Dashboard</h2><p>Coming soon!</p></div>';
}

function renderChallenges() {
  const content = document.getElementById('main-content');
  if (!content) return;
  content.innerHTML = '<div class="section-placeholder"><h2>🎯 Challenges</h2><p>Coming soon!</p></div>';
}

function renderAchievements() {
  const content = document.getElementById('main-content');
  if (!content) return;
  content.innerHTML = '<div class="section-placeholder"><h2>🏆 Achievements</h2><p>Coming soon!</p></div>';
}

// Theme selector functions
function showThemeSelector() {
  const modal = document.getElementById('theme-modal');
  if (modal) modal.style.display = 'flex';
}

function closeThemeSelector() {
  const modal = document.getElementById('theme-modal');
  if (modal) modal.style.display = 'none';
}

console.log('🚀 Main App Loaded Successfully!');
