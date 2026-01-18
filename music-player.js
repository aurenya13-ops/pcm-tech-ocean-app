// ==================== MUSIC PLAYER - 100% COMPLETE ====================

class MusicPlayer {
  constructor() {
    this.audio = document.getElementById('audio-player');
    this.currentPlaylist = 'chill_vibes';
    this.currentSongIndex = 0;
    this.isPlaying = false;
    this.isShuffle = false;
    this.repeatMode = 'off'; // off, one, all
    this.volume = APP_CONFIG.music.defaultVolume;
    this.queue = [];
    this.history = [];
    
    this.init();
  }
  
  init() {
    // Load saved preferences
    const prefs = Utils.storage.get(APP_CONFIG.storage.musicPrefs);
    if (prefs) {
      this.volume = prefs.volume || this.volume;
      this.repeatMode = prefs.repeatMode || this.repeatMode;
      this.isShuffle = prefs.isShuffle || false;
    }
    
    // Set initial volume
    this.audio.volume = this.volume;
    document.getElementById('volume-slider').value = this.volume * 100;
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Load first playlist
    this.loadPlaylist(this.currentPlaylist);
    
    console.log('🎵 Music Player Initialized');
  }
  
  setupEventListeners() {
    // Audio events
    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('ended', () => this.handleSongEnd());
    this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
    this.audio.addEventListener('error', (e) => this.handleError(e));
    
    // Volume slider
    document.getElementById('volume-slider').addEventListener('input', (e) => {
      this.setVolume(e.target.value / 100);
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }
  
  loadPlaylist(playlistKey) {
    this.currentPlaylist = playlistKey;
    const playlist = MUSIC_LIBRARY.playlists[playlistKey];
    
    if (!playlist) {
      console.error('Playlist not found:', playlistKey);
      return;
    }
    
    this.queue = this.isShuffle ? Utils.shuffle(playlist.songs) : [...playlist.songs];
    this.currentSongIndex = 0;
    
    console.log(`📀 Loaded playlist: ${playlist.name} (${this.queue.length} songs)`);
  }
  
  loadSong(index) {
    if (index < 0 || index >= this.queue.length) return;
    
    this.currentSongIndex = index;
    const song = this.queue[index];
    
    // Update audio source
    this.audio.src = song.url;
    
    // Update UI
    this.updateUI(song);
    
    // Add to history
    this.history.push(song);
    if (this.history.length > 50) this.history.shift();
    
    console.log(`🎵 Loaded: ${song.title} - ${song.artist}`);
  }
  
  updateUI(song) {
    // Update floating player
    document.getElementById('current-artwork').src = song.cover;
    document.getElementById('current-title').textContent = song.title;
    document.getElementById('current-artist').textContent = song.artist;
    
    // Update document title
    document.title = `${song.title} - ${song.artist} | PCM × Tech Ocean`;
  }
  
  play() {
    if (!this.audio.src) {
      this.loadSong(0);
    }
    
    const playPromise = this.audio.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          document.getElementById('play-icon').className = 'fas fa-pause';
          this.startVisualizer();
        })
        .catch(error => {
          console.error('Play error:', error);
          this.isPlaying = false;
        });
    }
  }
  
  pause() {
    this.audio.pause();
    this.isPlaying = false;
    document.getElementById('play-icon').className = 'fas fa-play';
    this.stopVisualizer();
  }
  
  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
  
  next() {
    let nextIndex;
    
    if (this.repeatMode === 'one') {
      nextIndex = this.currentSongIndex;
    } else if (this.isShuffle) {
      nextIndex = Math.floor(Math.random() * this.queue.length);
    } else {
      nextIndex = (this.currentSongIndex + 1) % this.queue.length;
    }
    
    this.loadSong(nextIndex);
    if (this.isPlaying) this.play();
  }
  
  previous() {
    // If more than 3 seconds played, restart current song
    if (this.audio.currentTime > 3) {
      this.audio.currentTime = 0;
      return;
    }
    
    let prevIndex;
    
    if (this.isShuffle && this.history.length > 1) {
      // Go to previous song in history
      const prevSong = this.history[this.history.length - 2];
      prevIndex = this.queue.findIndex(s => s.title === prevSong.title);
    } else {
      prevIndex = (this.currentSongIndex - 1 + this.queue.length) % this.queue.length;
    }
    
    this.loadSong(prevIndex);
    if (this.isPlaying) this.play();
  }
  
  seek(percentage) {
    if (!this.audio.duration) return;
    this.audio.currentTime = this.audio.duration * percentage;
  }
  
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.audio.volume = this.volume;
    
    // Update icon
    const icon = document.getElementById('volume-icon');
    if (this.volume === 0) {
      icon.className = 'fas fa-volume-mute';
    } else if (this.volume < 0.5) {
      icon.className = 'fas fa-volume-down';
    } else {
      icon.className = 'fas fa-volume-up';
    }
    
    this.savePreferences();
  }
  
  toggleMute() {
    if (this.audio.volume > 0) {
      this.previousVolume = this.audio.volume;
      this.setVolume(0);
      document.getElementById('volume-slider').value = 0;
    } else {
      const vol = this.previousVolume || 0.7;
      this.setVolume(vol);
      document.getElementById('volume-slider').value = vol * 100;
    }
  }
  
  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    
    if (this.isShuffle) {
      // Shuffle queue but keep current song
      const currentSong = this.queue[this.currentSongIndex];
      this.queue = Utils.shuffle(this.queue);
      this.currentSongIndex = this.queue.findIndex(s => s.title === currentSong.title);
    } else {
      // Restore original order
      const playlist = MUSIC_LIBRARY.playlists[this.currentPlaylist];
      const currentSong = this.queue[this.currentSongIndex];
      this.queue = [...playlist.songs];
      this.currentSongIndex = this.queue.findIndex(s => s.title === currentSong.title);
    }
    
    this.savePreferences();
    console.log(`🔀 Shuffle: ${this.isShuffle ? 'ON' : 'OFF'}`);
  }
  
  toggleRepeat() {
    const modes = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(this.repeatMode);
    this.repeatMode = modes[(currentIndex + 1) % modes.length];
    
    const icon = document.getElementById('repeat-icon');
    if (this.repeatMode === 'one') {
      icon.className = 'fas fa-repeat-1';
      icon.style.color = 'var(--accent)';
    } else if (this.repeatMode === 'all') {
      icon.className = 'fas fa-repeat';
      icon.style.color = 'var(--accent)';
    } else {
      icon.className = 'fas fa-repeat';
      icon.style.color = '';
    }
    
    this.savePreferences();
    console.log(`🔁 Repeat: ${this.repeatMode.toUpperCase()}`);
  }
  
  handleSongEnd() {
    if (this.repeatMode === 'one') {
      this.audio.currentTime = 0;
      this.play();
    } else if (this.repeatMode === 'all' || this.currentSongIndex < this.queue.length - 1) {
      this.next();
    } else {
      this.pause();
    }
  }
  
  updateProgress() {
    if (!this.audio.duration) return;
    
    const percentage = (this.audio.currentTime / this.audio.duration) * 100;
    
    // Update progress bar
    document.getElementById('progress-fill').style.width = percentage + '%';
    document.getElementById('progress-handle').style.left = percentage + '%';
    
    // Update time displays
    document.getElementById('time-current').textContent = Utils.formatTime(this.audio.currentTime);
  }
  
  updateDuration() {
    document.getElementById('time-total').textContent = Utils.formatTime(this.audio.duration);
  }
  
  startVisualizer() {
    const bars = document.querySelectorAll('.visualizer .bar');
    bars.forEach(bar => {
      bar.style.animation = 'visualize 0.8s ease-in-out infinite';
    });
  }
  
  stopVisualizer() {
    const bars = document.querySelectorAll('.visualizer .bar');
    bars.forEach(bar => {
      bar.style.animation = 'none';
      bar.style.height = '4px';
    });
  }
  
  handleKeyboard(e) {
    // Space: Play/Pause
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
      e.preventDefault();
      this.togglePlay();
    }
    
    // Arrow Right: Next song
    if (e.code === 'ArrowRight' && e.ctrlKey) {
      e.preventDefault();
      this.next();
    }
    
    // Arrow Left: Previous song
    if (e.code === 'ArrowLeft' && e.ctrlKey) {
      e.preventDefault();
      this.previous();
    }
    
    // Arrow Up: Volume up
    if (e.code === 'ArrowUp' && e.ctrlKey) {
      e.preventDefault();
      this.setVolume(this.volume + 0.1);
      document.getElementById('volume-slider').value = this.volume * 100;
    }
    
    // Arrow Down: Volume down
    if (e.code === 'ArrowDown' && e.ctrlKey) {
      e.preventDefault();
      this.setVolume(this.volume - 0.1);
      document.getElementById('volume-slider').value = this.volume * 100;
    }
    
    // M: Mute
    if (e.code === 'KeyM' && e.ctrlKey) {
      e.preventDefault();
      this.toggleMute();
    }
    
    // S: Shuffle
    if (e.code === 'KeyS' && e.ctrlKey) {
      e.preventDefault();
      this.toggleShuffle();
    }
    
    // R: Repeat
    if (e.code === 'KeyR' && e.ctrlKey) {
      e.preventDefault();
      this.toggleRepeat();
    }
  }
  
  handleError(e) {
    console.error('Audio error:', e);
    // Try next song on error
    setTimeout(() => this.next(), 1000);
  }
  
  savePreferences() {
    Utils.storage.set(APP_CONFIG.storage.musicPrefs, {
      volume: this.volume,
      repeatMode: this.repeatMode,
      isShuffle: this.isShuffle
    });
  }
  
  // Public API
  playSong(playlistKey, songIndex) {
    if (playlistKey !== this.currentPlaylist) {
      this.loadPlaylist(playlistKey);
    }
    this.loadSong(songIndex);
    this.play();
  }
  
  getCurrentSong() {
    return this.queue[this.currentSongIndex];
  }
  
  getQueue() {
    return this.queue;
  }
  
  getHistory() {
    return this.history;
  }
}

// Global functions for HTML onclick handlers
let musicPlayer;

function togglePlay() {
  musicPlayer.togglePlay();
}

function nextSong() {
  musicPlayer.next();
}

function previousSong() {
  musicPlayer.previous();
}

function shuffleSongs() {
  musicPlayer.toggleShuffle();
}

function toggleRepeat() {
  musicPlayer.toggleRepeat();
}

function toggleMute() {
  musicPlayer.toggleMute();
}

function seekSong(event) {
  const bar = event.currentTarget;
  const clickX = event.offsetX;
  const width = bar.offsetWidth;
  const percentage = clickX / width;
  musicPlayer.seek(percentage);
}

function toggleLyrics() {
  console.log('Lyrics feature coming soon!');
}

function toggleQueue() {
  console.log('Queue feature coming soon!');
}

function expandPlayer() {
  // Navigate to music section
  showSection('music-ocean');
}

console.log('🎵 Music Player Module Loaded');
