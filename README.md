# 🎯 TreinamentoImpacta- Word Puzzle Game
O projeto base, criado pelo orientador Celio, foi compartilhado com o propósito de possibilitar a continuidade do trabalho. O objetivo foi promover o desenvolvimento e a colaboração em equipe durante esta etapa inicial de treinamento do estágio.

## 👯‍♀️ Colaboradores
- Bárbara Andrade Leimig Rodrigues
- Priscila Mieko Hamamoto

## 📄 Descrição do Projeto
O projeto consiste em um jogo do tipo puzzle, voltado para crianças, com o objetivo de estimular a aprendizagem dos nomes dos animais em inglês. O jogo consiste em cards de animais, que emitem som correspondente, onde são exibidas letras arrastáveis com o objetivo de formar o nome do animal em inglês. Inicialmente possui 2 níveis: o easy e o hard.

## 📄 Novas Implementações
- Página inicial para o jogo
- Criação de um nível maior de dificuldade, com inserção de mais letras randômicas aleatórias
- Botões de redirecionamento de páginas
- Limitação de início e fim de jogo, com exibição da pontuação final do usuário
- Orientação a objetos
- Correção dos sons do jogo, como as letras e som de vitória
- Acréscimo de novos animais

## 📖 Especificações Técnicas
Com objetivo de colocar em prática e melhorar nosso aprendizado, o código foi modificado implementando-se conteúdos como a orientação a objetos, funções de callback, operadores ternários.
Consiste em:
- Página inicial para start no jogo
- Página para os níveis Easy e Hard: 
    - O nível easy consiste nas letras embaralhadas que compõem o nome do animal em inglês, com dicas de sombreamento dentro das caixinhas onde serão colocadas as letras correspondentes.
    - O nível hard consiste nas letras embaralhadas que compõem o nome do animal em inglês, sem dicas de sombreamento dentro das caixinhas onde serão colocadas as letras correspondentes.
- Página para o nivel Very Hard: consiste nas letras embaralhadas que compõem o nome do animal em inglês, sem dicas de sombreamento dentro das caixinhas onde serão colocadas as letras correspondentes e com acréscimo de mais 5 letras aleatórias.
- Classe Animal: representa um animal e possui um construtor que inicializa a classe com quatro propriedades:
    - img: caminho para a imagem do animal
    - color: a cor do animal
    - word: nome do animal em inglês. Ex: lion
    - sound: caminho para o som que o animal emite
- Classe GameApp: é responsável por gerenciar o jogo nos níveis Easy e Hard. Ela importa a classe `Animal` e utiliza suas instâncias para criar as interações do jogo. É composta por:
    - Construtor: um array de objetos `Animal` é inicializado com diferentes animais, suas cores, nomes e sons associados. Além disso, são definidos os pontos atuais e máximos do jogo, os sons do alfabeto e um índice para navegar entre os diferentes jogos.
    - `initialize()`: método que Prepara o jogo configurando os formatos de áudio padrão, pré-carregando metadados e associando sons a cada letra do alfabeto.
    - `bindEvents()`: método que vincula eventos de clique aos elementos HTML para navegar entre os jogos e alterar o nível de dificuldade.
    - `refreshGame()`: método que limpa o conteúdo das áreas de modelos e letras do jogo.
    - `buildGame(index)`: método que constrói a lógica do jogo para o animal no índice especificado. Isso inclui animar a cor de fundo, atualizar a imagem do animal, embaralhar e exibir letras, e configurar a interatividade de arrastar e soltar.
    - `playGameSound(animal)`: método que toca o som associado ao animal atual.
    - `rotate(element, angle)`: método que aplica uma rotação ao elemento HTML especificado.
    - `winWord()`: método que executa ações quando o jogador acerta o nome do animal, como tocar um som de vitória e mover as letras para a posição correta.
    - `increasePoints()`: Aumenta a pontuação do jogador em 10 pontos a cada nome de animal acertado e chama o método `updatePoints()` para atualizar a exibição dos pontos.
    - `checkWin()`: Verifica se o jogador alcançou a pontuação máxima e, em caso positivo, exibe uma mensagem de parabéns e chama o método `resetPoints()` para reiniciar a contagem de pontos.
    - `resetPoints()`: Reinicia a pontuação do jogador para zero e atualiza a exibição dos pontos.
    - `updatePoints()`: Atualiza a pontuação na interface do jogo e verifica se o jogador ganhou.
- Classe VeryHardGameApp: é responsável por gerenciar o jogo no nível VeryHard. Ela importa a classe `Animal` e utiliza suas instâncias para criar as interações do jogo. É semelhante à classe `GameApp`, com alterações no método `BuildGame()` para que após embaralhar as letras do nome do animal, sejam adicionadas 5 letras aleatórias ao conjunto de letras que o jogador deve organizar, sem dicas dentro das caixinhas. Isso aumenta a dificuldade, pois o jogador agora tem letras distratoras.


## 💻 Tecnologias Utilizadas

![Trello](https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white)

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white)

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)