const musicPlayerWrapper = document.getElementById("musicPlayerWrapper");
let bgAudio = new Audio();
let trackList = [], currentTrackIndex = 0, isPlaying = false;

async function initMusicPlayer() {
    if (!musicPlayerWrapper) return;
    try {
        const response = await fetch("/assets/config/music_list.json");
        if (!response.ok) throw new Error("Config not found");
        trackList = await response.json();

        if (trackList.length > 0) {
            musicPlayerWrapper.style.display = "flex";
            loadTrack(currentTrackIndex);

            let savedVolume = localStorage.getItem("playerVolume");
            bgAudio.volume = savedVolume !== null ? parseFloat(savedVolume) : 1;
            document.getElementById("volumeSlider").value = bgAudio.volume * 100;
            updateVolumeIcon(bgAudio.volume * 100);
        }
    } catch (error) {
        console.warn("Музыка не загружена:", error.message);
    }
}

function loadTrack(index) {
    const track = trackList[index];
    const basePath = `/assets/music/tracks/${track.folder_name}`;
    bgAudio.src = `${basePath}/track.mp3`;
    document.getElementById("playerCover").src = `${basePath}/avatar.png`;
    document.getElementById("playerTitle").textContent = track.title;
    document.getElementById("playerAuthor").textContent = track.author;
    if (isPlaying) bgAudio.play();
}

function formatTime(sec) {
    if (isNaN(sec)) return "0:00";
    return `${Math.floor(sec / 60)}:${Math.floor(sec % 60).toString().padStart(2, "0")}`;
}

function togglePlay() {
    const btn = document.getElementById("playPauseBtn");
    if (isPlaying) { bgAudio.pause(); btn.innerHTML = '<i class="fas fa-play"></i>'; }
    else { bgAudio.play(); btn.innerHTML = '<i class="fas fa-pause"></i>'; }
    isPlaying = !isPlaying;
}

function updateVolumeIcon(val) {
    const muteBtn = document.getElementById("muteBtn");
    if(muteBtn) muteBtn.innerHTML = val == 0 ? '<i class="fas fa-volume-xmark"></i>' : (val < 50 ? '<i class="fas fa-volume-down"></i>' : '<i class="fas fa-volume-up"></i>');
}

// Привязка слушателей
document.addEventListener("menuLoaded", () => {
    initMusicPlayer();
    
    document.getElementById("playPauseBtn")?.addEventListener("click", togglePlay);
    document.getElementById("nextTrackBtn")?.addEventListener("click", () => loadTrack(currentTrackIndex = (currentTrackIndex + 1) % trackList.length));
    document.getElementById("prevTrackBtn")?.addEventListener("click", () => loadTrack(currentTrackIndex = (currentTrackIndex - 1 + trackList.length) % trackList.length));
    
    document.getElementById("volumeSlider")?.addEventListener("input", (e) => {
        bgAudio.volume = e.target.value / 100;
        localStorage.setItem("playerVolume", bgAudio.volume);
        updateVolumeIcon(e.target.value);
    });

    bgAudio.addEventListener("timeupdate", () => {
        const slider = document.getElementById("progressSlider");
        if(slider) slider.value = bgAudio.currentTime;
        const timeDisp = document.getElementById("currentTimeDisplay");
        if(timeDisp) timeDisp.textContent = formatTime(bgAudio.currentTime);
    });
    
    bgAudio.addEventListener("loadedmetadata", () => {
        const slider = document.getElementById("progressSlider");
        if(slider) slider.max = bgAudio.duration;
        const durDisp = document.getElementById("durationDisplay");
        if(durDisp) durDisp.textContent = formatTime(bgAudio.duration);
    });
    
    document.getElementById("progressSlider")?.addEventListener("input", (e) => bgAudio.currentTime = e.target.value);
});