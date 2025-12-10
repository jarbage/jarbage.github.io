export default class Mouse{
    constructor(window){
        this.window = window
        this.x = 0;
        this.y = 0;
        this.down = false;
        this.init();
    }
    init(){
        document.addEventListener('mousemove', (e)=>{
            e.preventDefault();
            this.x = e.clientX
            this.y = e.clientY
        });
        document.addEventListener('mousedown', (e)=>{
            e.preventDefault();
            console.log(e)
            if(e.which === 1){
                this.down = true;
            }
            if(e.which === 3){
                this.reset = true;
            } 
        });
        document.addEventListener('mouseup', (e)=>{
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