function pauseVideo() {
    const video = document.querySelector("video");
    if (video && !video.paused) {
        video.pause();
    }
}

function resumeVideo() {
    const video = document.querySelector("video");
    if (video && video.paused) {
        video.play();
    }
}

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        pauseVideo();
    } else {
        resumeVideo();
    }
});

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
