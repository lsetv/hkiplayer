
var Button = videojs.getComponent('Button');
var MyButton = videojs.extend(Button, {
  constructor: function() {
    Button.apply(this, arguments);
    this.addClass('special');
    this.id ='donateBtn';
    this.setAttribute('data-open','modal1');
    this.el().innerHTML = "Donate";
    
  },
  handleClick: function() {
    modal();
  }
});
videojs.registerComponent('MyButton', MyButton);
  
  var options = {
    control: true,
    liveui: true,
    fill: true,
    poster: 'https://www-hki-org-develop.go-vip.net/wp-content/uploads/2021/05/01-PreShow_ForCounter_Still2021_web.jpg',
    sources: [{
      src: 'https://cdn3.wowza.com/1/Mm9NMk9scTVjeHl4/VlNFL1NP/hls/live/playlist.m3u8',
      type: 'application/x-mpegURL'
    }],
    bigPlayButton: true,
    html5: {
      vhs: {
        overrideNative: true
      },
      nativeAudioTracks: false,
      nativeVideoTracks: false
    }
  };

  var player = videojs('wowza_player_2021', options, function onPlayerReady() {
    videojs.log('Your player is ready!');
  
    // In this context, `this` is the player that was created by Video.js.  
  
    // How about an event listener?
    this.on('ended', function() {
    });
  });
  player.addChild('myButton', {}); 

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
modal();

document.addEventListener("DOMContentLoaded", function(){
  var myvideo = document.getElementsByTagName('video');
  console.log(myvideo);
  for (var i = 0, j = myvideo .length; i < j; i++) {
      myvideo[i].textTracks[0].mode = "hidden";
  };

});
