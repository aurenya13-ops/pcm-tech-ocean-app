// ==================== APP CONFIGURATION ====================

const APP_CONFIG = {
  name: "PCM × Tech Ocean",
  version: "1.0.0",
  author: "Aurenya",
  
  // Feature Flags
  features: {
    music: true,
    gameLevels: true,
    deepLearning: true,
    pomodoro: true,
    notes: true,
    flashcards: true,
    achievements: true,
    leaderboard: false, // Coming soon
    socialFeatures: false // Coming soon
  },
  
  // Storage Keys
  storage: {
    userProgress: 'ocean_user_progress',
    themeData: 'ocean_theme_data',
    musicPrefs: 'ocean_music_prefs',
    completedLevels: 'ocean_completed_levels',
    notes: 'ocean_notes',
    flashcards: 'ocean_flashcards',
    pomodoroStats: 'ocean_pomodoro_stats'
  },
  
  // XP & Leveling
  xp: {
    levelMultiplier: 100,
    maxLevel: 100,
    bonusStreak: 50, // Bonus XP for daily streak
    bonusPerfect: 100 // Bonus XP for perfect score
  },
  
  // Theme Settings
  theme: {
    autoChangeInterval: 48 * 60 * 60 * 1000, // 48 hours
    transitionDuration: 1000 // 1 second
  },
  
  // Music Settings
  music: {
    defaultVolume: 0.7,
    fadeInDuration: 500,
    fadeOutDuration: 500,
    crossfadeDuration: 1000
  },
  
  // Pomodoro Settings
  pomodoro: {
    workDuration: 25 * 60, // 25 minutes
    shortBreak: 5 * 60, // 5 minutes
    longBreak: 15 * 60, // 15 minutes
    longBreakInterval: 4 // After 4 work sessions
  },
  
  // Spaced Repetition (SM-2 Algorithm)
  spacedRepetition: {
    intervals: {
      again: 1, // 1 day
      hard: 3, // 3 days
      good: 7, // 7 days
      easy: 14 // 14 days
    },
    easeFactor: {
      min: 1.3,
      default: 2.5,
      max: 2.5
    }
  }
};

// Utility Functions
const Utils = {
  // Format time (seconds to MM:SS)
  formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  },
  
  // Calculate level from XP
  calculateLevel(xp) {
    return Math.floor(Math.sqrt(xp / APP_CONFIG.xp.levelMultiplier)) + 1;
  },
  
  // Calculate XP needed for next level
  xpForNextLevel(currentLevel) {
    return Math.pow(currentLevel, 2) * APP_CONFIG.xp.levelMultiplier;
  },
  
  // Get random item from array
  randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  },
  
  // Shuffle array
  shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },
  
  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Local storage helpers
  storage: {
    get(key) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (e) {
        console.error('Storage get error:', e);
        return null;
      }
    },
    
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.error('Storage set error:', e);
        return false;
      }
    },
    
    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.error('Storage remove error:', e);
        return false;
      }
    }
  }
};

console.log('⚙️ Config Loaded:', APP_CONFIG.name, APP_CONFIG.version);
