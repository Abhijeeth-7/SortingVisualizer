export class visualizer{

    constructor(){

    }

    setColor(pos, color){
        document.getElementById(pos).style.backgroundColor = color;
    }

    clear(){
        document.querySelectorAll('.data-point').forEach(node => {
            node.style.backgroundColor = node.style.backgroundColor === 'green' ? 'green' : '';
        });
    }
}