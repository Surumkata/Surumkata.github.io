import { MainOption } from "./MainOption";
import { X_MENU_START, Y_MENU_START, ICON_HEIGHT, ICON_PADDING, ICON_WIDTH, playSound, KEY_HOLD_DELAY } from "./utils";

export class Menu{
    constructor(main_options : [MainOption]){
        this.main_options = main_options;
        this.selected = 0;


        this.offset = 0; // Deslocamento global horizontal
        this.targetOffset = 0; // Deslocamento alvo horizontal
        this.verticalOffset = 0; // Deslocamento global vertical
        this.targetVerticalOffset = 0; // Deslocamento alvo vertical
        this.keyHoldDelay = KEY_HOLD_DELAY; // Milissegundos entre cada movimento
        this.lastKeyPressTime = 0; // Para controlar o delay inicial do movimento

        this.focus = false;
        this.blockInputs = false;
        
    }

    keyPressed(event){
        const focus = this.main_options[this.selected].keyPressed(event);
        if (focus != this.focus){
            console.log("focus diferentes")
            this.focus = focus;
            this.blockInputs = true;
            if(this.focus){
                this.targetOffset -= ICON_WIDTH + ICON_PADDING;
            }
            else{
                this.targetOffset += ICON_WIDTH + ICON_PADDING;
            }
        }
    }

    draw(p5){
        // Lerp para animação horizontal
        this.offset += (this.targetOffset - this.offset) * 0.1;

        // Desenhar o menu principal
        for (let i = 0; i < this.main_options.length; i++) {
            let x = X_MENU_START + (ICON_WIDTH + ICON_PADDING) * i + this.offset;
            let y = Y_MENU_START;
            if(!this.focus || i===this.selected){
                this.main_options[i].draw(p5,x,y,i===this.selected);
            }
        }


        // Controle do movimento contínuo
        if(!this.focus && !this.blockInputs){
            if (p5.millis() - this.lastKeyPressTime > this.keyHoldDelay) {
                if (p5.keyIsDown(p5.RIGHT_ARROW) && this.selected < this.main_options.length - 1) {
                    this.selected += 1;
                    this.targetOffset -= ICON_WIDTH + ICON_PADDING;
                    this.lastKeyPressTime = p5.millis();
                    playSound();
                } else if (p5.keyIsDown(p5.LEFT_ARROW) && this.selected > 0) {
                    this.selected -= 1;
                    this.targetOffset += ICON_WIDTH + ICON_PADDING;
                    this.lastKeyPressTime = p5.millis();
                    playSound();
                }
            }
        }

        if(this.blockInputs && !p5.keyIsDown(p5.LEFT_ARROW)){
            this.blockInputs = false;
        }



    }
}