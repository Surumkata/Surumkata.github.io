import { Content } from "./Content";
import { ICON_HEIGHT, ICON_PADDING, ICON_WIDTH, WIDTH, PROJECT_WIDTH, H2, H1, shadow, glow } from "./utils";

export class Project extends Content{
    constructor(p5,name,title,tecnologies) {
        super();
        this.name = name
        const imagePath = `surumkata.github.io/assets/projects/${this.name}.png`;
        this.image = p5.loadImage(
            imagePath,
            () => console.log(`Carregado: ${imagePath}`),
            () => console.log(`Erro ao carregar: ${imagePath}`)
        );
        this.title = title;
        this.tecnologies = [];
        for (const i in tecnologies){
            const tecnoPath = `surumkata.github.io/assets/icons/${tecnologies[i]}.png`;
            this.tecnologies.push(p5.loadImage(
                tecnoPath,
                () => console.log(`Carregado: ${tecnoPath}`),
                () => console.log(`Erro ao carregar: ${tecnoPath}`)
            ))
        }
    }

    keyPressed(event){
        if(event.key === 'Enter'){
            // Abrir o projeto em uma nova aba
            const markdownUrl = `/#/${this.name}.md`; // URL da página Markdown
            window.open(markdownUrl, '_blank'); // Abre em uma nova aba
        }
        return false;
    }

    drawText(p5,x,y){
        p5.fill(255); // Cor do texto
        p5.textAlign(p5.LEFT, p5.CENTER);
        p5.textSize(H1);
        p5.text(this.title, x + PROJECT_WIDTH + ICON_PADDING/2, y + ICON_HEIGHT/4);
        p5.stroke("white");
        p5.strokeWeight(0.5);
        p5.line(x + PROJECT_WIDTH + ICON_PADDING/2,y + ICON_HEIGHT/4+ ICON_PADDING/4,WIDTH-ICON_PADDING/2,y + ICON_HEIGHT/4+ ICON_PADDING/4)
    }

    drawTecnos(p5,x,y){
        p5.noStroke();
        p5.textSize(H2);
        for(const i in this.tecnologies){
            let tx = x + PROJECT_WIDTH + ICON_PADDING/2 + (ICON_WIDTH/2)*i
            let ty = y + ICON_HEIGHT/2
            p5.image(this.tecnologies[i],tx, ty,ICON_WIDTH/2,ICON_HEIGHT/2);
        }
    }

    draw(p5,x,y,selected){
        this.controlGlow();

        p5.push();
        p5.fill(255,0,0);
        shadow(p5);
        p5.image(this.image,x,y,PROJECT_WIDTH,ICON_HEIGHT);
        

        if(selected){
            glow(p5,this.glow_opacity);
            p5.image(this.image,x,y,PROJECT_WIDTH,ICON_HEIGHT);
            // Exibir texto abaixo do ícone selecionado
            p5.push();
            shadow(p5);
            this.drawText(p5,x,y);
            this.drawTecnos(p5,x,y);
            glow(p5,this.glow_opacity);
            this.drawText(p5,x,y);
            glow(p5,this.glow_opacity/2,5);
            this.drawTecnos(p5,x,y);
            p5.pop();

        }

        p5.pop();
    }
}