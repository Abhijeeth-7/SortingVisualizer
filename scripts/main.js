import { BubbleSort } from "./bubbleSort.js";
import { HeapSort } from "./heap.Sort.js";
import { InsertionSort } from "./insertionSort.js";
import { MergeSort } from "./mergeSort.js";
import { QuickSort } from "./quickSort.js";
import { SelelctionSort } from "./selectionSort.js";
import { Visualizer } from "./visualizer.js";

class Console {
  data;
  visualizer;

  constructor() {
    this.data = this.getData();
    this.visualizer = new Visualizer(document, this.data);
    this.setUpSortingControls();
    this.setUpAnimationControl();
    this.setUpThemeToggler();
  }

  getData() {
    const data = [];
    for (let i = 99; i > 0; i -= 2) {
      data.push(i);
    }
    return data;
  }

  setUpSortingControls() {
    document.querySelector("#shuffle").addEventListener("click", this.shuffle.bind(this));
    document.querySelector("#play").addEventListener("click", this.play.bind(this));
    document.querySelector("#pause").addEventListener("click", this.pause.bind(this));
    document.querySelector("#reset").addEventListener("click", this.reset.bind(this));
  }

  setUpAnimationControl() {
    document.querySelector("#animationDelayValue").innerHTML = ` ${150} ms`;
    document.querySelector("#animationDelayRange").value = 6;
    document.querySelector("#animationDelayRange").addEventListener("change", (event) => {
      console.log(event);
      this.visualizer.animationDelay = event.target.value;
      document.querySelector("#animationDelayValue").innerHTML = ` ${this.visualizer.animationDelay * 25} ms`;
    });
  }

  setUpThemeToggler() {
    document.querySelector("#theme-toggler").addEventListener("change", (event) => {
      document.querySelector("body").classList.toggle("light-theme");
      document.querySelector("body").classList.toggle("dark-theme");
      document.querySelector("#theme-name").innerHTML = `${event.target.checked ? "Dark" : "Light"} Mode`;
    });
  }

  async startSorting() {
    const selectedSort = this.getSelectedSort();
    await this.visualizer.play(selectedSort);
  }

  getSelectedSort() {
    let selectedSort = null;
    const sortSelector = document.querySelector("#sort-selector");
    switch (+sortSelector.value) {
      case 1:
        selectedSort = BubbleSort;
        break;
      case 2:
        selectedSort = InsertionSort;
        break;
      case 3:
        selectedSort = SelelctionSort;
        break;
      case 4:
        selectedSort = HeapSort;
        break;
      case 5:
        selectedSort = MergeSort;
        break;
      case 6:
        selectedSort = QuickSort;
        break;
    }
    return selectedSort;
  }

  shuffle() {
    this.visualizer.shuffleData();
  }

  play() {
    document.querySelector("#play").style.display = "none";
    document.querySelector("#pause").style.display = "inline-block";
    document.querySelector("#shuffle").style.display = "none";

    if (this.visualizer.isPaused) {
      this.visualizer.resume();
    } else {
      this.startSorting();
    }
  }

  pause() {
    document.querySelector("#play").style.display = "inline-block";
    document.querySelector("#pause").style.display = "none";
    document.querySelector("#reset").style.display = "inline-block";
    this.visualizer.pause();
  }

  reset() {
    this.visualizer.initiateReset();
    document.querySelector("#shuffle").style.display = "inline-block";
    document.querySelector("#play").style.display = "inline-block";
    document.querySelector("#pause").style.display = "none";
  }
}

const sortConsole = new Console();
