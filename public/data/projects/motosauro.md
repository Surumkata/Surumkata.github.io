# Projeto de Laboratórios de Informática 1

## Recriação do jogo "ExciteBike"

### Ano letivo de 2019/2020

---

**Excitebike** é um jogo de corrida de motocross desenvolvido pela Nintendo. Foi lançado no Japão para o Family Computer em 1984 e foi um dos títulos de lançamento para o NES em 1985.

O objetivo deste projeto de **Laboratórios de Informática 1** era a recriação desse jogo, utilizando a linguagem de programação **Haskell**, assim, colocando em prática os ensinamentos obtidos ao longo das diferentes cadeiras do semestre, como **Programação Funcional**. Por conta das mudanças gráficas, decidimos apelidar a nossa nova versão de **"Motosauro"**.

Este trabalho foi realizado por Tiago Silva e Hugo Fernandes, estudantes do 1º ano de engenharia informática da Universidade do Minho no ano letivo de 2019/2020.

---

#### [Jogabilidade](https://github.com/surumkata/motosauro/tree/main/src)

No Motosauro, as corridas são sempre entre 4 motas, podendo elas ser controladas por jogadores em tela compartilhada e/ou por bots.

O jogo é simples:
- O jogador pode movimentar a moto entre pistas (**cima** e **baixo**).
- **Acelerar** e **desacelerar**.
- Inclinar a moto enquanto estiver no ar (**esquerda** e **direita**).
- Disparar **cola** (4 munições por corrida) para o piso atrás dele, atrasando as outras motas.

Se o jogador cair com uma inclinação torta, ele fica **"morto"** por alguns segundos.

O jogo conta com 5 tipos de pisos diferentes, que alteram a velocidade da mota. Do mais lento ao mais rápido:
1. **Cola**
2. **Lama**
3. **Relva**
4. **Terra**
5. **Boost**

Além disso, há 2 tipos de mapas:
- **Padrões**, criados por nós.
- **Gerados**, que requerem uma **seed** e um **tamanho**.

---

#### [Parte Gráfica](https://github.com/surumkata/motosauro/tree/main/textures)

##### [Menus](https://github.com/surumkata/motosauro/tree/main/textures/Menu)

![<img src="https://user-images.githubusercontent.com/57015073/191846460-a72741d2-11bf-4511-8422-035e65ad3734.gif" width="100%"](https://user-images.githubusercontent.com/57015073/191846460-a72741d2-11bf-4511-8422-035e65ad3734.gif)
**Menu Inicial do Jogo**

![<img src="https://user-images.githubusercontent.com/57015073/191835109-abf92924-0ab2-4291-858d-314f401bb86f.png" width="100%"](https://user-images.githubusercontent.com/57015073/191835109-abf92924-0ab2-4291-858d-314f401bb86f.png)
**Menu dos Controlos**

![<img src="https://user-images.githubusercontent.com/57015073/191846465-e8460021-9b26-4513-8528-bdcaae0f0473.gif" width="100%"](https://user-images.githubusercontent.com/57015073/191846465-e8460021-9b26-4513-8528-bdcaae0f0473.gif)
**Menu de Escolha de Tipo de Mapa**

![<img src="https://user-images.githubusercontent.com/57015073/191846470-a5464980-c1aa-4ffa-b43c-c4ad99205586.gif" width="100%"](https://user-images.githubusercontent.com/57015073/191846470-a5464980-c1aa-4ffa-b43c-c4ad99205586.gif)
**Menu de Escolha de (Default) Mapa**

![<img src="https://user-images.githubusercontent.com/57015073/191846468-5a973e1c-a23c-46e8-998c-74bd90b90c81.gif" width="100%"](https://user-images.githubusercontent.com/57015073/191846468-5a973e1c-a23c-46e8-998c-74bd90b90c81.gif)
**Menu de Escolha de Quantidade de Jogadores**

![<img src="https://user-images.githubusercontent.com/57015073/191835897-4e4e8333-1174-4b78-957b-0ef616d87577.png" width="100%"](https://user-images.githubusercontent.com/57015073/191835897-4e4e8333-1174-4b78-957b-0ef616d87577.png)
**Decorrer de uma Corrida**

![<img src="https://user-images.githubusercontent.com/57015073/191842314-612d62c3-30a3-4964-9106-c79399d9ad12.png" width="100%"](https://user-images.githubusercontent.com/57015073/191842314-612d62c3-30a3-4964-9106-c79399d9ad12.png)
**Fim de uma Corrida**

##### [Motos](https://github.com/surumkata/motosauro/tree/main/textures/Others)

![Moto Jogador 1](https://user-images.githubusercontent.com/57015073/192284225-51c65ab8-3f99-4b63-be0e-fea603f37551.png)
**Moto Jogador 1**

![Moto Jogador 2](https://user-images.githubusercontent.com/57015073/192284227-6e846d49-db66-46b2-b592-22ae2e27f9be.png)
**Moto Jogador 2**

![Moto Jogador 3](https://user-images.githubusercontent.com/57015073/192284229-ae9a4c65-ce44-41a0-a5c1-a3959d9fb2c6.png)
**Moto Jogador 3**

![Moto Jogador 4](https://user-images.githubusercontent.com/57015073/192284230-bea746a4-ce52-4ad4-b812-21778e550bdc.png)
**Moto Jogador 4**

![Jogador Morto](https://user-images.githubusercontent.com/57015073/192283591-e80f2171-0644-42e5-86ab-33bd843453e9.png)
**Jogador Morto**

##### [Pisos](https://github.com/surumkata/motosauro/tree/main/textures/Layers)

**Piso de Terra**  
![Terra](https://user-images.githubusercontent.com/57015073/191843692-6fdbfcc7-644a-4785-a821-c2eeef3f997c.png)

**Piso de Cola**  
![Cola](https://user-images.githubusercontent.com/57015073/191843695-8f523082-3da1-4b7a-9e48-a05d381d46c1.png)

**Piso de Lama**  
![Lama](https://user-images.githubusercontent.com/57015073/191843697-61b8b9b6-f9f6-4813-9fb2-af4701a4f87a.png)

**Piso de Relva**  
![Relva](https://user-images.githubusercontent.com/57015073/191843700-3504348e-208f-40c9-8898-a6b6eb6304d1.png)

**Piso de Boost**  
![Boost](https://user-images.githubusercontent.com/57015073/191843705-6d614595-e985-4697-8824-b1d193de44b8.png)

---

### Glossário de Tarefas

- [TAREFA 1](https://github.com/surumkata/motosauro/blob/main/src/Tarefa1_2019li1g002.hs) Gerar um mapa aleatório.
- [TAREFA 2](https://github.com/surumkata/motosauro/blob/main/src/Tarefa2_2019li1g002.hs) Criação dos tipos de jogadas.
- [TAREFA 3](https://github.com/surumkata/motosauro/blob/main/src/Tarefa3_2019li1g002.hs) Compressão de mapas.
- [TAREFA 4](https://github.com/surumkata/motosauro/blob/main/src/Tarefa4_2019li1g002.hs) Efeito da passagem do tempo num estado do jogo.
- [TAREFA 5](https://github.com/surumkata/motosauro/blob/main/src/Tarefa5_2019li1g002.hs) Recriação gráfica do jogo através da biblioteca Gloss.
- [TAREFA 6](https://github.com/surumkata/motosauro/blob/main/src/Tarefa6_2019li1g002.hs) Criação do bot.

**Veja o repositório deste projeto [aqui](https://github.com/surumkata/motosauro).**
