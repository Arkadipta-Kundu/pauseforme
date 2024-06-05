let wasPausedByExtension = false;

function pauseVideo() {
    const video = document.querySelector("video");
    if (video && !video.paused) {
        wasPausedByExtension = true;
        video.pause();
    }
}

function resumeVideo() {
    const video = document.querySelector("video");
    if (video && video.paused && wasPausedByExtension) {
        wasPausedByExtension = false;
        video.play();
    }
}

function handleVisibilityChange() {
    if (document.hidden) {
        pauseVideo();
    } else {
        resumeVideo();
    }
}

function monitorManualPause() {
    const video = document.querySelector("video");
    if (video) {
        video.addEventListener('pause', () => {
            if (!wasPausedByExtension) {
                wasPausedByExtension = false;
            }
        });

        video.addEventListener('play', () => {
            if (!document.hidden) {
                wasPausedByExtension = false;
            }
        });
    }
}

document.addEventListener("visibilitychange", handleVisibilityChange);
monitorManualPause();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "pauseVideo") {
        pauseVideo();
    } else if (message.action === "resumeVideo") {
        resumeVideo();
    } else if (message.action === "checkTab") {
        if (!document.hidden) {
            resumeVideo();
        } else {
            pauseVideo();
        }
    }
});
