import { Content } from "./Content";
import { ICON_HEIGHT, ICON_PADDING, WIDTH, H1, shadow, glow, PROJECT_WIDTH } from "./utils";

export class Game extends Content{
    constructor(p5,gameName, title, info){
        super();
        this.title = title;
        this.info = info;
        this.gameName = gameName;

        const iconPath = `/assets/games/${gameName}.png`;
        this.icon = p5.loadImage(
            iconPath,
            () => console.log(`Carregado: ${iconPath}`),
            () => console.log(`Erro ao carregar: ${iconPath}`)
        );
    }

    

    keyPressed(event){
        if(event.key === 'Enter'){
            // Abrir o projeto em uma nova aba
            const markdownUrl = `/#/games/${this.gameName}`; // URL da página Markdown
            window.open(markdownUrl, '_blank'); // Abre em uma nova aba
        }
        return false;
    }

    drawText(p5,x,y){
        p5.fill(255); // Cor do texto
        p5.textAlign(p5.LEFT, p5.CENTER);
        p5.textSize(H1);
        p5.text(this.title, x + PROJECT_WIDTH + ICON_PADDING/2, y + ICON_HEIGHT/2);
        p5.stroke("white");
        p5.strokeWeight(0.5);
        p5.line(x + PROJECT_WIDTH + ICON_PADDING/2,y + ICON_HEIGHT/2+ ICON_PADDING/4,WIDTH-ICON_PADDING/2,y + ICON_HEIGHT/2+ ICON_PADDING/4)
    }

    draw(p5,x,y,selected){
        this.controlGlow();

        p5.push();
        p5.fill(255,0,0);
        shadow(p5,p5.color('black'),10);
        p5.image(this.icon,x,y,PROJECT_WIDTH,ICON_HEIGHT);
        

        if(selected){
            glow(p5,this.glow_opacity);
            p5.image(this.icon,x,y,PROJECT_WIDTH,ICON_HEIGHT);
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