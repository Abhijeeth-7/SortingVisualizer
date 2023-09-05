export class MergeSort {
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
    await this.mergeSort(this.data, 0, this.data.length - 1);
    if (this.visualizer.resetInitiated) {
      this.visualizer.reset();
      return;
    }
  }

  async mergeSort(data, i, j) {
    if (this.resetInitiated) return;
    if (i >= j) {
      return;
    }
    let mid = Math.floor((i + j) / 2);
    await this.mergeSort(data, i, mid);
    await this.mergeSort(data, mid + 1, j);
    await this.merge(data, i, mid, j);
  }

  async merge(data, start, mid, end) {
    let result = [];
    let p1 = start;
    let p2 = mid + 1;
    if (this.visualizer.resetInitiated) return;
    while (p1 <= mid && p2 <= end) {
      if (data[p1] <= data[p2]) {
        result.push(data[p1]);
        this.visualizer.setColor(p1, "white");
        p1++;
      } else {
        result.push(data[p2]);
        this.visualizer.setColor(p2, "white");
        p2++;
      }
    }
    while (p1 <= mid) {
      result.push(data[p1]);
      this.visualizer.setColor(p1, "white");
      p1++;
    }
    while (p2 <= end) {
      result.push(data[p2]);
      this.visualizer.setColor(p2, "white");
      p2++;
    }

    for (let i = start; i <= end; i++) {
      let value = result.shift();
      await this.visualizer.setValue(i, value);
      data[i] = value;
      this.visualizer.setColor(i, "green");
    }
  }
}
