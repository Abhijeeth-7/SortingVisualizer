export class BubbleSort {
  data;

  constructor(data, visualizer) {
    this.visualizer = visualizer;
    this.data = data;
  }

  async swap(id1, id2) {
    await this.visualizer.swapDataPoints(id1, id2);
    const temp = this.data[id1];
    this.data[id1] = this.data[id2];
    this.data[id2] = temp;
  }

  async sort() {
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data.length - 1 - i; j++) {
        if (this.visualizer.resetInitiated) {
          this.visualizer.reset();
          return;
        }

        await this.visualizer.delay(20);
        this.visualizer.setColor(j, "white");

        if (this.data[j] > this.data[j + 1]) {
          this.visualizer.setColor(j, "yellow");
          this.visualizer.setColor(j + 1, "orange");
          await this.swap(j, j + 1);
          this.visualizer.setColor(j, "white");
          this.visualizer.setColor(j + 1, "white");
        }
      }
      this.visualizer.setColor(this.data.length - 1 - i, "green");

      for (let j = 0; j < this.data.length - 1 - i; j++) {
        this.visualizer.setColor(j, "black");
      }
    }
  }
}
