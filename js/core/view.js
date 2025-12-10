

export default class View {
    constructor(model, container) {
        this.model = model;
        this.container = container;

        this.canvas = this.createCanvas();

        this.assetArray = new Array();
    }

    createCanvas(){
        let temp = document.createElement("div")

        temp.style.width = this.container.clientWidth + 'px';
        temp.style.height = this.container.clientHeight +'px';
        temp.style.display = "block";

        this.container.append(temp)
        return temp;
    }

    setMotion(x,y){
        this.assetArray.forEach(tile =>{
            if(Math.floor(Math.random() * 2) == 1){
                tile.motionControl(x,y)
            }
        })
    }

    clear(){
        while(this.canvas.firstChild){
            this.canvas.removeChild(this.canvas.firstChild)
        }
        this.assetArray = [];
    }

    update() {
    }
  }