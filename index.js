class MicrowaveMaker {
  constructor() {
    this.running = false;
    this.timeRemaining = 0;
    this.paused = false;
    this.power = 10;
    this.interval = null;
  }

  addTime(seconds, minutes = 0) {
    // TODO: handle minutes
    // if no minutes provided, add seconds to timeremaining
    if (!minutes) {
      this.timeRemaining += seconds;
      console.log('Time remaining: ' + this.timeRemaining);
    }
  }
  
  reducePower() {
    if (this.power === 1) {
      this.power = 10;
    } else {
      --this.power;
    }
  }

  startPressed() {
    console.log(`Start pressed! Time remaining: ${this.timeRemaining}`);
    // if not running and not paused set running to true and run startTime
    if (!this.running && !this.paused) {
      this.running = true;
      return this.startTimer()
    }
    // if running and paused, set paused to false
    if (this.running && this.paused) {
      this.paused = false; 
      return this.startTimer();
    }
  }

  incrementTimeRemaining() {
    if (!this.timeRemaining) {
      console.log("Timer's up!");
      clearInterval(this.interval);
      this.stopTimer()
    } else {
      console.log('Seconds remaining: ' + --this.timeRemaining);
      // this.timeRemaining -= 1;
    }
  }

  startTimer() {
    // set running to true
    this.running = true;
    // start reducing timeRemaining
    const that = this;
    this.interval = setInterval(this.incrementTimeRemaining.bind(this), 1000);
  }

  stopTimer() {
    console.log('Stop pressed!');
    // if time is 0 - being called from incrementTimeRemaining
    if (!this.timeRemaining) {
      // reset to default values;
      console.log('Timer stopped from stopTimer')
      return this.reset();
    }
    // if paused then reset
    if (this.paused) {
      console.log('Paused and Cancelled')
      return this.reset()
    }
  }
  
  reset() {
    console.log('Reset!')
    this.running = false;
    this.paused = false;
    this.timeRemaining = 0;
    this.power = 10;
  }
}

const microwave = new MicrowaveMaker();
