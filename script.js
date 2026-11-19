
// =================================
// ELEMENT REFERENCES
// =================================

const video = document.getElementById("advocacy-video");
const music = document.getElementById("background-music");


// =================================
// SCREEN NAVIGATION
// =================================

function showScreen(screenId) {
    const screens = document.querySelectorAll(".screen");
    const targetScreen = document.getElementById(screenId);

    if (!targetScreen) return;

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    targetScreen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// =================================
// MUSIC CONTROLS
// =================================

function updateMusicButton() {
    const buttons = document.querySelectorAll(".music-button");

    buttons.forEach(button => {
        button.textContent = music.paused
            ? "♫ PLAY MUSIC"
            : "♫ PAUSE MUSIC";
    });
}

function playMusic() {
    music.volume = 0.5;

    music.play()
        .then(updateMusicButton)
        .catch(() => {
            console.log("Browser blocked autoplay. Click PLAY MUSIC to start.");
            updateMusicButton();
        });
}

function stopMusic() {
    music.pause();
    music.currentTime = 0;
    updateMusicButton();
}

function toggleMusic() {
    if (music.paused) {
        playMusic();
    } else {
        stopMusic();
    }
}

music.addEventListener("play", updateMusicButton);
music.addEventListener("pause", updateMusicButton);


// =================================
// AUTOMATIC MUSIC WHEN PROGRAM OPENS
// =================================

window.addEventListener("load", function() {
    playMusic();
});


// =================================
// OPEN VIDEO PAGE
// =================================

function startVideo() {
    stopMusic();

    showScreen("video-screen");

    video.pause();
    video.currentTime = 0;

    video.play().catch(() => {
        console.log("Press the video play button to start.");
    });
}


// =================================
// OPEN CREDITS PAGE
// =================================

function showCredits() {
    video.pause();

    showScreen("credits-screen");

    // Music should play in the credits.
    playMusic();
}


// =================================
// RETURN TO HOMEPAGE
// =================================

function returnHome() {
    video.pause();
    video.currentTime = 0;

    showScreen("home-screen");

    // Music should play on the homepage.
    playMusic();
}


// =================================
// FULLSCREEN
// =================================

function toggleFullscreen() {
    const container = document.getElementById("video-container");

    if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        }
    } else {
        document.exitFullscreen();
    }
}


// =================================
// VIDEO ERROR
// =================================

video.addEventListener("error", function() {
    const errorMessage = document.getElementById("video-error");

    if (errorMessage) {
        errorMessage.hidden = false;
    }
});


// =================================
// VIDEO DURATION WARNING
// =================================

video.addEventListener("loadedmetadata", function() {
    const warning = document.getElementById("duration-warning");

    if (!warning) return;

    warning.hidden = !(
        Number.isFinite(video.duration) &&
        video.duration <= 300
    );
});


// =================================
// REPLAY VIDEO
// =================================

function replayAdvocacy() {
    stopMusic();

    video.pause();
    video.currentTime = 0;

    startVideo();
}


// =================================
// INITIAL SETTINGS
// =================================

updateMusicButton();