export class HeapSort {
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
    if (id2 == 16) debugger;
    const temp = this.data[id1];
    this.data[id1] = this.data[id2];
    this.data[id2] = temp;
  }

  async sort() {
    for (let i = 0; i < this.data.length; i++) {
      for (let j = this.data.length - 1 - i; j >= 0; j--) {
        if (this.visualizer.resetInitiated) {
          this.visualizer.reset();
          return;
        }

        const parent = j;
        const left = 2 * j + 1;
        const right = left + 1;
        this.visualizer.setColor(parent, "red");

        this.visualizer.delay(500);

        if (right <= this.data.length - 1 - i) {
          this.visualizer.setColor(right, "yellow");
        }
        if (left <= this.data.length - 1 - i) {
          this.visualizer.setColor(left, "blue");
        }

        if (right <= this.data.length - 1 - i) {
          const maxChild = this.data[left] > this.data[right] ? left : right;
          if (this.data[maxChild] > this.data[parent]) {
            await this.swap(parent, maxChild);
          }
        } else if (left <= this.data.length - 1 - i) {
          if (this.data[left] > this.data[parent]) {
            await this.swap(parent, left);
          }
        }

        this.visualizer.setColor(parent, "white");
        if (right <= this.data.length - 1 - i) {
          this.visualizer.setColor(right, "white");
        }
        if (left <= this.data.length - 1 - i) {
          this.visualizer.setColor(left, "white");
        }

        this.visualizer.delay(250);
      }

      await this.swap(0, this.data.length - 1 - i);
      await this.visualizer.delay(200);
      this.visualizer.setColor(this.data.length - 1 - i, "green");
      await this.visualizer.delay(200);

      for (let j = this.data.length - 2 - i; j >= 0; j--) {
        this.visualizer.setColor(j, "black");
      }
    }
  }
}
