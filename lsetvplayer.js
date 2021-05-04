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
modal();

var Button = videojs.getComponent('Button');
var donateButton = videojs.extend(Button, {
  constructor: function() {
    Button.apply(this, arguments);
    this.addClass('special');
    this.addClass('wp-block-button__link');
    this.setAttribute('data-open','modal1');
    this.setAttribute("onclick", 'modal()');
    this.el().innerHTML = "Donate";
    
  },
  handleClick: function() {
    //modal();
  },

});
videojs.registerComponent('donateButton', donateButton);
  
var options = {
  control: true,
  liveui: true,
  fill: true,
  preload: 'auto',
  poster: 'https://www-hki-org-develop.go-vip.net/wp-content/uploads/2021/05/01-PreShow_ForCounter_Still2021_web.jpg',
  sources: [{
    src: 'https://cdn3.wowza.com/1/bHN2L0hwWjlpRGd0/VzcvaWhN/hls/live/playlist.m3u8',
    type: 'application/x-mpegURL'
  }],
  bigPlayButton: true,
  html5: {
    vhs: {
      overrideNative: true
    },

  },
  nativeAudioTracks: false,
  nativeVideoTracks: false,
  nativeTextTracks: false
};

var player = videojs('wowza_player_2021', options, function onPlayerReady() {
  videojs.log('Your player is ready!');
  modal();
  // In this context, `this` is the player that was created by Video.js.  

  // How about an event listener?
  this.on('ended', function() {
  });
});
player.addChild('donateButton', {}); 

// var tracks = player.textTracks().textTrackSettings.setValues({
//   backgroundColor: "#FF0",
//   color: "#00F",
//   fontFamily: "monospaceSansSerif",
//   fontPercent: 1.5,
//   windowColor: "#0FF",
//   windowOpacity: "0.5"
// });


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



// document.addEventListener("DOMContentLoaded", function(){
//   modal();

// });
