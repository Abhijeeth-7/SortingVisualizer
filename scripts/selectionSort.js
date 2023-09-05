export class SelelctionSort {
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
      let minLoc = i;
      for (let j = i; j < this.data.length; j++) {
        if (this.visualizer.resetInitiated) {
          this.visualizer.reset();
          return;
        }
        await this.visualizer.delay(20);
        this.visualizer.setColor(j, "white");
        if (this.data[j] < this.data[minLoc]) {
          this.visualizer.setColor(minLoc, "white");
          this.visualizer.setColor(j, "yellow");
          minLoc = j;
        }
      }

      if (i != minLoc) {
        await this.swap(i, minLoc);
      }
      this.visualizer.setColor(i, "green");

      for (let k = i + 1; k < this.data.length; k++) {
        this.visualizer.setColor(k, "black");
      }
    }
  }
}
