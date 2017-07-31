
const path = require('path');

const options = [
  {
    title: 'Basic Notification',
    body: 'Short message part',
  },
  {
    title: 'Content-Image Notification',
    body: 'Short message plus a custom content image',
    icon: path.join(__dirname, 'icon.png'),
  },
];

function doNotify(evt) {
/* eslint-disable no-new */
  if (evt.srcElement.id === 'basic') {
    new Notification(options[0].title, options[0]);
  } else if (evt.srcElement.id === 'image') {
    new Notification(options[1].title, options[1]);
  }
}

// HELPER FUNCTIONS ============================================
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('basic').addEventListener('click', doNotify);
  document.getElementById('image').addEventListener('click', doNotify);
});

let bigTime = 1499; // time in seconds
let mode = 'normal';


let mins;
let secs;

let countdownID;

// get all the elements
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const message = document.getElementById('message');


// register the buttons
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');


// COUNTER ========================================================
function counter() {
  // calculate the minutes and seconds from bigTime
  mins = Math.floor(bigTime / 60);
  secs = bigTime - (mins * 60);

  // change the HTML to show new minutes and seconds
  minutes.innerHTML = (mins < 10 ? '0' : '') + mins;
  seconds.innerHTML = (secs < 10 ? '0' : '') + secs;

  // handle the animations
  // const divisor = 300;

  // const percent = secs / divisor;
  // const resut - divisor - 100;

  // change the message at 00
  if (secs === 0) {
    message.innerHTML = 'change out the messages';
  }

  // switch modes if timer ends
  if (bigTime === 0) {
    const notification = new Notification('Notification title', {
      icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
      body: 'Hey there! You\'ve been notified!',
    });

    notification.onclick = () => {
      window.open('http://stackoverflow.com/a/13328397/1269037');
    };

    if (mode === 'normal') {
      // cooldown is 5min
      mode = 'cooldown';
      bigTime = 300;
    } else if (mode === 'cooldown') {
      // switch back to normal 25min mode
      mode = 'normal';
      bigTime = 1499;

      minutes.innerHTML = '25';
      seconds.innerHTML = '00';

      /* eslint-env es6 */
      document.body.style.background = '# + $(color)';

      // show start button
      start.style.display = 'block';
      stop.style.display = 'none';
      reset.style.display = 'none';

      // stop timer
      clearInterval(countdownID);
    }
  } else {
    // decrement
    bigTime -= 1;
  }
}

// ACTIONS =======================================================
// start timer
function startTimer() {
  // start timer
  // var OneSecond=1000;
  const OneSecond = 1;
  countdownID = setInterval(counter, OneSecond);

  // show message
  message.innerHTML = 'slow and steady wins something';

  // show stop button
  start.style.display = 'none';
  stop.style.display = 'block';
  reset.style.display = 'none';
}

// stop timer
function stopTimer() {
  // change message
  message.innerHTML = 'why are you such a quitter';

  // stop timer
  clearInterval(countdownID);

  // show reset button
  start.style.display = 'none';
  stop.style.display = 'none';
  reset.style.display = 'block';
}

// reset timer
function resetTimer() {
  // reset big time
  bigTime = 1499;

  // change message
  message.innerHTML = 'keep up the good work';

  // show start button
  start.style.display = 'block';
  stop.style.display = 'none';
  reset.style.display = 'none';
}
start.addEventListener('click', startTimer, false);

stop.addEventListener('click', stopTimer, false);

reset.addEventListener('click', resetTimer, false);
