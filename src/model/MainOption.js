import { Y_MENU_START, ICON_HEIGHT, ICON_PADDING, ICON_WIDTH,H1, playSound, KEY_HOLD_DELAY, shadow } from "./utils";

export class MainOption{
    constructor(p5,name_option, sub_options) {
        this.name_option = name_option;
        const iconPath = `surumkata.github.io/assets/icons/${name_option}.png`;
        this.icon = p5.loadImage(
            iconPath,
            () => console.log(`Carregado: ${iconPath}`),
            () => console.log(`Erro ao carregar: ${iconPath}`)
        );
        this.sub_options = sub_options;
        this.selected = 0;

        this.verticalOffset = 0; // Deslocamento global vertical
        this.targetVerticalOffset = 0; // Deslocamento alvo vertical
        this.keyHoldDelay = KEY_HOLD_DELAY; // Milissegundos entre cada movimento
        this.lastKeyPressTime = 0; // Para controlar o delay inicial do movimento
        this.focus = false;
    }

    keyPressed(event){
        if(this.sub_options.length > 0){
            this.focus = this.sub_options[this.selected].keyPressed(event);
        }
        return this.focus;
    }

    draw(p5,x,y,main_selected){
        let scale = 0.9;
        if(main_selected){
            scale=1;
            //Desenhar sub-options

            // Lerp para animação vertical
            this.verticalOffset += (this.targetVerticalOffset - this.verticalOffset) * 0.1;
        
            // Desenhar sub-menu
            for (let i = 0; i < this.sub_options.length; i++) {              
                // Calcular deslocamento vertical
                let sub_option_y = Y_MENU_START + (ICON_HEIGHT + ICON_PADDING) * (i + 1) + this.verticalOffset;
        
                // Saltar espaço se o sub-ícone está "atrás" do selecionado
                if (i < this.selected) {
                    sub_option_y -= ICON_HEIGHT + ICON_PADDING;
                }

                if(!this.focus || i===this.selected){
                    this.sub_options[i].draw(p5,x,sub_option_y,this.selected === i);
                }
            }

            // Controle do movimento contínuo
            if(!this.focus){
                if (p5.millis() - this.lastKeyPressTime > this.keyHoldDelay) {
                    if (p5.keyIsDown(p5.DOWN_ARROW) && this.selected < this.sub_options.length - 1) {
                        this.selected += 1;
                        this.targetVerticalOffset -= ICON_HEIGHT + ICON_PADDING;
                        this.lastKeyPressTime = p5.millis();
                        playSound();
                    } else if (p5.keyIsDown(p5.UP_ARROW) && this.selected > 0) {
                        this.selected -= 1;
                        this.targetVerticalOffset += ICON_HEIGHT + ICON_PADDING;
                        this.lastKeyPressTime = p5.millis();
                        playSound();
                    }
                }
            }

            // Exibir texto abaixo do ícone selecionado
            p5.push();
            p5.fill(255); // Cor do texto
            p5.textAlign(p5.CENTER, p5.TOP);
            p5.textSize(H1);
            shadow(p5);
            p5.text(this.name_option, x + (ICON_WIDTH*scale) / 2, y + (ICON_HEIGHT*scale) + ICON_PADDING / 4);
            p5.pop();
        }

        //Desenhar icon option
        p5.push();
        p5.noStroke();
        
        if(main_selected){
            shadow(p5);
        }
        //p5.fill(255,0,0);
        //p5.rect(x, y, ICON_WIDTH*scale, ICON_HEIGHT*scale);
        p5.image(this.icon, x, y, ICON_WIDTH*scale, ICON_HEIGHT*scale);
        p5.pop();
    }
}