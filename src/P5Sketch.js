import { ReactP5Wrapper } from "@p5-wrapper/react";
import { Project } from "./model/Project";
import { MainOption } from "./model/MainOption";
import { ContentLink } from "./model/Content";
import { Folder } from "./model/Folder";
import { Menu } from "./model/Menu";
import { HEIGHT, PSP_HEIGHT, PSP_WIDTH, shadow, WIDTH, X_SCREEN_START, Y_SCREEN_START } from "./model/utils";
import { Game } from "./model/Game";


const P5Sketch = () => {
    let color_background;
    let menu;
    let pspImage;

    let scale;
    let w;
    let h;


    const sketch = (p5) => {
        

        p5.preload = () => { 
            
            w = window.innerWidth*0.8;
            h = window.innerHeight*0.8;

            scale = w/PSP_WIDTH;

            // Carregar cores
            color_background = p5.color(17, 103, 190);

            const pspPath = `/assets/psp.png`;
            pspImage = p5.loadImage(
                pspPath,
                () => console.log(`Carregado: ${pspPath}`),
                () => console.log(`Erro ao carregar: ${pspPath}`)
            );

            const folderIconPath = `/assets/icons/folder.png`;
            const folderIcon = p5.loadImage(
                folderIconPath,
                () => console.log(`Carregado: ${folderIconPath}`),
                () => console.log(`Erro ao carregar: ${folderIconPath}`)
            );

            menu = new Menu([
                new MainOption(p5,"Home",[]),
                new MainOption(p5,"Settings",[]),
                new MainOption(p5,"Projects",[
                    new Folder(folderIcon,"Academic Projects",[
                        new Folder(folderIcon,"1º Ano",[
                            new Project(p5,"motosauro","Motosauro (LI1 Project)",["haskell"]),
                            new Project(p5,"rastros","Rastros (LI2 Project)",["c"])
                        ]),
                        new Folder(folderIcon,"2º Ano",[
                            new Project(p5,"shafa","Shafa (Data Communication)",["c"]),
                            new Project(p5,"fmpoo2021","fmpoo2021 (Object Oriented Programming)",["java"]),
                            new Project(p5,"sgr-uminho","SGR-Uminho (LI3 Project)",["java","c"]),
                        ]),
                        new Folder(folderIcon,"3º Ano",[
                            new Project(p5,"artificial-intelligent-green-distribution","artificial-intelligent-green-distribution (Artificial Intelligence)",["prolog"]),
                            new Project(p5,"reparation-center-dss","reparation-center-dss (Software Systems Development)",["java"]),
                            new Project(p5,"airport-sd","airport-sd (Distributed Systems)",["java"]),
                            new Project(p5,"addandSEEK-localizarte","addandSEEK-localizarte (L14 Project)",["php","mysql"]),
                            new Project(p5,"csvTOjson","csvTOjson (Language Processing)",["python"]),
                            new Project(p5,"plysimple","plysimple (Language Processing)",["python"]),
                            new Project(p5,"engineandgenerator3D","engineandgenerator3D (Computer Graphics)",["c++","opengl"]),
                            new Project(p5,"adi_project","ADI Project (Intelligent Learning and Decision Making)",["knime"]),
                        ]),
                        new Folder(folderIcon,"4º Ano",[]),
                        new Folder(folderIcon,"5º Ano",[new Project(p5,"erpl","ERPL",["python","lark","react","p5","blockly"])])
                    ]),
                    new Folder(folderIcon,"Other Projects",[
                        new Project(p5,"bilacinema","Bilacinema",["react"]),
                        new Project(p5,"bila-olimpiadas","Bila-Olimpiadas 2024",["react"]),
                    ])
                ]),
                new MainOption(p5,"Games",[
                    new Game(p5,"space_invaders","Space Invaders","")
                ]),
                new MainOption(p5,"Papers",[new ContentLink(p5,"paper","ERPL: DSL for Escape Rooms","In 13th Symposium on Languages, Applications and Technologies (SLATE 2024)","https://drops.dagstuhl.de/entities/document/10.4230/OASIcs.SLATE.2024.9")]),
                new MainOption(p5,"Social",[
                    new ContentLink(p5,"github","Github","Tiago Silva (surumkata)","https://github.com/surumkata"),
                    new ContentLink(p5,"email","Email","tiagoluisdiassilva@gmail.com","mailto:tiagoluisdiassilva@gmail.com"),
                    new ContentLink(p5,"linkedin","Linkedin","Tiago Silva (tiago-silva-48b244248)","https://www.linkedin.com/in/tiago-silva-48b244248/"),
                    new ContentLink(p5,"instagram","Instagram","Tiago Silva (surumkata)","https://instagram.com/surumkata"),
                ])
            ])
        };
            
        p5.setup = () => {
            p5.createCanvas(w, h);
            p5.frameRate(60);
        };

        p5.keyPressed = (event) => {
            menu.keyPressed(event);
        };

        p5.draw = () => {
            //desenhar psp

            p5.scale(scale);
            p5.push();
            shadow(p5);
            p5.image(pspImage,0,0,PSP_WIDTH,PSP_HEIGHT);
            p5.pop();
            p5.fill(color_background);
            p5.rect(X_SCREEN_START,Y_SCREEN_START,WIDTH,HEIGHT);

            p5.beginClip();
            p5.rect(X_SCREEN_START,Y_SCREEN_START,WIDTH,HEIGHT);
            p5.endClip();

            p5.translate(X_SCREEN_START,Y_SCREEN_START)
            menu.draw(p5);

            // Configurações do fundo
            //p5.background(color_background);

        }
        
    };

    return (
        <div className="sketch-container" style={{display:"flex",height:"100vh",alignItems:"center",justifyContent:"center"}}>
            <ReactP5Wrapper sketch={sketch} />
        </div>
    );
};

export default P5Sketch;