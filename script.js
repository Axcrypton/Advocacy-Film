
// =================================
// ELEMENT REFERENCES
// =================================

const music = document.getElementById("background-music");
const videoFrame = document.getElementById("advocacy-video");

let youtubePlayer = null;
let pendingVideoAction = null;


// =================================
// YOUTUBE PLAYER INITIALIZATION
// =================================

// This function is called automatically
// when the YouTube iframe API has loaded.

function onYouTubeIframeAPIReady() {

    youtubePlayer = new YT.Player("advocacy-video", {

        events: {
            onReady: function() {

                console.log("YouTube player is ready.");

                if (pendingVideoAction) {
                    const action = pendingVideoAction;
                    pendingVideoAction = null;
                    action();
                }

            },

            onStateChange: function(event) {

                // YouTube video has finished.
                if (event.data === YT.PlayerState.ENDED) {
                    showCredits();
                }

            },

            onError: function() {

                const errorMessage =
                    document.getElementById("video-error");

                if (errorMessage) {
                    errorMessage.hidden = false;
                }

            }
        }

    });

}


// =================================
// YOUTUBE VIDEO CONTROLS
// =================================

function runVideoAction(action) {

    if (youtubePlayer && youtubePlayer.playVideo) {
        action();
    } else {
        pendingVideoAction = action;
    }

}

function playYouTubeVideo() {

    runVideoAction(function() {
        youtubePlayer.playVideo();
    });

}

function pauseYouTubeVideo() {

    if (youtubePlayer && youtubePlayer.pauseVideo) {
        youtubePlayer.pauseVideo();
    }

}

function restartYouTubeVideo() {

    runVideoAction(function() {
        youtubePlayer.seekTo(0, true);
        youtubePlayer.playVideo();
    });

}


// =================================
// SCREEN NAVIGATION
// =================================

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");
    const targetScreen = document.getElementById(screenId);

    if (!targetScreen) {
        console.error("Screen not found:", screenId);
        return;
    }

    screens.forEach(function(screen) {
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

    buttons.forEach(function(button) {

        button.textContent = music.paused
            ? "♫ PLAY MUSIC"
            : "♫ PAUSE MUSIC";

    });

}


function playMusic() {

    music.volume = 0.5;

    music.play()
        .then(function() {
            updateMusicButton();
        })
        .catch(function() {

            console.log(
                "Browser blocked automatic music playback."
            );

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
// INITIAL HOMEPAGE MUSIC
// =================================

window.addEventListener("load", function() {

    playMusic();

});


// =================================
// OPEN VIDEO SECTION
// =================================

function startVideo() {

    // Stop background music.
    stopMusic();

    // Display video screen.
    showScreen("video-screen");

    // Start YouTube video.
    playYouTubeVideo();

}


// =================================
// OPEN CREDITS SECTION
// =================================

function showCredits() {

    // Stop video playback.
    pauseYouTubeVideo();

    // Display credits.
    showScreen("credits-screen");

    // Play music in credits.
    playMusic();

}


// =================================
// RETURN TO HOMEPAGE
// =================================

function returnHome() {

    // Pause YouTube video.
    pauseYouTubeVideo();

    // Display homepage.
    showScreen("home-screen");

    // Resume homepage music.
    playMusic();

}


// =================================
// REPLAY ADVOCACY VIDEO
// =================================

function replayAdvocacy() {

    // Stop music.
    stopMusic();

    // Display video section.
    showScreen("video-screen");

    // Restart video from the beginning.
    restartYouTubeVideo();

}


// =================================
// FULLSCREEN
// =================================

function toggleFullscreen() {

    const iframe = youtubePlayer
        ? youtubePlayer.getIframe()
        : videoFrame;

    if (!document.fullscreenElement) {

        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        }

    } else {

        document.exitFullscreen();

    }

}


// =================================
// INITIAL BUTTON SETTINGS
// =================================

updateMusicButton();
