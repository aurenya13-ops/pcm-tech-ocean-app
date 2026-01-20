// ==================== AUTO-CHANGING THEMES (48 HOURS) ====================

const THEMES = [
  // CALM AESTHETIC THEMES
  {
    name: "Ocean Depths",
    type: "calm",
    colors: {
      primary: "#4a90e2",
      secondary: "#357abd",
      accent: "#7dd3fc",
      bgMain: "#0a1929",
      bgCard: "rgba(15, 35, 55, 0.95)",
      bgSidebar: "rgba(10, 25, 41, 0.98)"
    },
    background: "linear-gradient(135deg, #0a1929 0%, #1a2f45 100%)",
    description: "Deep ocean vibes for focused study"
  },
  {
    name: "Sunset Calm",
    type: "calm",
    colors: {
      primary: "#ff6b6b",
      secondary: "#ee5a6f",
      accent: "#ffd93d",
      bgMain: "#1a0f1f",
      bgCard: "rgba(35, 20, 40, 0.95)",
      bgSidebar: "rgba(26, 15, 31, 0.98)"
    },
    background: "linear-gradient(135deg, #1a0f1f 0%, #2f1a35 100%)",
    description: "Warm sunset colors for peaceful learning"
  },
  {
    name: "Forest Zen",
    type: "calm",
    colors: {
      primary: "#52b788",
      secondary: "#40916c",
      accent: "#95d5b2",
      bgMain: "#081c15",
      bgCard: "rgba(20, 40, 30, 0.95)",
      bgSidebar: "rgba(8, 28, 21, 0.98)"
    },
    background: "linear-gradient(135deg, #081c15 0%, #1b4332 100%)",
    description: "Nature's calm for deep concentration"
  },
  {
    name: "Midnight Purple",
    type: "calm",
    colors: {
      primary: "#9d4edd",
      secondary: "#7b2cbf",
      accent: "#c77dff",
      bgMain: "#10002b",
      bgCard: "rgba(25, 0, 55, 0.95)",
      bgSidebar: "rgba(16, 0, 43, 0.98)"
    },
    background: "linear-gradient(135deg, #10002b 0%, #240046 100%)",
    description: "Mysterious purple for night owls"
  },
  {
    name: "Arctic Frost",
    type: "calm",
    colors: {
      primary: "#00b4d8",
      secondary: "#0096c7",
      accent: "#90e0ef",
      bgMain: "#03045e",
      bgCard: "rgba(10, 20, 100, 0.95)",
      bgSidebar: "rgba(3, 4, 94, 0.98)"
    },
    background: "linear-gradient(135deg, #03045e 0%, #023e8a 100%)",
    description: "Cool arctic tones for clarity"
  },
  
  // POWERFUL AESTHETIC THEMES
  {
    name: "Neon Cyberpunk",
    type: "powerful",
    colors: {
      primary: "#ff006e",
      secondary: "#8338ec",
      accent: "#06ffa5",
      bgMain: "#0d0221",
      bgCard: "rgba(20, 5, 40, 0.95)",
      bgSidebar: "rgba(13, 2, 33, 0.98)"
    },
    background: "linear-gradient(135deg, #0d0221 0%, #1a0b3d 100%)",
    description: "Cyberpunk energy for intense focus"
  },
  {
    name: "Fire Power",
    type: "powerful",
    colors: {
      primary: "#ff4500",
      secondary: "#ff6b35",
      accent: "#ffd60a",
      bgMain: "#1a0000",
      bgCard: "rgba(40, 10, 0, 0.95)",
      bgSidebar: "rgba(26, 0, 0, 0.98)"
    },
    background: "linear-gradient(135deg, #1a0000 0%, #330000 100%)",
    description: "Fiery passion for breakthrough moments"
  },
  {
    name: "Electric Storm",
    type: "powerful",
    colors: {
      primary: "#00d9ff",
      secondary: "#0099cc",
      accent: "#ffff00",
      bgMain: "#001219",
      bgCard: "rgba(0, 25, 40, 0.95)",
      bgSidebar: "rgba(0, 18, 25, 0.98)"
    },
    background: "linear-gradient(135deg, #001219 0%, #005f73 100%)",
    description: "Electric energy for power sessions"
  },
  {
    name: "Golden Hour",
    type: "powerful",
    colors: {
      primary: "#f77f00",
      secondary: "#d62828",
      accent: "#fcbf49",
      bgMain: "#1a0f00",
      bgCard: "rgba(35, 20, 0, 0.95)",
      bgSidebar: "rgba(26, 15, 0, 0.98)"
    },
    background: "linear-gradient(135deg, #1a0f00 0%, #3d2000 100%)",
    description: "Golden power for peak performance"
  },
  {
    name: "Emerald Power",
    type: "powerful",
    colors: {
      primary: "#00ff88",
      secondary: "#00cc6a",
      accent: "#7fff00",
      bgMain: "#001a0f",
      bgCard: "rgba(0, 35, 20, 0.95)",
      bgSidebar: "rgba(0, 26, 15, 0.98)"
    },
    background: "linear-gradient(135deg, #001a0f 0%, #003d1f 100%)",
    description: "Emerald strength for champions"
  }
];

class ThemeManager {
  constructor() {
    this.currentThemeIndex = 0;
    this.themeChangeInterval = 48 * 60 * 60 * 1000; // 48 hours
    this.lastThemeChange = Date.now();
    this.autoChangeTimer = null;
    
    this.init();
  }
  
  init() {
    // Load saved theme data
    const saved = this.loadThemeData();
    if (saved) {
      this.currentThemeIndex = saved.currentThemeIndex || 0;
      this.lastThemeChange = saved.lastThemeChange || Date.now();
    }
    
    // Apply current theme
    this.applyTheme(this.currentThemeIndex);
    
    // Start auto-change timer
    this.startAutoChange();
    
    // Update countdown display
    this.updateCountdown();
    setInterval(() => this.updateCountdown(), 1000);
    
    console.log('🎨 Theme Manager Initialized');
    console.log(`📊 Total Themes: ${THEMES.length}`);
    console.log(`⏰ Auto-change: Every 48 hours`);
    console.log(`🎯 Current: ${this.getCurrentTheme().name}`);
  }
  
  applyTheme(index) {
    if (index < 0 || index >= THEMES.length) return;
    
    const theme = THEMES[index];
    const root = document.documentElement;
    
    // Apply CSS variables
    root.style.setProperty('--primary', theme.colors.primary);
    root.style.setProperty('--secondary', theme.colors.secondary);
    root.style.setProperty('--accent', theme.colors.accent);
    root.style.setProperty('--bg-main', theme.colors.bgMain);
    root.style.setProperty('--bg-card', theme.colors.bgCard);
    root.style.setProperty('--bg-sidebar', theme.colors.bgSidebar);
    root.style.setProperty('--bg-navbar', theme.colors.bgSidebar);
    
    // Update sidebar theme display
    const themePreview = document.getElementById('current-theme-preview');
    const themeName = document.getElementById('current-theme-name');
    const themeType = document.getElementById('current-theme-type');
    
    if (themePreview) themePreview.style.background = theme.background;
    if (themeName) themeName.textContent = theme.name;
    if (themeType) themeType.textContent = theme.type;
    
    console.log(`🎨 Applied theme: ${theme.name} (${theme.type})`);
  }
  
  cycleTheme() {
    this.currentThemeIndex = (this.currentThemeIndex + 1) % THEMES.length;
    this.lastThemeChange = Date.now();
    this.applyTheme(this.currentThemeIndex);
    this.saveThemeData();
    this.showThemeNotification(THEMES[this.currentThemeIndex]);
    
    console.log(`🔄 Theme cycled to: ${THEMES[this.currentThemeIndex].name}`);
  }
  
  startAutoChange() {
    // Clear existing timer
    if (this.autoChangeTimer) {
      clearInterval(this.autoChangeTimer);
    }
    
    // Check every minute if it's time to change
    this.autoChangeTimer = setInterval(() => {
      const timeSinceLastChange = Date.now() - this.lastThemeChange;
      
      if (timeSinceLastChange >= this.themeChangeInterval) {
        this.cycleTheme();
      }
    }, 60000); // Check every minute
  }
  
  updateCountdown() {
    const timeLeft = this.themeChangeInterval - (Date.now() - this.lastThemeChange);
    
    if (timeLeft <= 0) {
      this.cycleTheme();
      return;
    }
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    const timerElement = document.getElementById('theme-timer');
    if (timerElement) {
      timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }
  
  saveThemeData() {
    const data = {
      currentThemeIndex: this.currentThemeIndex,
      lastThemeChange: this.lastThemeChange
    };
    
    try {
      localStorage.setItem('ocean_theme_data', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save theme data:', e);
    }
  }
  
  loadThemeData() {
    try {
      const data = localStorage.getItem('ocean_theme_data');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to load theme data:', e);
      return null;
    }
  }
  
  showThemeNotification(theme) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 30px;
      background: var(--bg-card);
      border: 2px solid var(--primary);
      border-radius: 15px;
      padding: 20px 30px;
      box-shadow: var(--glow);
      z-index: 10000;
      animation: slideIn 0.5s ease;
    `;
    
    notification.innerHTML = `
      <h3 style="margin-bottom: 10px; color: var(--accent);">🎨 New Theme!</h3>
      <p style="margin-bottom: 5px; font-weight: 600;">${theme.name}</p>
      <p style="color: var(--text-secondary); font-size: 14px;">${theme.description}</p>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.5s ease';
      setTimeout(() => notification.remove(), 500);
    }, 5000);
  }

  getCurrentTheme() {
    return THEMES[this.currentThemeIndex];
  }

  getAllThemes() {
    return THEMES;
  }
}

// Manual theme cycle function
function cycleTheme() {
  if (window.themeManager) {
    window.themeManager.cycleTheme();
  }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

console.log('🎨 Themes Module Loaded');
