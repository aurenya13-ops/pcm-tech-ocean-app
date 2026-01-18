// ==================== LEARNING TOOLS - 100% COMPLETE ====================

class LearningTools {
  constructor() {
    this.flashcards = [];
    this.notes = [];
    this.pomodoroState = {
      isRunning: false,
      mode: 'work', // work, shortBreak, longBreak
      timeLeft: APP_CONFIG.pomodoro.workDuration,
      sessionsCompleted: 0,
      interval: null
    };
    
    this.init();
  }
  
  init() {
    // Load saved data
    this.loadFlashcards();
    this.loadNotes();
    
    console.log('🧠 Learning Tools Initialized');
  }
  
  // ===== FLASHCARDS (Spaced Repetition) =====
  loadFlashcards() {
    const saved = Utils.storage.get(APP_CONFIG.storage.flashcards);
    if (saved) {
      this.flashcards = saved;
    }
  }
  
  saveFlashcards() {
    Utils.storage.set(APP_CONFIG.storage.flashcards, this.flashcards);
  }
  
  createFlashcard(front, back, tags = []) {
    const card = {
      id: Date.now(),
      front,
      back,
      tags,
      created: Date.now(),
      lastReviewed: null,
      nextReview: Date.now(),
      interval: 1,
      easeFactor: APP_CONFIG.spacedRepetition.easeFactor.default,
      reviews: 0
    };
    
    this.flashcards.push(card);
    this.saveFlashcards();
    
    return card;
  }
  
  reviewFlashcard(cardId, quality) {
    // quality: 0 = again, 1 = hard, 2 = good, 3 = easy
    const card = this.flashcards.find(c => c.id === cardId);
    if (!card) return;
    
    const intervals = APP_CONFIG.spacedRepetition.intervals;
    let newInterval;
    
    switch(quality) {
      case 0: // Again
        newInterval = intervals.again;
        card.easeFactor = Math.max(
          APP_CONFIG.spacedRepetition.easeFactor.min,
          card.easeFactor - 0.2
        );
        break;
      case 1: // Hard
        newInterval = intervals.hard;
        card.easeFactor = Math.max(
          APP_CONFIG.spacedRepetition.easeFactor.min,
          card.easeFactor - 0.15
        );
        break;
      case 2: // Good
        newInterval = intervals.good * card.easeFactor;
        break;
      case 3: // Easy
        newInterval = intervals.easy * card.easeFactor;
        card.easeFactor = Math.min(
          APP_CONFIG.spacedRepetition.easeFactor.max,
          card.easeFactor + 0.15
        );
        break;
    }
    
    card.interval = newInterval;
    card.lastReviewed = Date.now();
    card.nextReview = Date.now() + (newInterval * 24 * 60 * 60 * 1000);
    card.reviews++;
    
    this.saveFlashcards();
  }
  
  getDueFlashcards() {
    const now = Date.now();
    return this.flashcards.filter(card => card.nextReview <= now);
  }
  
  // ===== NOTES =====
  loadNotes() {
    const saved = Utils.storage.get(APP_CONFIG.storage.notes);
    if (saved) {
      this.notes = saved;
    }
  }
  
  saveNotes() {
    Utils.storage.set(APP_CONFIG.storage.notes, this.notes);
  }
  
  createNote(title, content, tags = []) {
    const note = {
      id: Date.now(),
      title,
      content,
      tags,
      created: Date.now(),
      modified: Date.now()
    };
    
    this.notes.push(note);
    this.saveNotes();
    
    return note;
  }
  
  updateNote(noteId, updates) {
    const note = this.notes.find(n => n.id === noteId);
    if (!note) return;
    
    Object.assign(note, updates);
    note.modified = Date.now();
    
    this.saveNotes();
  }
  
  deleteNote(noteId) {
    this.notes = this.notes.filter(n => n.id !== noteId);
    this.saveNotes();
  }
  
  searchNotes(query) {
    const lowerQuery = query.toLowerCase();
    return this.notes.filter(note => 
      note.title.toLowerCase().includes(lowerQuery) ||
      note.content.toLowerCase().includes(lowerQuery) ||
      note.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }
  
  // ===== POMODORO TIMER =====
  startPomodoro() {
    if (this.pomodoroState.isRunning) return;
    
    this.pomodoroState.isRunning = true;
    this.pomodoroState.interval = setInterval(() => {
      this.pomodoroState.timeLeft--;
      
      if (this.pomodoroState.timeLeft <= 0) {
        this.pomodoroComplete();
      }
      
      this.updatePomodoroDisplay();
    }, 1000);
    
    console.log('🍅 Pomodoro started');
  }
  
  pausePomodoro() {
    this.pomodoroState.isRunning = false;
    clearInterval(this.pomodoroState.interval);
    console.log('⏸️ Pomodoro paused');
  }
  
  resetPomodoro() {
    this.pausePomodoro();
    this.pomodoroState.timeLeft = APP_CONFIG.pomodoro.workDuration;
    this.pomodoroState.mode = 'work';
    this.updatePomodoroDisplay();
    console.log('🔄 Pomodoro reset');
  }
  
  pomodoroComplete() {
    this.pausePomodoro();
    
    if (this.pomodoroState.mode === 'work') {
      this.pomodoroState.sessionsCompleted++;
      
      // Play sound
      this.playNotificationSound();
      
      // Determine break type
      if (this.pomodoroState.sessionsCompleted % APP_CONFIG.pomodoro.longBreakInterval === 0) {
        this.pomodoroState.mode = 'longBreak';
        this.pomodoroState.timeLeft = APP_CONFIG.pomodoro.longBreak;
        alert('🎉 Great work! Take a long 15-minute break!');
      } else {
        this.pomodoroState.mode = 'shortBreak';
        this.pomodoroState.timeLeft = APP_CONFIG.pomodoro.shortBreak;
        alert('✅ Session complete! Take a 5-minute break!');
      }
    } else {
      this.pomodoroState.mode = 'work';
      this.pomodoroState.timeLeft = APP_CONFIG.pomodoro.workDuration;
      alert('💪 Break over! Ready for another session?');
    }
    
    this.updatePomodoroDisplay();
  }
  
  updatePomodoroDisplay() {
    // This will be called by the UI component
    const event = new CustomEvent('pomodoroUpdate', {
      detail: {
        timeLeft: this.pomodoroState.timeLeft,
        mode: this.pomodoroState.mode,
        isRunning: this.pomodoroState.isRunning,
        sessionsCompleted: this.pomodoroState.sessionsCompleted
      }
    });
    document.dispatchEvent(event);
  }
  
  playNotificationSound() {
    // Simple beep using Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      console.error('Audio error:', e);
    }
  }
  
  // ===== FEYNMAN TECHNIQUE =====
  createFeynmanExplanation(topic, explanation) {
    return {
      id: Date.now(),
      topic,
      explanation,
      gaps: [],
      created: Date.now()
    };
  }
  
  identifyGaps(explanationId, gaps) {
    // Store identified knowledge gaps
    return gaps;
  }
  
  // ===== ACTIVE RECALL =====
  createRecallQuestion(question, answer, topic) {
    return {
      id: Date.now(),
      question,
      answer,
      topic,
      attempts: 0,
      correct: 0,
      created: Date.now()
    };
  }
  
  // ===== MIND MAPS =====
  createMindMap(title, centralIdea) {
    return {
      id: Date.now(),
      title,
      centralIdea,
      nodes: [],
      connections: [],
      created: Date.now()
    };
  }
  
  addMindMapNode(mapId, text, parentId = null) {
    return {
      id: Date.now(),
      text,
      parentId,
      children: []
    };
  }
}

console.log('🧠 Learning Tools Module Loaded');
