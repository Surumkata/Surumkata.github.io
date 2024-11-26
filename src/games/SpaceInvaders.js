import React, { useEffect } from 'react';

const SpaceInvaders = () => {
  useEffect(() => {
    // Referencia o arquivo script.js que contém o código do jogo
    const script = document.createElement('script');
    script.src = '/assets/games/space_invaders/script.js'; // Caminho relativo ao public/
    script.async = true; // Carrega o script de forma assíncrona
    document.body.appendChild(script);

    // Cleanup para remover o script quando o componente for desmontado
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <canvas id="gameCanvas"></canvas>
      <div id="scoreEl" style={{ color: 'white', position: 'absolute', top: '10px', left: '10px' }}>
        Score: 0
      </div>
    </div>
  );
};

export default SpaceInvaders;
