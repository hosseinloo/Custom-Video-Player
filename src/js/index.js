////////////////////////////////////////////////////////

//*******************/ Variables
let video = document.getElementById('video');
let play = document.querySelector('.play');
let rewind = document.querySelector('.rewind');
let forward = document.querySelector('.forward');
let current = document.querySelector('.current-time');
let videoTime = document.querySelector('.all-time');
let inputTime = document.getElementById('progress');
let volume = document.querySelector('.volume');
let inputVol = document.querySelector('#volumeInput');
let fullscreen  = document.querySelector('.fullscreen');
let videoParent = document.querySelector('.video-player');
let btnParent = document.querySelector('.video-btns');

////////////////////////////////////////////////////////

//*******************/ Volume Default Value
video.volume = .5;

////////////////////////////////////////////////////////

//******************/ Functions

// toggle icon between pause and play icon.
function togglePlayIcon() {
    let playIcon = play.querySelector('i');
    playIcon.classList.toggle('bx-pause');
    playIcon.classList.toggle('bx-play');
}

// toggle icon between volume icon.
function toggleVolumeIcon() {
    let iconVol = volume.querySelector('i');
    iconVol.classList.toggle('bxs-volume-full');
    iconVol.classList.toggle('bxs-volume-mute');
}

// toggle icon between fullscreen icon.
function toggleFullScreenIcon() {
    let fullscreenIcon = fullscreen.querySelector('i');
    fullscreenIcon.classList.toggle('bx-exit-fullscreen');
    fullscreenIcon.classList.toggle('bx-fullscreen');
}

// get time for video and current video time
function getTime(time) {
    let minute = Math.floor(time / 60);
    let second = Math.floor(time - (minute * 60));
    let minVal, secVal;
    
    if (minute < 10) {
        minVal = "0" + minute;
    } else {
        minVal = minute;
    };
    if (second < 10) {
        secVal = "0" + second;
    } else {
        secVal = second;
    };

    return minVal + ":" + secVal;
    
}

////////////////////////////////////////////////////////

//******************/ Event Listener

// show and hidden controls box icon with mouse move and hover
videoParent.addEventListener('mousemove', function(e) {
    btnParent.classList.add('flex');
    setTimeout(function() {
        btnParent.classList.remove('flex')
    }, 5000)
})
videoParent.addEventListener('mouseenter', function(e) {
    btnParent.classList.add('flex');
})
videoParent.addEventListener('mouseleave', function(e) {
    btnParent.classList.remove('flex');
})

// event for fullscreen control
fullscreen.addEventListener('click', function(e) {
    console.log(document.fullscreenElement);
    if (!document.fullscreenElement) {
        if (videoParent.requestFullscreen) {
            videoParent.requestFullscreen();
            toggleFullScreenIcon();
        } else if (videoParent.mozFullscreenElement) {
            videoParent.mozFullscreenElement();
            toggleFullScreenIcon();
        } else if (videoParent.msFullscreenElement) {
            videoParent.msFullscreenElement();
            toggleFullScreenIcon();
        } else if (videoParent.webkitFullscreenElement) {
            videoParent.webkitFullscreenElement();
            toggleFullScreenIcon();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            toggleFullScreenIcon();
        } else if (document.mozCancelRequestFullscreen) {
            document.mozCancelRequestFullscreen();
            toggleFullScreenIcon();
        } else if (document.msCancelRequestFullscreen) {
            document.msCancelRequestFullscreen();
            toggleFullScreenIcon();
        } else if (document.webkitCancelRequestFullscreen) {
            document.webkitCancelRequestFullscreen();
            toggleFullScreenIcon();
        }
    }
})

// event for control volume
inputVol.addEventListener('input', function(e) {
    video.volume = this.value / 100;
    console.log(this.value);
    inputVol.style = `background: linear-gradient(90deg, #ff3636 ${this.value}% , rgb(225, 225, 225) 0%)`;

})
volume.addEventListener('click', function(e) {
    if (!video.muted) {
        video.muted = true;
        toggleVolumeIcon();
    } else {
        video.muted = false; 
        toggleVolumeIcon();
    }
})
volume.addEventListener('mouseenter', function(e) {
    inputVol.classList.toggle('block');
});
volume.addEventListener('mouseleave', function(e) {
    inputVol.classList.toggle('block');
})

// event for show time in control buttons
inputTime.addEventListener('input', function(e) {
    video.currentTime = (this.value / 100) * video.duration;
})
video.addEventListener('timeupdate', function(e) {
    current.textContent = getTime(video.currentTime);
    let progressLength = Math.floor((video.currentTime / video.duration) * 100);
    inputTime.style = `background: linear-gradient(90deg, #ff3636 ${progressLength}% , rgb(225, 225, 225) 0%)`;
    inputTime.value = progressLength;

})

// event for toggle between play and pause icon
play.addEventListener('click', () => {
    videoTime.textContent = getTime(video.duration);
    if (video.paused) {
        video.play();
        togglePlayIcon()
    } else {
        video.pause();
        togglePlayIcon();
    }
});
video.addEventListener('click', () => {
    videoTime.textContent = getTime(video.duration);
    if (video.paused) {
        video.play();
        togglePlayIcon()
    } else {
        video.pause();
        togglePlayIcon();
    }
})

// event for rewind 5s video time 
rewind.addEventListener('click', function(e) {
    video.currentTime = video.currentTime - 5;
});

// event for rewind 5s video time 
forward.addEventListener('click', function(e) {
    video.currentTime = video.currentTime + 5;
})
