
export default class Controller {
    constructor(view) {
      this.view = view;
      this.model = this.view.model;

      this.ui = document.getElementsByClassName('app_control_buttons')

    }

    handler(id){
      switch (id){
        case 'start':
          this.start();
          break;
        case 'stop':
          this.stop();
          break;
        case 'save':
          this.save();
          break;
        case 'load':
          this.load();
          break;
        case 'unload':
          this.unload();
          break;
      }
    }
    start(){

    }
    stop(){

    }

    save(){

    }

    load(){

    }

    unload(){

    }

    update(){
    }
    
  }

  