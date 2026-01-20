# 🌊 PCM × Tech Ocean

**Your Complete JEE Learning Companion with Gamification, Music & Deep Learning Tools**

🔗 **LIVE APP:** https://aurenya13-ops.github.io/pcm-tech-ocean-app/FINAL-COMPLETE.html

---

## ✨ Features

### 🎮 **Gamified Learning System**
- **127 Total Levels** across Class 11, Class 12, and Grand Master challenges
- **XP & Leveling System** - Earn XP, level up, unlock achievements
- **Progress Tracking** - Track completed levels, streaks, and stats
- **Achievement System** - Unlock badges for milestones
- **Interactive Quizzes** - Test your knowledge with instant feedback

### 🎵 **Music Ocean (150+ Songs)**
- **6 Curated Playlists:**
  - 🎧 Lofi & Chill (40 songs)
  - 💪 Motivation Boost (42 songs)
  - 🌙 Growing Up Feels (46 songs)
  - 🎼 Classical Focus
  - 🎸 Bollywood Hits
  - 🎹 English Pop
- **Full Music Player:**
  - Play/Pause/Next/Previous
  - Progress bar with seek
  - Volume control
  - Shuffle & Repeat modes
  - Keyboard shortcuts (Space, ←, →)

### 🎨 **10 Dynamic Themes**
- **Auto-Rotating Themes** - Changes every 48 hours
- **Calm Themes:** Ocean Depths, Sunset Calm, Forest Zen, Midnight Purple, Arctic Frost
- **Powerful Themes:** Neon Cyberpunk, Fire Power, Electric Storm, Cosmic Energy, Dragon Fury
- **Manual Theme Selector** - Choose your favorite anytime
- **Smooth Transitions** - Beautiful gradient animations

### 🧠 **Deep Learning Tools**
- **Pomodoro Timer** - 25/5 work/break cycles with notifications
- **Feynman Technique** - Explain concepts in simple terms
- **Spaced Repetition** - SM-2 algorithm for optimal review
- **Active Recall** - Test yourself without looking at notes
- **Mind Mapping** - Visual concept connections
- **Flashcards** - Create and review with spaced repetition
- **Notes System** - Rich text editor with tags and search

### 📚 **Complete PCM Content**
- **Physics:** 52 chapters (Class 11 + 12)
  - Mechanics, Thermodynamics, Electromagnetism, Optics, Modern Physics
- **Chemistry:** 47 chapters (Class 11 + 12)
  - Physical, Organic, Inorganic Chemistry
- **Mathematics:** 62 chapters (Class 11 + 12)
  - Algebra, Calculus, Coordinate Geometry, Vectors, Probability

### 💻 **Tech Integration**
- **100+ Projects** across:
  - Web Development (25 projects)
  - Data Structures & Algorithms (500 problems)
  - Mobile Development (15 projects)
  - AI/ML (20 projects)
  - DevOps (15 projects)
  - Blockchain (10 projects)

---

## 🏗️ **Project Structure**

```
pcm-tech-ocean-app/
├── FINAL-COMPLETE.html      # Main production file
├── config.js                 # App configuration & utilities
├── themes.js                 # 10 themes + ThemeManager class
├── music-library.js          # 150+ songs across 6 playlists
├── game-levels.js            # 127 game levels (Class 11/12/Master)
├── deep-learning.js          # Deep learning techniques data
├── music-player.js           # MusicPlayer class with full controls
├── game-engine.js            # GameEngine class (XP, levels, achievements)
├── learning-tools.js         # LearningTools class (Pomodoro, flashcards, notes)
├── app-fixed.js              # Main app logic & navigation
├── styles.css                # Complete styling (1000+ lines)
└── README.md                 # This file
```

---

## 🚀 **How It Works**

### **1. Loading Sequence**
```
Config (10%) → Themes (20%) → Music (30%) → Game Levels (40%) 
→ Deep Learning (50%) → Music Player (60%) → Game Engine (70%) 
→ Learning Tools (80%) → App Init (100%)
```

### **2. Core Systems**

#### **ThemeManager**
- Loads saved theme or defaults to Ocean Depths
- Auto-rotates every 48 hours
- Updates countdown timer every second
- Applies CSS variables for smooth transitions

#### **MusicPlayer**
- HTML5 Audio API integration
- Playlist management with 150+ songs
- Progress tracking and seeking
- Volume control with localStorage persistence
- Shuffle and repeat modes

#### **GameEngine**
- XP calculation: `Level = √(XP / 100) + 1`
- Streak tracking with daily bonuses
- Achievement unlocking system
- Progress persistence in localStorage

#### **LearningTools**
- Pomodoro: 25min work, 5min break, 15min long break
- Flashcards: SM-2 spaced repetition algorithm
- Notes: Rich text with tags and search
- All data saved in localStorage

---

## 📊 **Data Structure**

### **User Progress**
```javascript
{
  xp: 0,
  level: 1,
  streak: 0,
  lastActive: timestamp,
  completedLevels: [],
  achievements: [],
  stats: {
    totalTime: 0,
    problemsSolved: 0,
    perfectScores: 0,
    hintsUsed: 0
  }
}
```

### **Theme Data**
```javascript
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
  background: "linear-gradient(...)"
}
```

### **Game Level**
```javascript
{
  id: "phy11_kinematics_1",
  level: 1,
  title: "Introduction to Motion",
  subject: "physics",
  class: 11,
  unit: "Kinematics",
  xp: 100,
  difficulty: "easy",
  prerequisites: []
}
```

---

## 🎯 **Key Features Explained**

### **1. Gamification**
- **XP System:** Earn points for completing levels, perfect scores, daily streaks
- **Leveling:** Exponential growth formula for balanced progression
- **Achievements:** 8 types (First Steps, Rising Star, Week Warrior, etc.)
- **Streaks:** Daily login bonuses (+50 XP)

### **2. Music Integration**
- **Curated Playlists:** Hand-picked songs for different moods
- **Seamless Playback:** Auto-play next song, shuffle, repeat
- **Visual Feedback:** Now playing card, progress bar, vinyl animation
- **Keyboard Controls:** Space (play/pause), ← (prev), → (next)

### **3. Theme System**
- **Auto-Rotation:** Changes every 48 hours for fresh experience
- **Countdown Timer:** Shows time until next theme
- **Manual Override:** Choose any theme from selector
- **Smooth Transitions:** 1-second CSS transitions

### **4. Deep Learning**
- **Pomodoro:** Scientifically proven 25/5 technique
- **Feynman:** Explain concepts simply to identify gaps
- **Spaced Repetition:** SM-2 algorithm for optimal memory
- **Active Recall:** Self-testing for better retention

---

## 💾 **LocalStorage Keys**

```javascript
ocean_user_progress      // User XP, level, streak, completed levels
ocean_theme_data         // Current theme index, last change time
ocean_music_prefs        // Volume, shuffle, repeat settings
ocean_notes              // User notes with tags
ocean_flashcards         // Flashcards with review data
ocean_pomodoro_stats     // Pomodoro session statistics
```

---

## 🎨 **Design Philosophy**

### **Visual Hierarchy**
1. **Sidebar:** Navigation + Theme display
2. **Top Bar:** Page title + User stats
3. **Main Content:** Dynamic section rendering
4. **Music Player:** Always accessible at bottom

### **Color System**
- **Primary:** Main brand color (theme-dependent)
- **Secondary:** Darker shade for depth
- **Accent:** Highlights and CTAs
- **Backgrounds:** Layered glassmorphism

### **Typography**
- **Font:** Inter (Google Fonts)
- **Weights:** 300-900 for hierarchy
- **Sizes:** 12px (small) → 48px (hero)

---

## 🔧 **Technical Details**

### **Browser Compatibility**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### **Performance**
- **Initial Load:** ~2 seconds
- **Theme Switch:** <1 second
- **Music Load:** Instant (cached)
- **Navigation:** <100ms

### **Responsive Design**
- **Desktop:** Full sidebar + content
- **Tablet:** Collapsible sidebar
- **Mobile:** Hamburger menu

---

## 📱 **Usage Guide**

### **Getting Started**
1. Open FINAL-COMPLETE.html
2. Wait for loading (2 seconds)
3. Explore dashboard
4. Choose a playlist from Music Ocean
5. Start a game level or deep learning session

### **Navigation**
- **Sidebar:** Click any section to navigate
- **Top Bar:** Shows current page + stats
- **Music Player:** Always visible at bottom

### **Keyboard Shortcuts**
- `Space` - Play/Pause music
- `←` - Previous song
- `→` - Next song
- `Esc` - Close modals

---

## 🎓 **Learning Path**

### **Recommended Flow**
1. **Start with Dashboard** - See your progress
2. **Choose a Subject** - Physics/Chemistry/Maths
3. **Complete Levels** - Earn XP and level up
4. **Use Deep Learning Tools** - Pomodoro, Feynman, etc.
5. **Take Breaks** - Listen to Music Ocean
6. **Review with Flashcards** - Spaced repetition
7. **Track Progress** - Check achievements

---

## 🏆 **Achievements**

| Achievement | Requirement | Reward |
|------------|-------------|--------|
| First Steps | Complete 1 level | Badge |
| Rising Star | Reach Level 5 | Badge |
| Week Warrior | 7-day streak | Badge |
| Perfectionist | 10 perfect scores | Badge |
| Speed Demon | Complete level in <5 min | Badge |
| Night Owl | Study after midnight | Badge |
| Early Bird | Study before 6 AM | Badge |
| Marathon | 4-hour study session | Badge |

---

## 🔮 **Future Enhancements**

- [ ] Mock test system with JEE-style questions
- [ ] Social features (leaderboards, study groups)
- [ ] AI-powered doubt solving
- [ ] Video lectures integration
- [ ] Mobile app (React Native)
- [ ] Offline mode with PWA
- [ ] Analytics dashboard
- [ ] Custom theme creator

---

## 📄 **License**

MIT License - Feel free to use, modify, and distribute!

---

## 👨‍💻 **Developer**

**Aurenya**  
Building the future of education, one line of code at a time.

---

## 🙏 **Credits**

- **Music:** Curated from royalty-free sources
- **Fonts:** Google Fonts (Inter)
- **Icons:** Emoji (Unicode)
- **Inspiration:** Notion, Spotify, Duolingo

---

**Made with 🌊 for JEE aspirants**
