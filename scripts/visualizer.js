export class Visualizer {
  _doc;
  data;
  backUpData;
  animationDelay;
  width;
  sortContainer;

  isStarted;
  isPaused;
  resumeSorting;

  time = 0;

  constructor(document, data) {
    this._doc = document;
    this.backUpData = JSON.parse(JSON.stringify(data));
    this.data = data;
    this.animationDelay = 6;
    this.sortContainer = document.querySelector(".sort-container");
    this.setUpDataNodes(data);
  }

  async play(sortingAlgorithm, onSortCompletion) {
    const a = new sortingAlgorithm(this.data, this);
    await a.sort();
    onSortCompletion();
  }

  async pause() {
    this.isPaused = true;
    return new Promise((res, rej) => {
      this.resumeSorting = res;
    });
  }

  resume() {
    this.resumeSorting();
    this.isPaused = false;
    this.resumeSorting = null;
  }

  initiateReset() {
    this.resetInitiated = true;
    if (this.isPaused) {
      this.resume();
    }
  }

  reset() {
    this.data = JSON.parse(JSON.stringify(this.backUpData));
    this.setUpDataNodes(this.data);
    this.resetInitiated = false;
  }

  shuffleData() {
    this.data = this.data.sort((a, b) => Math.random() - Math.random());
    this.setUpDataNodes(this.data);
  }

  setUpDataNodes(data) {
    this.sortContainer.innerHTML = "";
    this.width = (this.sortContainer.getBoundingClientRect().width - 20) / data.length;
    data.forEach((d, index) => {
      let dataPoint = document.createElement("div");
      dataPoint.id = index;
      dataPoint.style.height = `${d}%`;
      dataPoint.style.width = `2%`;
      dataPoint.style.backgroundColor = `black`;
      dataPoint.className = "data-point";
      this.sortContainer.appendChild(dataPoint);
    });
  }

  async delay(millisecs) {
    if (this.isPaused) {
      await this.pause();
    }

    await new Promise((resolve, reject) => {
      setTimeout(() => resolve(), millisecs);
    });
  }

  setColor(id, color) {
    const node = this._doc.getElementById(id);
    if (node) {
      node.style.backgroundColor = color;
    }
  }

  async setValue(pos, value) {
    await this.delay(25 * this.animationDelay);
    const dataPoint1 = document.getElementById(pos);
    dataPoint1.style.height = `${value}%`;
  }

  async swapDataPoints(i, j) {
    const dataPoint1 = this._doc.getElementById(i);
    const dataPoint2 = this._doc.getElementById(j);

    await this.delay(25 * this.animationDelay);

    //calulating dist between the two and shifting their positions
    const relativeDistance = dataPoint2.offsetLeft - dataPoint1.offsetLeft;
    dataPoint1.style.transform = `translateX(${relativeDistance}px)`;
    dataPoint2.style.transform = `translateX(-${relativeDistance}px)`;
    await this.delay(25 * this.animationDelay);
    //swapping the actual data in nodes
    this.swapNodes(dataPoint1, dataPoint2);
    //removing transform property
    dataPoint2.style.transform = dataPoint1.style.transform = ``;
    await this.delay(25 * this.animationDelay);
  }

  swapNodes(d1, d2) {
    const n1 = this._doc.getElementById(+d1.id + 1);
    const n2 = this._doc.getElementById(+d2.id + 1);
    this.sortContainer.insertBefore(d2, n1);
    this.sortContainer.insertBefore(d1, n2);
    const t = d1.id;
    d1.id = d2.id;
    d2.id = t;
  }

  swapColor(node1, node2) {
    const c1 = node1.style.backgroundColor;
    const c2 = node2.style.backgroundColor;
    setColor(node1.id, c2);
    setColor(node2.id, c1);
  }
}
