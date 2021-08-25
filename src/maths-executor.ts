export class MathsExecutor {
  currentProgress = 0;

  constructor(public currentTarget = 0) {
  }

  setSelectionProgress(numbers: number[]) {
    this.currentProgress = numbers.reduce((acc: number, num: number) => {
      return acc + num;
    }, 0);
  }

  compareSelectionProgress() {
    return this.currentProgress < this.currentTarget ? -1 : (this.currentProgress > this.currentTarget ? 1 : 0);
  }

  getNewRow(itemCount: number) {
    return Array.from(new Array(itemCount).keys()).map(() => {
      return Math.max(Math.floor(Math.random() * 10), 1);
    })
  }

  setNewTarget() {
    this.currentTarget = Math.max(Math.floor(Math.random() * 100 / 3), 1);
    this.currentProgress = 0;
  }
}
