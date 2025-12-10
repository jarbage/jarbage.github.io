import Model from './model.js'
import View from './view.js'
import Controller from './controller.js'

const container = document.getElementById('container');


class Game {
    constructor() {
        this.model = new Model();
        this.view = new View(this.model, container);
        this.controller = new Controller(this, this.model, this.view);
    }

    onTimer() {
      this.model.update();
      this.view.update();
      this.controller.update();

    }
  }

let game = new Game();

let timer = setInterval(function() {
      game.onTimer();
  }, 40);
