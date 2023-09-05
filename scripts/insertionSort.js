export class InsertionSort {
  data;
  length;
  isPaused;
  isStopped;

  constructor(data, visualizer) {
    this.visualizer = visualizer;
    this.data = data;
    this.length = data.length;
  }

  togglePause() {
    this.isPaused = !this.isPaused;
  }

  stop() {
    this.isStopped = true;
  }

  async swap(id1, id2) {
    await this.visualizer.swapDataPoints(id1, id2);
    const temp = this.data[id1];
    this.data[id1] = this.data[id2];
    this.data[id2] = temp;
  }

  async sort() {
    for (let i = 0; i < this.data.length; i++) {
      this.visualizer.setColor(i, "green");
      for (let j = i + 1; j >= 0; j--) {
        if (this.visualizer.resetInitiated) {
          this.visualizer.reset();
          return;
        }
        if (this.data[j] < this.data[j - 1]) {
          this.visualizer.setColor(j, "yellow");
          await this.swap(j, j - 1);
          this.visualizer.setColor(j - 1, "green");
        } else {
          break;
        }
      }
    }
  }
}
