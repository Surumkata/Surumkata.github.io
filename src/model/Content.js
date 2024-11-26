import { glow, H1, H2, ICON_HEIGHT, ICON_PADDING, ICON_WIDTH, PROJECT_WIDTH, shadow, WIDTH } from "./utils";

export class Content{
    constructor(){
        this.glow_opacity = 127;
        this.glow_opacity_bool = true;
    }

    keyPressed(event){
        return false;
    }

    controlGlow(){
        if(this.folder_open){
            this.glow_opacity=127;
        }
        else{
            if(this.glow_opacity_bool){
                this.glow_opacity+=5;
                if (this.glow_opacity >= 255){
                    this.glow_opacity_bool = false;
                }
            }
            else{
                this.glow_opacity-=5;
                if(this.glow_opacity <= 1){
                    this.glow_opacity_bool = true;
                }
            }
        }
    }

    draw(p5,x,y,selected){
        p5.push();
        p5.fill(255,0,0);
        p5.rect(x,y,ICON_WIDTH,ICON_HEIGHT);
        p5.pop();
    }
}
export class ContentLink extends Content{
    constructor(p5,iconName, title, info, link){
        super();
        this.title = title;
        this.link = link;
        this.info = info;

        const iconPath = `surumkata.github.io/assets/icons/${iconName}.png`;
        this.icon = p5.loadImage(
            iconPath,
            () => console.log(`Carregado: ${iconPath}`),
            () => console.log(`Erro ao carregar: ${iconPath}`)
        );
    }

    

    keyPressed(event){
        if(event.key == 'Enter'){
            window.open(this.link, '_blank'); // Abre em uma nova aba
        }
        return false;
    }

    drawText(p5,x,y){
        p5.fill(255); // Cor do texto
        p5.textAlign(p5.LEFT, p5.CENTER);
        p5.textSize(H1);
        p5.text(this.title, x + ICON_WIDTH + ICON_PADDING/2, y + ICON_HEIGHT/4);
        p5.stroke("white");
        p5.strokeWeight(0.5);
        p5.line(x + ICON_WIDTH + ICON_PADDING/2,y + ICON_HEIGHT/4+ ICON_PADDING/4,WIDTH-ICON_PADDING/2,y + ICON_HEIGHT/4+ ICON_PADDING/4)
        p5.noStroke();
        p5.textSize(H2);
        p5.text(this.info, x + ICON_WIDTH + ICON_PADDING/2, y + 3*ICON_HEIGHT/4);
    }

    draw(p5,x,y,selected){
        this.controlGlow();

        p5.push();
        p5.fill(255,0,0);
        shadow(p5);
        p5.image(this.icon,x,y,ICON_WIDTH,ICON_HEIGHT);
        

        if(selected){
            glow(p5,this.glow_opacity);
            p5.image(this.icon,x,y,ICON_WIDTH,ICON_HEIGHT);
            // Exibir texto abaixo do ícone selecionado
            p5.push();
            shadow(p5);
            this.drawText(p5,x,y);
            glow(p5,this.glow_opacity);
            this.drawText(p5,x,y);
            p5.pop();
        }
        p5.pop();
    }
}