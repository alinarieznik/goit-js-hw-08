import Player from '@vimeo/player';
console.log(Player);

import throttle from 'lodash.throttle';
console.log(throttle);

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(e) {
  localStorage.setItem(STORAGE_KEY, e.seconds);
}

player.setCurrentTime(JSON.parse(localStorage.getItem(STORAGE_KEY)));
