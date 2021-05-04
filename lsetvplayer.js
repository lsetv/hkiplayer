
var player = WowzaPlayer.create("wowza_player_2021",
    {
    "license":"PLAY1-fjU9h-8md7H-6X8mf-ThvbB-dVPGw",
    "sources":[{
    "sourceURL":"https://cdn3.wowza.com/1/bHN2L0hwWjlpRGd0/VzcvaWhN/hls/live/playlist.m3u8?dvr"
    },
    {
    "sourceURL":""
    }],
    "title":"Hellen Keller International Gala 2021",
    "description":"",
    "posterFrameURL": "https://www-hki-org-develop.go-vip.net/wp-content/uploads/2021/05/01-PreShow_ForCounter_Still2021_web.jpg",
    "endPosterFrameURL": "https://www-hki-org-develop.go-vip.net/wp-content/uploads/2021/05/01-PreShow_ForCounter_Still2021_web.jpg",
    "autoPlay":false,
    "mute":false,
    "volume":75,
    "uiEnableDVR":"true",
    "uiShowChannelBug": "true",
    "uiChannelBugLocation": "topleft",

    }
);

//     "liveStartTimestamp": "2021-05-04T21:00:00+00:00"

function addDonate () {
    var insertEl = document.getElementById('wowza_player_2021-ChannelBug');
    if (insertEl != null) {
    insertEl.classList.remove("wowza_player_2021-Hide");
    insertEl.classList.add("wowza_player_2021-TopLeft", "wowza_player_2021-Show");
    newElement = document.createElement('div');
    newElement.innerHTML = "<button type='button' class='wp-block-button__link' id='donateBtn' data-open='modal1'>Donate </button>";
    newElement.className = 'donateContainer';
    insertEl.appendChild(newElement);

    return newElement;
  } 
  else {
    // console.log('we are on mobile');
    const playerContainer = document.getElementById('wowza_player_2021');
    newElement = document.createElement('div');
    newElement.innerHTML = "<button type='button' class='wp-block-button__link' id='donateBtn' data-open='modal1'>Donate </button>";
    newElement.className = 'donateContainer';
    playerContainer.parentNode.insertBefore(newElement, playerContainer.nextSibling);
  }
}

// function inline() {
//     const video = document.getElementById('wowza_player_2021-Video');
//     // console.log(video);
//     const attribute = document.createAttribute('playsinline');
//     video.setAttribute('playsinline', 'playsinline');
//     video.setAttribute('webkit-playsinline', 'true');

// }

function hideError () {
  console.log("hideerror")
  const error = document.getElementById('give_error_error');
  const patt = /^You are missing the donation id to view this donation receipt.$/
  if (error != null){
    if (error.innerText.match(patt)) {
      error.style.display = "none";
      console.log("called")
    }
  }
}

onLoadListener = function () {
    addDonate();
    modal();
    
}
player.onLoad(onLoadListener);

function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
} 

docReady(function() {
  // DOM is loaded and ready for manipulation here
  hideError()
});

function fullscreen() {
  var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null);
  console.log(isInFullScreen)
  if (isInFullScreen) {
      if (document.exitFullscreen) {
          document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
      }
  }
}

// # Modal stuff:
function modal(){
  const openEls = document.querySelectorAll("[data-open]");
  const closeEls = document.querySelectorAll("[data-close]");
  const isVisible = "is-visible";

  for (const el of openEls) {
    el.addEventListener("click", function() {
      const modalId = this.dataset.open;
      fullscreen();
      document.getElementById(modalId).classList.add(isVisible);
    });
  }

  for (const el of closeEls) {
    el.addEventListener("click", function() {
      this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    });
  }

  document.addEventListener("click", e => {
    if (e.target == document.querySelector(".modal.is-visible")) {
      document.querySelector(".modal.is-visible").classList.remove(isVisible);
    }
  });

  document.addEventListener("keyup", e => {
    // if we press the ESC
    if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
      document.querySelector(".modal.is-visible").classList.remove(isVisible);
    }
  });
}
