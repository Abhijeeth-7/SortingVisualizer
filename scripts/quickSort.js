export class QuickSort {
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

  async swap(data, id1, id2) {
    await this.visualizer.swapDataPoints(id1, id2);
    const temp = this.data[id1];
    this.data[id1] = this.data[id2];
    this.data[id2] = temp;
  }

  async sort() {
    await this.quickSort(this.data, 0, this.data.length - 1);
    if (this.visualizer.resetInitiated) this.visualizer.reset();
  }

  async quickSort(data, start, end) {
    if (this.visualizer.resetInitiated) return;
    if (start >= end) {
      return;
    }
    let pivot = await this.sortPivot(data, start, end);
    this.visualizer.setColor(pivot, "green");
    await this.quickSort(data, start, pivot - 1);
    await this.quickSort(data, pivot + 1, end);
    for (let i = start; i <= end; i++) {
      this.visualizer.setColor(i, "green");
    }
  }

  async sortPivot(data, p1, p2) {
    let pivot = Math.round((p1 + p2) / 2);
    this.visualizer.setColor(pivot, "yellow");
    this.visualizer.delay(250);
    while (p1 < p2) {
      if (this.visualizer.resetInitiated) return;
      while (data[p1] < data[pivot] || p1 == pivot) {
        p1++;
      }
      while (data[p2] > data[pivot] || p2 == pivot) {
        p2--;
      }
      if (p1 < p2) {
        this.visualizer.setColor(p1, "red");
        this.visualizer.setColor(p2, "blue");
        this.visualizer.delay(250);
        await this.swap(data, p1, p2);
        this.visualizer.delay(250);
        this.visualizer.setColor(p2, "black");
        this.visualizer.setColor(p1, "black");
      }
    }

    let newPivotLoc = pivot;
    if (pivot < p2) {
      newPivotLoc = p2;
    } else if (p1 < pivot) {
      newPivotLoc = p1;
    }

    await this.swap(data, pivot, newPivotLoc);
    return newPivotLoc;
  }
}
