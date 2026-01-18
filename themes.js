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
      bgCard: "rgba(30, 10, 50, 0.95)",
      bgSidebar: "rgba(16, 0, 43, 0.98)"
    },
    background: "linear-gradient(135deg, #10002b 0%, #240046 100%)",
    description: "Mystical purple for late-night study"
  },
  {
    name: "Arctic Frost",
    type: "calm",
    colors: {
      primary: "#00b4d8",
      secondary: "#0096c7",
      accent: "#90e0ef",
      bgMain: "#03045e",
      bgCard: "rgba(10, 20, 60, 0.95)",
      bgSidebar: "rgba(3, 4, 94, 0.98)"
    },
    background: "linear-gradient(135deg, #03045e 0%, #023e8a 100%)",
    description: "Cool arctic vibes for clarity"
  },

  // POWERFUL THEMES
  {
    name: "Neon Cyberpunk",
    type: "powerful",
    colors: {
      primary: "#ff006e",
      secondary: "#8338ec",
      accent: "#06ffa5",
      bgMain: "#0a0e27",
      bgCard: "rgba(15, 23, 42, 0.95)",
      bgSidebar: "rgba(10, 14, 39, 0.98)"
    },
    background: "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)",
    description: "High-energy cyberpunk for intense focus"
  },
  {
    name: "Fire Power",
    type: "powerful",
    colors: {
      primary: "#ff4500",
      secondary: "#dc2f02",
      accent: "#ffba08",
      bgMain: "#1a0000",
      bgCard: "rgba(40, 10, 10, 0.95)",
      bgSidebar: "rgba(26, 0, 0, 0.98)"
    },
    background: "linear-gradient(135deg, #1a0000 0%, #370617 100%)",
    description: "Burning motivation and energy"
  },
  {
    name: "Electric Storm",
    type: "powerful",
    colors: {
      primary: "#7209b7",
      secondary: "#560bad",
      accent: "#f72585",
      bgMain: "#0d0221",
      bgCard: "rgba(25, 10, 45, 0.95)",
      bgSidebar: "rgba(13, 2, 33, 0.98)"
    },
    background: "linear-gradient(135deg, #0d0221 0%, #240046 100%)",
    description: "Electrifying power for breakthroughs"
  },
  {
    name: "Golden Hour",
    type: "powerful",
    colors: {
      primary: "#ffd60a",
      secondary: "#faa307",
      accent: "#ffee32",
      bgMain: "#1a1200",
      bgCard: "rgba(35, 25, 10, 0.95)",
      bgSidebar: "rgba(26, 18, 0, 0.98)"
    },
    background: "linear-gradient(135deg, #1a1200 0%, #3d2800 100%)",
    description: "Golden energy for peak performance"
  },
  {
    name: "Emerald Power",
    type: "powerful",
    colors: {
      primary: "#06ffa5",
      secondary: "#00d4aa",
      accent: "#7df9ff",
      bgMain: "#001a14",
      bgCard: "rgba(10, 35, 28, 0.95)",
      bgSidebar: "rgba(0, 26, 20, 0.98)"
    },
    background: "linear-gradient(135deg, #001a14 0%, #003d2e 100%)",
    description: "Emerald strength and growth"
  }
];

class ThemeManager {
  constructor() {
    this.currentThemeIndex = 0;
    this.themeChangeInterval = 48 * 60 * 60 * 1000; // 48 hours in milliseconds
    this.init();
  }

  init() {
    // Load saved theme or start fresh
    const saved = localStorage.getItem('themeData');
    if (saved) {
      const data = JSON.parse(saved);
      this.currentThemeIndex = data.index;
      this.lastChangeTime = data.timestamp;
      
      // Check if 48 hours have passed
      const timePassed = Date.now() - this.lastChangeTime;
      if (timePassed >= this.themeChangeInterval) {
        this.cycleTheme();
      } else {
        this.applyTheme(this.currentThemeIndex);
        this.startTimer(this.themeChangeInterval - timePassed);
      }
    } else {
      this.applyTheme(0);
      this.saveThemeData();
      this.startTimer(this.themeChangeInterval);
    }
  }

  applyTheme(index) {
    const theme = THEMES[index];
    const root = document.documentElement;
    
    // Apply colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--${cssVar}`, value);
    });
    
    // Apply background
    document.body.style.background = theme.background;
    
    console.log(`🎨 Theme Applied: ${theme.name} (${theme.type})`);
    console.log(`📝 ${theme.description}`);
  }

  cycleTheme() {
    this.currentThemeIndex = (this.currentThemeIndex + 1) % THEMES.length;
    this.applyTheme(this.currentThemeIndex);
    this.lastChangeTime = Date.now();
    this.saveThemeData();
    this.startTimer(this.themeChangeInterval);
    
    // Show notification
    this.showThemeNotification();
  }

  startTimer(duration) {
    // Update countdown display
    this.updateCountdown(duration);
    
    // Set interval for countdown
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    this.countdownInterval = setInterval(() => {
      const remaining = this.themeChangeInterval - (Date.now() - this.lastChangeTime);
      if (remaining <= 0) {
        this.cycleTheme();
      } else {
        this.updateCountdown(remaining);
      }
    }, 1000);
  }

  updateCountdown(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    
    const display = document.getElementById('theme-timer');
    if (display) {
      display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  saveThemeData() {
    localStorage.setItem('themeData', JSON.stringify({
      index: this.currentThemeIndex,
      timestamp: this.lastChangeTime
    }));
  }

  showThemeNotification() {
    const theme = THEMES[this.currentThemeIndex];
    
    // Create notification element
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

// Initialize theme manager
const themeManager = new ThemeManager();

// Manual theme cycle function
function cycleTheme() {
  themeManager.cycleTheme();
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

console.log('🎨 Theme Manager Initialized');
console.log(`📊 Total Themes: ${THEMES.length}`);
console.log(`⏰ Auto-change: Every 48 hours`);
console.log(`🎯 Current: ${themeManager.getCurrentTheme().name}`);
