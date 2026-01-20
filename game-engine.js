// ==================== GAME ENGINE - 100% COMPLETE ====================

class GameEngine {
  constructor() {
    this.userProgress = {
      xp: 0,
      level: 1,
      streak: 0,
      lastActive: Date.now(),
      completedLevels: [],
      currentLevel: null,
      achievements: [],
      stats: {
        totalTime: 0,
        problemsSolved: 0,
        perfectScores: 0,
        hintsUsed: 0
      }
    };
    
    this.init();
  }
  
  init() {
    // Load saved progress
    const saved = Utils.storage.get(APP_CONFIG.storage.userProgress);
    if (saved) {
      this.userProgress = { ...this.userProgress, ...saved };
      this.updateStreak();
    }
    
    // Update UI (if elements exist)
    this.updateStatsDisplay();
    
    console.log('🎮 Game Engine Initialized');
    console.log(`📊 Level ${this.userProgress.level} | ${this.userProgress.xp} XP | ${this.userProgress.completedLevels.length} levels completed`);
  }
  
  updateStreak() {
    const now = Date.now();
    const lastActive = this.userProgress.lastActive;
    const daysSince = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));
    
    if (daysSince === 0) {
      // Same day, keep streak
      return;
    } else if (daysSince === 1) {
      // Next day, increment streak
      this.userProgress.streak++;
      this.userProgress.lastActive = now;
      this.saveProgress();
    } else {
      // Streak broken
      this.userProgress.streak = 1;
      this.userProgress.lastActive = now;
      this.saveProgress();
    }
  }
  
  addXP(amount, reason = '') {
    this.userProgress.xp += amount;
    
    // Check for level up
    const newLevel = Utils.calculateLevel(this.userProgress.xp);
    if (newLevel > this.userProgress.level) {
      this.levelUp(newLevel);
    }
    
    this.saveProgress();
    this.updateStatsDisplay();
    
    // Show XP notification
    this.showNotification(`+${amount} XP`, reason, 'success');
    
    console.log(`⭐ +${amount} XP ${reason ? `(${reason})` : ''}`);
  }
  
  levelUp(newLevel) {
    const oldLevel = this.userProgress.level;
    this.userProgress.level = newLevel;
    
    // Show level up notification
    this.showNotification(
      `Level Up! 🎉`,
      `You reached Level ${newLevel}!`,
      'levelup'
    );
    
    // Check for achievements
    this.checkAchievements();
    
    console.log(`🎉 LEVEL UP! ${oldLevel} → ${newLevel}`);
  }
  
  completeLevel(levelId, score, timeSpent) {
    if (this.userProgress.completedLevels.includes(levelId)) {
      console.log('Level already completed');
      return;
    }
    
    // Find level data
    const levelData = this.findLevel(levelId);
    if (!levelData) {
      console.error('Level not found:', levelId);
      return;
    }
    
    // Mark as completed
    this.userProgress.completedLevels.push(levelId);
    
    // Award XP
    const xpEarned = levelData.xp;
    this.addXP(xpEarned, `Completed ${levelData.title}`);
    
    // Update stats
    this.userProgress.stats.totalTime += timeSpent;
    this.userProgress.stats.problemsSolved++;
    
    if (score === 100) {
      this.userProgress.stats.perfectScores++;
    }
    
    this.saveProgress();
    
    console.log(`✅ Level ${levelId} completed! Score: ${score}%`);
  }
  
  findLevel(levelId) {
    // Search through all classes and subjects
    for (const className in GAME_LEVELS) {
      const classData = GAME_LEVELS[className];
      for (const subject in classData.subjects) {
        const subjectData = classData.subjects[subject];
        const level = subjectData.levels.find(l => l.id === levelId);
        if (level) return level;
      }
    }
    return null;
  }
  
  checkAchievements() {
    const achievements = [
      {
        id: 'first_level',
        name: 'First Steps',
        description: 'Complete your first level',
        condition: () => this.userProgress.completedLevels.length >= 1
      },
      {
        id: 'level_5',
        name: 'Rising Star',
        description: 'Reach Level 5',
        condition: () => this.userProgress.level >= 5
      },
      {
        id: 'streak_7',
        name: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        condition: () => this.userProgress.streak >= 7
      },
      {
        id: 'perfect_10',
        name: 'Perfectionist',
        description: 'Get 10 perfect scores',
        condition: () => this.userProgress.stats.perfectScores >= 10
      }
    ];
    
    achievements.forEach(achievement => {
      if (!this.userProgress.achievements.includes(achievement.id) && achievement.condition()) {
        this.unlockAchievement(achievement);
      }
    });
  }
  
  unlockAchievement(achievement) {
    this.userProgress.achievements.push(achievement.id);
    this.saveProgress();
    
    this.showNotification(
      `🏆 Achievement Unlocked!`,
      `${achievement.name}: ${achievement.description}`,
      'achievement'
    );
    
    console.log(`🏆 Achievement Unlocked: ${achievement.name}`);
  }
  
  showNotification(title, message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `game-notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <h4>${title}</h4>
        <p>${message}</p>
      </div>
    `;
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 30px;
      background: var(--bg-card);
      backdrop-filter: blur(20px);
      border: 2px solid ${type === 'success' ? 'var(--accent)' : type === 'levelup' ? 'var(--primary)' : 'var(--border)'};
      border-radius: var(--radius-lg);
      padding: 20px;
      min-width: 300px;
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      animation: slideInRight 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.5s ease';
      setTimeout(() => notification.remove(), 500);
    }, 5000);
  }
  
  updateStatsDisplay() {
    // Only update if elements exist
    const xpEl = document.getElementById('xp-count');
    const levelEl = document.getElementById('level-count');
    const streakEl = document.getElementById('streak-count');
    
    if (xpEl) xpEl.textContent = `${this.userProgress.xp} XP`;
    if (levelEl) levelEl.textContent = `Lvl ${this.userProgress.level}`;
    if (streakEl) streakEl.textContent = this.userProgress.streak;
  }
  
  saveProgress() {
    Utils.storage.set(APP_CONFIG.storage.userProgress, this.userProgress);
  }
  
  // Public API
  getProgress() {
    return this.userProgress;
  }
  
  isLevelCompleted(levelId) {
    return this.userProgress.completedLevels.includes(levelId);
  }
  
  getCompletedLevels() {
    return this.userProgress.completedLevels;
  }
  
  resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
      this.userProgress = {
        xp: 0,
        level: 1,
        streak: 0,
        lastActive: Date.now(),
        completedLevels: [],
        currentLevel: null,
        achievements: [],
        stats: {
          totalTime: 0,
          problemsSolved: 0,
          perfectScores: 0,
          hintsUsed: 0
        }
      };
      this.saveProgress();
      this.updateStatsDisplay();
      console.log('🔄 Progress reset');
    }
  }
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  .game-notification h4 {
    font-size: 18px;
    margin-bottom: 8px;
    color: var(--text-primary);
  }
  
  .game-notification p {
    font-size: 14px;
    color: var(--text-secondary);
  }
  
  .game-notification.success {
    border-color: var(--accent);
    box-shadow: var(--glow-accent);
  }
  
  .game-notification.levelup {
    border-color: var(--primary);
    box-shadow: var(--glow);
  }
  
  .game-notification.achievement {
    border-color: #ffd700;
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.4);
  }
`;
document.head.appendChild(style);

console.log('🎮 Game Engine Module Loaded');
