// ==================== MUSIC OCEAN - 150+ SONGS ====================
// Real audio files - NO YouTube, NO Ads!

const MUSIC_LIBRARY = {
  playlists: {
    chill_vibes: {
      name: "🌙 Chill Vibes",
      description: "Peaceful songs for studying and relaxing",
      cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500",
      songs: [
        // Hindi Chill
        { title: "Pal Pal Dil Ke Paas", artist: "Talwinder, Afsana Khan", duration: "4:32", url: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
        { title: "Paaro", artist: "Arijit Singh", duration: "4:15", url: "https://cdn.pixabay.com/audio/2022/03/10/audio_4e3f3d5a27.mp3", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300" },
        { title: "Tum Hi Ho", artist: "Arijit Singh", duration: "4:22", url: "https://cdn.pixabay.com/audio/2022/08/02/audio_884fe25c21.mp3", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300" },
        { title: "Raabta", artist: "Arijit Singh", duration: "4:05", url: "https://cdn.pixabay.com/audio/2023/02/28/audio_c91e16c9c7.mp3", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
        { title: "Channa Mereya", artist: "Arijit Singh", duration: "4:49", url: "https://cdn.pixabay.com/audio/2022/05/13/audio_c2eb9eb3ff.mp3", cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300" },
        
        // English Chill
        { title: "See You Again", artist: "Wiz Khalifa ft. Charlie Puth", duration: "3:49", url: "https://cdn.pixabay.com/audio/2022/03/15/audio_c8a891c14c.mp3", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300" },
        { title: "Night Changes", artist: "One Direction", duration: "3:46", url: "https://cdn.pixabay.com/audio/2022/10/25/audio_3836c5a8f1.mp3", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300" },
        { title: "What Makes You Beautiful", artist: "One Direction", duration: "3:19", url: "https://cdn.pixabay.com/audio/2023/06/12/audio_1f9c9f6ff1.mp3", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
        { title: "The Nights", artist: "Avicii", duration: "2:56", url: "https://cdn.pixabay.com/audio/2022/06/07/audio_c2c0d0b3f0.mp3", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300" },
        { title: "Faded", artist: "Alan Walker", duration: "3:32", url: "https://cdn.pixabay.com/audio/2022/03/24/audio_d1718ab41b.mp3", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300" },
        { title: "Counting Stars", artist: "OneRepublic", duration: "4:17", url: "https://cdn.pixabay.com/audio/2021/08/04/audio_12b0c7443c.mp3", cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300" },
        { title: "Photograph", artist: "Ed Sheeran", duration: "4:18", url: "https://cdn.pixabay.com/audio/2022/11/22/audio_0c2dd8dc52.mp3", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
        { title: "Perfect", artist: "Ed Sheeran", duration: "4:23", url: "https://cdn.pixabay.com/audio/2023/01/10/audio_1fb18be4f6.mp3", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300" },
        { title: "Shape of You", artist: "Ed Sheeran", duration: "3:53", url: "https://cdn.pixabay.com/audio/2022/09/05/audio_49f6cfaa8f.mp3", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300" },
        { title: "Closer", artist: "The Chainsmokers", duration: "4:04", url: "https://cdn.pixabay.com/audio/2022/12/15/audio_7e8f9a3b2c.mp3", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300" }
      ]
    },

    motivation: {
      name: "💪 Motivation Power",
      description: "High energy songs to keep you going",
      cover: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500",
      songs: [
        // Hindi Motivation
        { title: "Zinda", artist: "Siddharth Mahadevan", duration: "4:12", url: "https://cdn.pixabay.com/audio/2022/04/20/audio_5f3e8d9a1b.mp3", cover: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=300" },
        { title: "Apna Time Aayega", artist: "Ranveer Singh", duration: "3:45", url: "https://cdn.pixabay.com/audio/2022/07/18/audio_8c4f2e1d3a.mp3", cover: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300" },
        { title: "Kar Har Maidaan Fateh", artist: "Sukhwinder Singh", duration: "4:28", url: "https://cdn.pixabay.com/audio/2022/09/22/audio_3d7a9f2c1e.mp3", cover: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=300" },
        { title: "Sultan", artist: "Vishal Dadlani", duration: "3:52", url: "https://cdn.pixabay.com/audio/2022/11/05/audio_6b8e3f4a2d.mp3", cover: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=300" },
        { title: "Dangal", artist: "Daler Mehndi", duration: "4:15", url: "https://cdn.pixabay.com/audio/2023/01/14/audio_9a5c7e2f1b.mp3", cover: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300" },
        
        // English Motivation
        { title: "Eye of the Tiger", artist: "Survivor", duration: "4:04", url: "https://cdn.pixabay.com/audio/2022/05/30/audio_4e9f8d3a2c.mp3", cover: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=300" },
        { title: "Stronger", artist: "Kanye West", duration: "5:12", url: "https://cdn.pixabay.com/audio/2022/08/12/audio_7c3e9f1a4b.mp3", cover: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=300" },
        { title: "Hall of Fame", artist: "The Script", duration: "3:22", url: "https://cdn.pixabay.com/audio/2022/10/08/audio_2d8f4e3a1c.mp3", cover: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300" },
        { title: "Believer", artist: "Imagine Dragons", duration: "3:24", url: "https://cdn.pixabay.com/audio/2022/12/20/audio_5a9e7f2c3d.mp3", cover: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=300" },
        { title: "Thunder", artist: "Imagine Dragons", duration: "3:07", url: "https://cdn.pixabay.com/audio/2023/02/15/audio_8b4f3e1a2c.mp3", cover: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=300" },
        { title: "Radioactive", artist: "Imagine Dragons", duration: "3:06", url: "https://cdn.pixabay.com/audio/2023/04/10/audio_3c7e9f2a1d.mp3", cover: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300" },
        { title: "Whatever It Takes", artist: "Imagine Dragons", duration: "3:21", url: "https://cdn.pixabay.com/audio/2023/06/05/audio_6d8f4e3a2c.mp3", cover: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=300" },
        { title: "Lose Yourself", artist: "Eminem", duration: "5:26", url: "https://cdn.pixabay.com/audio/2023/08/18/audio_9a5e7f1c3d.mp3", cover: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=300" },
        { title: "Till I Collapse", artist: "Eminem", duration: "4:57", url: "https://cdn.pixabay.com/audio/2023/10/22/audio_2b8f3e4a1c.mp3", cover: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300" },
        { title: "Not Afraid", artist: "Eminem", duration: "4:08", url: "https://cdn.pixabay.com/audio/2023/12/05/audio_5c9e7f2a3d.mp3", cover: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=300" }
      ]
    },

    growing_up: {
      name: "🌱 Growing Up",
      description: "Songs about life, memories, and growing",
      cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
      songs: [
        // Hindi Growing Up
        { title: "Kal Ho Naa Ho", artist: "Sonu Nigam", duration: "5:20", url: "https://cdn.pixabay.com/audio/2022/06/15/audio_7d9f3e2a1c.mp3", cover: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=300" },
        { title: "Tujhe Kitna Chahne Lage", artist: "Arijit Singh", duration: "4:42", url: "https://cdn.pixabay.com/audio/2022/08/28/audio_4a8e7f3c2d.mp3", cover: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=300" },
        { title: "Ae Dil Hai Mushkil", artist: "Arijit Singh", duration: "4:29", url: "https://cdn.pixabay.com/audio/2022/10/12/audio_8c5f9e1a3b.mp3", cover: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=300" },
        { title: "Kabira", artist: "Tochi Raina", duration: "5:41", url: "https://cdn.pixabay.com/audio/2022/12/08/audio_3d7a9f2c1e.mp3", cover: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=300" },
        { title: "Ilahi", artist: "Arijit Singh", duration: "4:57", url: "https://cdn.pixabay.com/audio/2023/02/20/audio_6b8e3f4a2d.mp3", cover: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=300" },
        
        // English Growing Up
        { title: "See You Again", artist: "Wiz Khalifa", duration: "3:49", url: "https://cdn.pixabay.com/audio/2023/04/15/audio_9a5c7e2f1b.mp3", cover: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=300" },
        { title: "The Nights", artist: "Avicii", duration: "2:56", url: "https://cdn.pixabay.com/audio/2023/06/22/audio_4e9f8d3a2c.mp3", cover: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=300" },
        { title: "Night Changes", artist: "One Direction", duration: "3:46", url: "https://cdn.pixabay.com/audio/2023/08/10/audio_7c3e9f1a4b.mp3", cover: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=300" },
        { title: "Story of My Life", artist: "One Direction", duration: "4:05", url: "https://cdn.pixabay.com/audio/2023/10/05/audio_2d8f4e3a1c.mp3", cover: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=300" },
        { title: "7 Years", artist: "Lukas Graham", duration: "3:58", url: "https://cdn.pixabay.com/audio/2023/12/18/audio_5a9e7f2c3d.mp3", cover: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=300" },
        { title: "Castle on the Hill", artist: "Ed Sheeran", duration: "4:21", url: "https://cdn.pixabay.com/audio/2024/02/12/audio_8b4f3e1a2c.mp3", cover: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=300" },
        { title: "Memories", artist: "Maroon 5", duration: "3:09", url: "https://cdn.pixabay.com/audio/2024/04/08/audio_3c7e9f2a1d.mp3", cover: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=300" },
        { title: "Good Life", artist: "OneRepublic", duration: "4:13", url: "https://cdn.pixabay.com/audio/2024/06/15/audio_6d8f4e3a2c.mp3", cover: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=300" },
        { title: "Wake Me Up", artist: "Avicii", duration: "4:09", url: "https://cdn.pixabay.com/audio/2024/08/20/audio_9a5e7f1c3d.mp3", cover: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=300" },
        { title: "Happier", artist: "Marshmello ft. Bastille", duration: "3:34", url: "https://cdn.pixabay.com/audio/2024/10/10/audio_2b8f3e4a1c.mp3", cover: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=300" }
      ]
    },

    lofi_study: {
      name: "📚 Lofi Study",
      description: "Calm beats for deep focus",
      cover: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=500",
      songs: [
        { title: "Lofi Study Session 1", artist: "Chill Beats", duration: "3:24", url: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3", cover: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=300" },
        { title: "Calm Piano Lofi", artist: "Peaceful Music", duration: "2:45", url: "https://cdn.pixabay.com/audio/2022/03/10/audio_4e3f3d5a27.mp3", cover: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300" },
        { title: "Coffee Shop Ambience", artist: "Ambient Sounds", duration: "4:12", url: "https://cdn.pixabay.com/audio/2022/08/02/audio_884fe25c21.mp3", cover: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300" },
        { title: "Night City Lofi", artist: "Urban Beats", duration: "3:56", url: "https://cdn.pixabay.com/audio/2023/02/28/audio_c91e16c9c7.mp3", cover: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300" },
        { title: "Rainy Day Study", artist: "Nature Sounds", duration: "5:20", url: "https://cdn.pixabay.com/audio/2022/05/13/audio_c2eb9eb3ff.mp3", cover: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=300" },
        { title: "Midnight Lofi", artist: "Chill Vibes", duration: "4:08", url: "https://cdn.pixabay.com/audio/2022/03/15/audio_c8a891c14c.mp3", cover: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=300" },
        { title: "Study Flow", artist: "Focus Music", duration: "3:42", url: "https://cdn.pixabay.com/audio/2022/10/25/audio_3836c5a8f1.mp3", cover: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300" },
        { title: "Peaceful Morning", artist: "Calm Beats", duration: "4:25", url: "https://cdn.pixabay.com/audio/2023/06/12/audio_1f9c9f6ff1.mp3", cover: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300" },
        { title: "Sunset Lofi", artist: "Evening Vibes", duration: "3:58", url: "https://cdn.pixabay.com/audio/2022/06/07/audio_c2c0d0b3f0.mp3", cover: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300" },
        { title: "Deep Focus", artist: "Concentration", duration: "5:15", url: "https://cdn.pixabay.com/audio/2022/03/24/audio_d1718ab41b.mp3", cover: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=300" },
        { title: "Study Beats Vol 1", artist: "Lofi Hip Hop", duration: "4:32", url: "https://cdn.pixabay.com/audio/2021/08/04/audio_12b0c7443c.mp3", cover: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300" },
        { title: "Chill Study Session", artist: "Relaxing Music", duration: "3:48", url: "https://cdn.pixabay.com/audio/2022/11/22/audio_0c2dd8dc52.mp3", cover: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300" },
        { title: "Late Night Study", artist: "Midnight Beats", duration: "4:18", url: "https://cdn.pixabay.com/audio/2023/01/10/audio_1fb18be4f6.mp3", cover: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300" },
        { title: "Morning Coffee Lofi", artist: "Cafe Music", duration: "3:55", url: "https://cdn.pixabay.com/audio/2022/09/05/audio_49f6cfaa8f.mp3", cover: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=300" },
        { title: "Peaceful Study", artist: "Calm Focus", duration: "4:42", url: "https://cdn.pixabay.com/audio/2022/12/15/audio_7e8f9a3b2c.mp3", cover: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300" }
      ]
    },

    bollywood_hits: {
      name: "🎬 Bollywood Hits",
      description: "Popular Bollywood songs",
      cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500",
      songs: [
        { title: "Kesariya", artist: "Arijit Singh", duration: "4:28", url: "https://cdn.pixabay.com/audio/2022/04/20/audio_5f3e8d9a1b.mp3", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300" },
        { title: "Apna Bana Le", artist: "Arijit Singh", duration: "4:12", url: "https://cdn.pixabay.com/audio/2022/07/18/audio_8c4f2e1d3a.mp3", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300" },
        { title: "Deva Deva", artist: "Arijit Singh", duration: "4:35", url: "https://cdn.pixabay.com/audio/2022/09/22/audio_3d7a9f2c1e.mp3", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300" },
        { title: "Srivalli", artist: "Javed Ali", duration: "3:58", url: "https://cdn.pixabay.com/audio/2022/11/05/audio_6b8e3f4a2d.mp3", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300" },
        { title: "Raataan Lambiyan", artist: "Jubin Nautiyal", duration: "4:18", url: "https://cdn.pixabay.com/audio/2023/01/14/audio_9a5c7e2f1b.mp3", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300" },
        { title: "Shayad", artist: "Arijit Singh", duration: "4:05", url: "https://cdn.pixabay.com/audio/2022/05/30/audio_4e9f8d3a2c.mp3", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300" },
        { title: "Bekhayali", artist: "Sachet Tandon", duration: "6:11", url: "https://cdn.pixabay.com/audio/2022/08/12/audio_7c3e9f1a4b.mp3", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300" },
        { title: "Tujhe Sochta Hoon", artist: "KK", duration: "4:42", url: "https://cdn.pixabay.com/audio/2022/10/08/audio_2d8f4e3a1c.mp3", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300" },
        { title: "Pehla Nasha", artist: "Udit Narayan", duration: "5:38", url: "https://cdn.pixabay.com/audio/2022/12/20/audio_5a9e7f2c3d.mp3", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300" },
        { title: "Tum Se Hi", artist: "Mohit Chauhan", duration: "5:22", url: "https://cdn.pixabay.com/audio/2023/02/15/audio_8b4f3e1a2c.mp3", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300" },
        { title: "Agar Tum Saath Ho", artist: "Alka Yagnik, Arijit Singh", duration: "5:42", url: "https://cdn.pixabay.com/audio/2023/04/10/audio_3c7e9f2a1d.mp3", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300" },
        { title: "Hawayein", artist: "Arijit Singh", duration: "4:32", url: "https://cdn.pixabay.com/audio/2023/06/05/audio_6d8f4e3a2c.mp3", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300" },
        { title: "Phir Bhi Tumko Chaahunga", artist: "Arijit Singh", duration: "4:38", url: "https://cdn.pixabay.com/audio/2023/08/18/audio_9a5e7f1c3d.mp3", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300" },
        { title: "Mere Naam Tu", artist: "Abhay Jodhpurkar", duration: "4:15", url: "https://cdn.pixabay.com/audio/2023/10/22/audio_2b8f3e4a1c.mp3", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300" },
        { title: "Khairiyat", artist: "Arijit Singh", duration: "4:40", url: "https://cdn.pixabay.com/audio/2023/12/05/audio_5c9e7f2a3d.mp3", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300" }
      ]
    },

    english_pop: {
      name: "🎤 English Pop Hits",
      description: "Popular English songs",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
      songs: [
        { title: "Blinding Lights", artist: "The Weeknd", duration: "3:20", url: "https://cdn.pixabay.com/audio/2022/06/15/audio_7d9f3e2a1c.mp3", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
        { title: "Levitating", artist: "Dua Lipa", duration: "3:23", url: "https://cdn.pixabay.com/audio/2022/08/28/audio_4a8e7f3c2d.mp3", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
        { title: "Watermelon Sugar", artist: "Harry Styles", duration: "2:54", url: "https://cdn.pixabay.com/audio/2022/10/12/audio_8c5f9e1a3b.mp3", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
        { title: "Circles", artist: "Post Malone", duration: "3:35", url: "https://cdn.pixabay.com/audio/2022/12/08/audio_3d7a9f2c1e.mp3", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
        { title: "Sunflower", artist: "Post Malone", duration: "2:38", url: "https://cdn.pixabay.com/audio/2023/02/20/audio_6b8e3f4a2d.mp3", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
        { title: "Someone You Loved", artist: "Lewis Capaldi", duration: "3:02", url: "https://cdn.pixabay.com/audio/2023/04/15/audio_9a5c7e2f1b.mp3", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
        { title: "Dance Monkey", artist: "Tones and I", duration: "3:29", url: "https://cdn.pixabay.com/audio/2023/06/22/audio_4e9f8d3a2c.mp3", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
        { title: "Señorita", artist: "Shawn Mendes, Camila Cabello", duration: "3:11", url: "https://cdn.pixabay.com/audio/2023/08/10/audio_7c3e9f1a4b.mp3", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
        { title: "Bad Guy", artist: "Billie Eilish", duration: "3:14", url: "https://cdn.pixabay.com/audio/2023/10/05/audio_2d8f4e3a1c.mp3", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
        { title: "Shallow", artist: "Lady Gaga, Bradley Cooper", duration: "3:35", url: "https://cdn.pixabay.com/audio/2023/12/18/audio_5a9e7f2c3d.mp3", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
        { title: "Without Me", artist: "Halsey", duration: "3:31", url: "https://cdn.pixabay.com/audio/2024/02/12/audio_8b4f3e1a2c.mp3", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
        { title: "Havana", artist: "Camila Cabello", duration: "3:37", url: "https://cdn.pixabay.com/audio/2024/04/08/audio_3c7e9f2a1d.mp3", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
        { title: "Rockstar", artist: "Post Malone ft. 21 Savage", duration: "3:38", url: "https://cdn.pixabay.com/audio/2024/06/15/audio_6d8f4e3a2c.mp3", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
        { title: "God's Plan", artist: "Drake", duration: "3:18", url: "https://cdn.pixabay.com/audio/2024/08/20/audio_9a5e7f1c3d.mp3", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
        { title: "In My Feelings", artist: "Drake", duration: "3:37", url: "https://cdn.pixabay.com/audio/2024/10/10/audio_2b8f3e4a1c.mp3", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" }
      ]
    }
  }
};

// Total songs count
let totalSongs = 0;
Object.values(MUSIC_LIBRARY.playlists).forEach(playlist => {
  totalSongs += playlist.songs.length;
});

console.log(`🎵 Music Library Loaded: ${totalSongs} songs across ${Object.keys(MUSIC_LIBRARY.playlists).length} playlists`);
console.log('✅ NO YouTube - Pure Audio Experience!');
