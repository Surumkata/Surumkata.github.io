export const ICON_WIDTH   = 80;
export const ICON_HEIGHT  = 60;
export const ICON_PADDING = 2*ICON_WIDTH/3;
export const PROJECT_WIDTH = ICON_WIDTH+ICON_WIDTH/2;
export const X_MENU_START = ICON_PADDING*2 + ICON_WIDTH;
export const Y_MENU_START = ICON_PADDING*2 + ICON_HEIGHT;
export const WIDTH = 1228;
export const HEIGHT = 690;

export const PSP_WIDTH = 2102;
export const PSP_HEIGHT = 870;

export const X_SCREEN_START =437;
export const Y_SCREEN_START =73;

export const H1 = 20;
export const H2 = 16;
export const H3 = 14;
export const H4 = 12;

export const KEY_HOLD_DELAY = 120;

// Inicializar contexto de áudio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundPath = "/assets/sounds/05 SFX Cursor.mp3";
let soundBuffer;

fetch(soundPath)
.then((response) => response.arrayBuffer())
    .then((buffer) => audioContext.decodeAudioData(buffer))
    .then((decodedData) => {
        soundBuffer = decodedData;
    })
    .catch((error) => console.error("Erro ao carregar som:", error));

export const playSound = () => {
    if (soundBuffer) {
        const source = audioContext.createBufferSource();
        source.buffer = soundBuffer;
        source.connect(audioContext.destination);
        source.start(0);
    }
};


  
export function shadow(p5) {
    p5.drawingContext.shadowOffsetX = 3;
    p5.drawingContext.shadowOffsetY = 3;
    p5.drawingContext.shadowColor = p5.color('black');
    p5.drawingContext.shadowBlur = 10;
  }

export function glow(p5,opacity, blur=15) {
    let alpha = Math.max(0,Math.min(1,opacity/255));
    p5.drawingContext.shadowOffsetX = 0;
    p5.drawingContext.shadowOffsetY = 0;
    p5.drawingContext.shadowColor = p5.color(`rgba(100%, 100%, 100%, ${alpha})`);
    p5.drawingContext.shadowBlur = blur;
}