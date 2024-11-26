import { Content } from "./Content";
import { X_MENU_START, Y_MENU_START, ICON_HEIGHT, ICON_PADDING, ICON_WIDTH, WIDTH, H1, H2, playSound,KEY_HOLD_DELAY, shadow, glow } from "./utils";

export class Folder extends Content{
    constructor(folder_icon,folder_name, contents : [Content]){
        super();
        this.folder_name = folder_name;
        this.contents = contents;
        this.icon = folder_icon
        
        this.folder_open = false;
        this.selected = 0;
        this.verticalOffset = 0; // Deslocamento global vertical
        this.targetVerticalOffset = 0; // Deslocamento alvo vertical
        this.keyHoldDelay = KEY_HOLD_DELAY; // Milissegundos entre cada movimento
        this.lastKeyPressTime = 0; // Para controlar o delay inicial do movimento

    }

    keyPressed(event){
        if (!this.folder_open && event.key === 'Enter') {
            console.log("Abrir Folder..")
            if(this.contents.length > 0){
                this.folder_open = true;
                playSound();
            }
        }
        else if(!this.focus && this.folder_open && (event.key === 'Escape' || event.key == 'ArrowLeft')){
            console.log("Fechar Folder..")
            this.folder_open = false;
            this.focus = false;
            playSound();
        }
        else if(this.folder_open){
            if(this.contents.length > 0){
                this.focus = this.contents[this.selected].keyPressed(event);
            }
        }
        return this.folder_open;
    }

    drawText(p5,x,y){
        p5.fill(255); // Cor do texto
        p5.textAlign(p5.LEFT, p5.CENTER);
        p5.textSize(H1);
        p5.text(this.folder_name, x + ICON_WIDTH + ICON_PADDING/2, y + ICON_HEIGHT/4);
        p5.stroke("white");
        p5.strokeWeight(0.5);
        p5.line(x + ICON_WIDTH + ICON_PADDING/2,y + ICON_HEIGHT/4+ ICON_PADDING/4,WIDTH-ICON_PADDING/2,y + ICON_HEIGHT/4+ ICON_PADDING/4)
        p5.noStroke();
        p5.textSize(H2);
        p5.text(`${this.contents.length} Files`, x + ICON_WIDTH + ICON_PADDING/2, y + 3*ICON_HEIGHT/4);
    }

    draw(p5,x,y,selected){
        this.controlGlow();
        
        p5.push();
        shadow(p5);
        p5.image(this.icon, x, y, ICON_WIDTH, ICON_HEIGHT);

        if(selected){
            glow(p5,this.glow_opacity);
            p5.image(this.icon, x, y, ICON_WIDTH, ICON_HEIGHT);
            if(!this.folder_open){
                shadow(p5);
                this.drawText(p5,x,y);
                glow(p5,this.glow_opacity);
                this.drawText(p5,x,y);
            }
            else{
                p5.noStroke();
                p5.fill(255); // Cor do texto
                p5.triangle(x + ICON_WIDTH + ICON_PADDING/2,y + ICON_HEIGHT/2,x + ICON_WIDTH + 2*ICON_PADDING/3, y + ICON_HEIGHT/2 + ICON_PADDING/4,x + ICON_WIDTH + 2*ICON_PADDING/3, y + ICON_HEIGHT/2 - ICON_PADDING/4)
                
                // Lerp para animação vertical
                this.verticalOffset += (this.targetVerticalOffset - this.verticalOffset) * 0.1;
                
                // Desenhar sub-menu
                for (let i = 0; i < this.contents.length; i++) {              
                    // Calcular deslocamento vertical
                    let content_y = Y_MENU_START + (ICON_HEIGHT + ICON_PADDING) * (i + 1) + this.verticalOffset;
                    let content_x = x + (ICON_WIDTH + ICON_PADDING);

                    this.contents[i].draw(p5,content_x,content_y,this.selected === i);
                }

                // Controle do movimento contínuo
                if(!this.focus){
                    if (p5.millis() - this.lastKeyPressTime > this.keyHoldDelay) {
                        if (p5.keyIsDown(p5.DOWN_ARROW) && this.selected < this.contents.length - 1) {
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
            }
        }


        p5.pop();
    }
}