export default class Mouse{
    constructor(view){
        this.view = view;
        this.canvas = view.canvas;
        this.x = 0;
        this.y = 0;
        this.down = false;
        this.init();
    }
    init(){
        this.canvas.addEventListener('mousemove', (e)=>{
            e.preventDefault();
            this.x = e.clientX
            this.y = e.clientY
        });
        this.canvas.addEventListener('mousedown', (e)=>{
            e.preventDefault();
            console.log(this.view.assetArray.length)
            if(e.which === 1){
                this.down = true;
            }
            if(e.which === 3){
                this.reset = true;
            } 
        });
        this.canvas.addEventListener('mouseup', (e)=>{
            e.preventDefault();
            if(e.which === 1){
                this.down = false;
            }
            if(e.which === 3){
                this.reset = false;
            }
        });
    }
}