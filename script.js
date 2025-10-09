const playlistSongs = document.getElementById('playlist-songs');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');
const playingSong = document.getElementById("player-song-title");
const songArtist = document.getElementById("player-song-artist");
const allSongs = [
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
  },
]

const audio = new Audio();
const userData = {
  songs: allSongs,
  currentSong: null,
  songCurrentTime: 0
}

function playSong (id, start = true) {
  const song = userData.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;

  if (userData.currentSong === null || start) {
    audio.currentTime = 0;
  }else {
    audio.currentTime = userData.songCurrentTime;
  }

setPlayerDisplay();

  playButton.classList.add('playing');
  userData.currentSong = song;
  audio.play();
}

function pauseSong() {
  userData.songCurrentTime = audio.currentTime;
  playButton.classList.remove('playing');
  highlightCurrentSong();
  audio.pause();
}

function getNextSong() {
  const currentIndex = getCurrentSongIndex();
  return userData.songs[currentIndex + 1];
}

function getPreviousSong() {
  const currentIndex = getCurrentSongIndex();
  return userData.songs[currentIndex - 1];
}

function playNextSong() {
  if (userData.currentSong === null) {
    playSong(userData.songs[0].id);
  }else {
    const nextSong = getNextSong();
    if (nextSong !== undefined) {
      playSong(nextSong.id);
    } else {
      userData.currentSong = null;
      userData.songCurrentTime = 0;
      pauseSong();
    }
}
}

function setPlayerDisplay() {
  playingSong.textContent = userData.currentSong?.title || "";
  songArtist.textContent = userData.currentSong?.artist || "";
}

function highlightCurrentSong() {
  const currentHighlighted = document.querySelector('.playlist-song[aria-current="true"]');
  if (currentHighlighted) {
    currentHighlighted.removeAttribute('aria-current');
  }
  const songToHighlight = document.getElementById(`song-${userData.currentSong?.id}`);
  if (songToHighlight) {
    songToHighlight.setAttribute("aria-current", "true");
  }
}

function playPreviousSong() {
    if (userData.currentSong === null) {
    return;
  }
  const previousSong = getPreviousSong();
  if (previousSong === undefined) {
    playSong(userData.songs[0].id);
  } else {
    playSong(previousSong.id);
  }
}

function getCurrentSongIndex() {
  if (userData.currentSong === null) {
    return -1;
  }
  return userData.songs.indexOf(userData.currentSong);
}

function setPlayButtonAccessibleText() {
  if (userData.currentSong) {
    playButton.setAttribute("aria-label", `Play ${userData.currentSong.title}`);
  } else {
    playButton.setAttribute("aria-label", "Play");
  }
}

playButton.addEventListener("click", () => {
  if (userData.currentSong === null) {
    playSong(userData.songs[0].id);
  } else {
    playSong(userData.currentSong.id, false);
  }
});

const songs = document.querySelectorAll('.playlist-song');

songs.forEach((song) => {
   const button = song.querySelector('button');
  button.addEventListener('click', () => {
    const songId = Number(song.id.split('-')[1]);
    playSong(songId);
  });
});

pauseButton.addEventListener("click", pauseSong);
nextButton.addEventListener("click", playNextSong);
previousButton.addEventListener("click", playPreviousSong);