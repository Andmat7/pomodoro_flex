class Pomodoro {
  constructor() {
    this.bigTime = 1499;
    this.mode = 'normal';

    this.minutes = document.getElementById('minutes');
    this.seconds = document.getElementById('seconds');
    this.message = document.getElementById('message');

    this.start = document.getElementById('start');
    this.stop = document.getElementById('stop');
    this.reset = document.getElementById('reset');

    this.start.addEventListener('click', this.startTimer.bind(this), false);
    this.stop.addEventListener('click', this.stopTimer.bind(this), false);
    this.reset.addEventListener('click', this.resetTimer.bind(this), false);
  }

  setTimeHTML() {
  // calculate the minutes and seconds from bigTime
    const mins = Math.floor(this.bigTime / 60);
    const secs = this.bigTime - (mins * 60);

    // change the HTML to show new minutes and seconds
    this.minutes.innerHTML = (mins < 10 ? '0' : '') + mins;
    this.seconds.innerHTML = (secs < 10 ? '0' : '') + secs;
  }

  counter() {
    this.setTimeHTML();
    // switch modes if timer ends
    if (this.bigTime === 0) {
      if (this.mode === 'normal') {
      // cooldown is 5min
        this.mode = 'cooldown';
        this.bigTime = 300;
      } else if (this.mode === 'cooldown') {
      // switch back to normal 25min mode
        this.mode = 'normal';
        this.bigTime = 1499;

        this.minutes.innerHTML = '25';
        this.seconds.innerHTML = '00';

        // show start button
        this.start.style.display = 'block';
        this.stop.style.display = 'none';
        this.reset.style.display = 'none';

        // stop timer
        clearInterval(this.countdownID);
      }
    } else {
    // decrement
      this.bigTime -= 1;
    }
  }

  startTimer() {
    // var OneSecond=1000;
    const OneSecond = 1;
    this.countdownID = setInterval(this.counter.bind(this), OneSecond);

    // show message
    this.message.innerHTML = 'slow and steady wins something';

    // show stop button
    this.start.style.display = 'none';
    this.stop.style.display = 'block';
    this.reset.style.display = 'none';
  }
  resetTimer() {
  // reset big time
    this.setTimeHTML();
    this.bigTime = 1499;
    // change message
    this.message.innerHTML = 'keep up the good work';
    // show start button
    this.start.style.display = 'block';
    this.stop.style.display = 'none';
    this.reset.style.display = 'none';
  }

  stopTimer() {
  // change message
    this.message.innerHTML = 'why are you such a quitter';

    // stop timer
    clearInterval(this.countdownID);
    // show reset button
    this.start.style.display = 'none';
    this.stop.style.display = 'none';
    this.reset.style.display = 'block';
  }
}
module.exports = Pomodoro;
