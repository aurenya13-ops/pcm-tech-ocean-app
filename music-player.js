// ==================== MUSIC PLAYER - 100% COMPLETE ====================

class MusicPlayer {
  constructor() {
    this.audio = document.getElementById('audio-player');
    if (!this.audio) {
      console.warn('⚠️ Audio player element not found');
      return;
    }
    
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
    const volumeSlider = document.getElementById('volume-slider');
    if (volumeSlider) {
      volumeSlider.value = this.volume * 100;
    }
    
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
    const volumeSlider = document.getElementById('volume-slider');
    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        this.setVolume(e.target.value / 100);
      });
    }
    
    // Progress slider
    const progressSlider = document.getElementById('progress-slider');
    if (progressSlider) {
      progressSlider.addEventListener('input', (e) => {
        const time = (e.target.value / 100) * this.audio.duration;
        this.audio.currentTime = time;
      });
    }
  }
  
  loadPlaylist(playlistId) {
    const playlist = MUSIC_LIBRARY.playlists[playlistId];
    if (!playlist) {
      console.error('Playlist not found:', playlistId);
      return;
    }
    
    this.currentPlaylist = playlistId;
    this.queue = [...playlist.songs];
    
    if (this.isShuffle) {
      this.queue = Utils.shuffle(this.queue);
    }
    
    this.currentSongIndex = 0;
    this.loadSong(this.queue[0]);
    
    console.log(`📀 Loaded playlist: ${playlist.name} (${this.queue.length} songs)`);
  }
  
  loadSong(song) {
    if (!song) return;
    
    this.audio.src = song.url;
    this.updateUI(song);
    
    console.log(`🎵 Loaded: ${song.title} - ${song.artist}`);
  }
  
  updateUI(song) {
    const titleEl = document.getElementById('player-title');
    const artistEl = document.getElementById('player-artist');
    const coverEl = document.getElementById('player-cover');
    
    if (titleEl) titleEl.textContent = song.title;
    if (artistEl) artistEl.textContent = song.artist;
    if (coverEl) coverEl.src = song.cover || 'https://via.placeholder.com/60';
  }
  
  async togglePlay() {
    if (this.isPlaying) {
      await this.pause();
    } else {
      await this.play();
    }
  }
  
  async play() {
    try {
      await this.audio.play();
      this.isPlaying = true;
      this.updatePlayButton();
      console.log('▶️ Playing');
    } catch (error) {
      console.error('Play error:', error);
    }
  }
  
  async pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.updatePlayButton();
    console.log('⏸️ Paused');
  }
  
  updatePlayButton() {
    const playIcon = document.getElementById('play-icon');
    if (playIcon) {
      playIcon.textContent = this.isPlaying ? '⏸️' : '▶️';
    }
  }
  
  next() {
    if (this.repeatMode === 'one') {
      this.audio.currentTime = 0;
      this.play();
      return;
    }
    
    this.currentSongIndex++;
    
    if (this.currentSongIndex >= this.queue.length) {
      if (this.repeatMode === 'all') {
        this.currentSongIndex = 0;
      } else {
        this.pause();
        return;
      }
    }
    
    this.loadSong(this.queue[this.currentSongIndex]);
    if (this.isPlaying) this.play();
  }
  
  previous() {
    if (this.audio.currentTime > 3) {
      this.audio.currentTime = 0;
      return;
    }
    
    this.currentSongIndex--;
    
    if (this.currentSongIndex < 0) {
      this.currentSongIndex = this.queue.length - 1;
    }
    
    this.loadSong(this.queue[this.currentSongIndex]);
    if (this.isPlaying) this.play();
  }
  
  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    this.savePreferences();
    
    const shuffleBtn = document.getElementById('shuffle-btn');
    if (shuffleBtn) {
      shuffleBtn.classList.toggle('active', this.isShuffle);
    }
    
    console.log(`🔀 Shuffle: ${this.isShuffle ? 'ON' : 'OFF'}`);
  }
  
  toggleRepeat() {
    const modes = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(this.repeatMode);
    this.repeatMode = modes[(currentIndex + 1) % modes.length];
    this.savePreferences();
    
    const repeatBtn = document.getElementById('repeat-btn');
    if (repeatBtn) {
      repeatBtn.classList.toggle('active', this.repeatMode !== 'off');
      repeatBtn.setAttribute('data-mode', this.repeatMode);
    }
    
    console.log(`🔁 Repeat: ${this.repeatMode.toUpperCase()}`);
  }
  
  setVolume(value) {
    this.volume = Math.max(0, Math.min(1, value));
    this.audio.volume = this.volume;
    this.savePreferences();
    
    const volumeIcon = document.getElementById('volume-icon');
    if (volumeIcon) {
      if (this.volume === 0) {
        volumeIcon.textContent = '🔇';
      } else if (this.volume < 0.5) {
        volumeIcon.textContent = '🔉';
      } else {
        volumeIcon.textContent = '🔊';
      }
    }
  }
  
  updateProgress() {
    const current = this.audio.currentTime;
    const duration = this.audio.duration;
    
    if (!duration) return;
    
    const progress = (current / duration) * 100;
    
    const progressFill = document.getElementById('progress-fill');
    const progressSlider = document.getElementById('progress-slider');
    const currentTime = document.getElementById('current-time');
    
    if (progressFill) progressFill.style.width = progress + '%';
    if (progressSlider) progressSlider.value = progress;
    if (currentTime) currentTime.textContent = Utils.formatTime(current);
  }
  
  updateDuration() {
    const duration = this.audio.duration;
    const durationTime = document.getElementById('duration-time');
    
    if (durationTime) {
      durationTime.textContent = Utils.formatTime(duration);
    }
  }
  
  handleSongEnd() {
    console.log('🏁 Song ended');
    this.next();
  }
  
  handleError(e) {
    console.error('🚨 Audio error:', e);
    this.next();
  }
  
  savePreferences() {
    Utils.storage.set(APP_CONFIG.storage.musicPrefs, {
      volume: this.volume,
      repeatMode: this.repeatMode,
      isShuffle: this.isShuffle
    });
  }
}

console.log('🎵 Music Player Module Loaded');
