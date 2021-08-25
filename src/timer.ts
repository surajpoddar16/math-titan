export class Timer {
  progress = 0;
  intervalInstance: any;
  timeoutInstance: any;

  constructor(
    public duration = 1000,
    public progressInterval = 100,
    public timerEndListener: () => void,
    public timerProgressListener: (progress: number) => void,
  ) {
  }

  startTimer() {
    this.resetTimer();

    this.intervalInstance = setInterval(() => {
      this.setProgress(this.progress + this.progressInterval / this.duration);
    }, this.progressInterval);

    this.timeoutInstance = setTimeout(() => {
      clearInterval(this.intervalInstance);
      this.onTimerEnd();
    }, this.duration);
  }

  resetTimer() {
    if (this.intervalInstance) {
      clearInterval(this.intervalInstance);
    }

    if (this.timeoutInstance) {
      clearTimeout(this.timeoutInstance);
    }

    this.setProgress(0);
  }

  endTimer() {
    this.resetTimer();
    this.setProgress(1);
  }

  setProgress(progress: number) {
    this.progress = progress;
    this.timerProgressListener(progress);
  }

  onTimerEnd() {
    this.timerEndListener();
  }
}
