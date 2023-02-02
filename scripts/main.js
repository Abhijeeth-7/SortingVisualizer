const sortContainer = document.querySelector('.container');
let data = [];
for (let i=500; i>=5; i=i-5){
    data.push(i);
}
data.sort((a, b) => 0.5 - Math.random());
const width = (window.screen.width-200)/data.length 
data.forEach((d, index) => {
    let dataPoint = document.createElement('div');
    dataPoint.id = index;
    dataPoint.style.height = `${d}px`;
    dataPoint.style.width = `${width-0.2}px`;
    dataPoint.style.backgroundColor = `black`;
    dataPoint.className = 'data-point';
    sortContainer.appendChild(dataPoint);
});

document.getElementById("sort-button").addEventListener('click', () => mergeSortAlgo());

//helper methods
async function swap(i, j){
    await delay(1);
    swapDataPoints(i, j);
    data[i] = data[i] + data[j];
    data[j] = data[i] - data[j];
    data[i] = data[i] - data[j];
}

async function swapDataPoints(i, j){
    const dataPoint1 = document.getElementById(i);
    const dataPoint2 = document.getElementById(j);
    dataPoint1.style.height = `${data[j]}px`;
    dataPoint2.style.height = `${data[i]}px`;
}


function setColor(pos, color){
    if (pos < data.length){
        document.getElementById(pos).style.backgroundColor = color;
    }
}

async function delay(millisecs){
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), millisecs);
    });
}

//sorting functions
async function bubbleSort(data){
    for (let i = 0; i < data.length-1; i++){
        for (let j = 0; j < data.length-1-i; j++){
            setColor(j, 'white');
            if (data[j] > data[j+1]){
                setColor(j,'yellow');
                setColor(j+1,'brown');
                await swap(j, j+1);
                setColor(j,'brown');
                setColor(j+1,'yellow');
                await delay(50);
                setColor(j, 'white')
                setColor(j+1, 'white')
            }
        }
        setColor(data.length-1-i, 'green');

        for (let j = 0; j < data.length-1-i; j++){
            setColor(j, 'black');
        }
    }
}

async function selelctionSort(data){
    for (let i = 0; i < data.length; i++){
        let minLoc = i;
        for (let j = i; j < data.length; j++){
            await delay(20);
            setColor(j, 'white');
            if (data[j] < data[minLoc]){
                setColor(minLoc, 'white');
                setColor(j, 'yellow');
                minLoc = j;
            }
        }

        if (i != minLoc){
            await swap(i, minLoc);
            setColor(i, 'green');
            await delay(200);
        } else{
            setColor(i, 'green');
        }

        for (let k=i+1;k<data.length;k++){
            setColor(k, 'black');
        }
    }
}

async function insertionSort(){
    for(let i=0; i<data.length; i++){
        setColor(i, 'green');
        for(let j=i+1; j>=0; j--){
            if (data[j] < data[j-1]){
                setColor(j, 'yellow');
                await swap(j,j-1);
                setColor(j-1, 'yellow');
                setColor(j, 'green');
                await delay(50)
                setColor(j-1, 'green');
            } else{
                break
            }
        }
    }
}

async function heapSort(){
    for (let i=0; i<data.length-1; i++){
        for (let j=data.length-1-i; j>=0; j--){
            const parent = j;
            const left = 2*j+1;
            const right = left+1;
            await delay(1);
            if (right < data.length-i){
                setColor(right, 'white');
                setColor(left, 'white');
    
                if (data[left] > data[parent]){
                    await swap(left, parent);
                }
                if (data[right] > data[parent]){
                    await swap(right, parent);
                }
            } else if (left < data.length-i){
                setColor(left, 'white');

                if (data[left] > data[parent]){
                    await swap(left, parent);
                }
            }
            
            setColor(parent, 'white');
        }
        
        // setColor(0, 'yellow');
        // setColor(data.length-1-i, 'yellow');
        // await delay(200);
        await swap(0, data.length-1-i);
        // await delay(200);
        setColor(data.length-1-i, 'green');
        
        for (let j=data.length-2-i; j>=0; j--){
            setColor(j, 'black');
        }
    }
}

async function mergeSortAlgo(){
    mergeSort(data, 0, data.length-1);
}

async function mergeSort(data, i, j){
    if (i >= j){
        return 
    }
    let mid = Math.floor((i+j)/2);
    await mergeSort(data, i, mid);
    await mergeSort(data, mid+1, j);
    await merge(data, i, mid, j);
}

async function merge(data, start, mid, end){
    // setColor(start, 'yellow')
    // setColor(mid, 'brown')
    // setColor(end, 'yellow')
    let result = [];
    let p1 = start;
    let p2 = mid+1;
    while (p1 <= mid && p2 <= end){
        await delay(1);
        if (data[p1] <= data[p2]){
            result.push(data[p1]);
            setColor(p1, 'white');
            p1++;
        } else{
            result.push(data[p2]);
            setColor(p2, 'white');
            p2++;
        }
    }
    while (p1 <= mid){
        await delay(1);
        result.push(data[p1]);
        setColor(p1, 'white');
        p1++;
    }
    while (p2 <= end){
        await delay(1);
        result.push(data[p2]);
        setColor(p2, 'white');
        p2++;
    }

    for (let i=start; i<=end; i++){
        let value = result.shift();
        await delay(100);
        await setValue(i, value);
        data[i] = value;
        setColor(i, 'green');
    }
    
}

async function setValue(pos, value){    
    const dataPoint1 = document.getElementById(pos);
    dataPoint1.style.height = `${value}px`;
}

async function quickSortAlog(){
    quickSort(0, start, end);
}

async function quickSort(pivot, start, end){
    if (i>=j){
        return 
    } 
    await quickSort(privot, start, end);
}

async function sortPivot(pivot, start, end){
    while (start < end){
        if (data[start] > pivot){
            await swap(start, end);
            end--;
        } else if (data[end] < pivot){
            await swap(start, end);
            start++;
        }
    }
    return pivot;
}