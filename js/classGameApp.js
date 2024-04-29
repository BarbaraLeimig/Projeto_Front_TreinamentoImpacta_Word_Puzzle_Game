// iMPORT da classe Animal
import { Animal } from './classAnimal.js';

// Definição da classe GameApp que gerencia o jogo
export class GameApp {
    constructor() {
        this.games = [
            new Animal('img/koala.png', '#176580', 'koala', ''),
            new Animal('img/monkey.png', '#ffc48b', 'monkey', 'sounds/monkey'),
            new Animal('img/bear.png', '#807148', 'bear', 'sounds/bear'),
            new Animal('img/horse.png', '#bc9e6c', 'horse', 'sounds/horse'),
            new Animal('img/bull.png', '#ff5f09', 'bull', 'sounds/bull'),
            new Animal('img/elephant1.png', '#a36513', 'elephant', 'sounds/elephant'),
            new Animal('img/rabbit.png', '#c81f27', 'rabbit', ''),
            new Animal('img/tiger.png', '#b3eef4', 'tiger', 'sounds/meow'),
            new Animal('img/turtle.png', '#d5ea86', 'turtle', ''),
            new Animal('img/dog.png', '#fc8404', 'dog', 'sounds/dog'),
            new Animal('img/bee.png', '#fcc804', 'bee', 'sounds/bee'),
            new Animal('img/butterfly.png', '#e0388c', 'butterfly', ''),
            new Animal('img/cat.png', '#505050', 'cat', 'sounds/cat'),
            new Animal('img/fox.png', '#f78b12', 'fox', 'sounds/fox'),
            new Animal('img/frog.png', '#4bbc54', 'frog', 'sounds/frog'),
            new Animal('img/panda.png', '#ececec', 'panda', ''),
            new Animal('img/pig.png', '#FC649C', 'pig', 'sounds/pig'),
            new Animal('img/penguin.png', '#cbcbcb', 'penguin', ''),
            new Animal('img/sheep.png', '#e5ad9e', 'sheep', 'sounds/sheep'),
            new Animal('img/ladybug.png', '#f22939', 'ladybug', '')
        ];
        this.idx = 0;
        this.currentPoints = 0;
        this.maxPoints = 200;
        this.alphabetSounds = {};
        this.alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        this.initialize();
    }

    // Método para inicializar o jogo
    initialize() {
        buzz.defaults.formats = ['ogg', 'mp3'];
        buzz.defaults.preload = 'metadata';

        // Associa cada letra dentro do array de alfabeto com seu respectivo som
        for (let letter of this.alphabet) {
            this.alphabetSounds[letter] = new buzz.sound(`sounds/kid/${letter}`);
        }

        this.bindEvents();
        this.updatePoints();
        this.buildGame(this.idx);
    }

    // Método que associa/vincula os eventos de click aos elementos HTML
    bindEvents() {
        $('#next').click(() => {
            this.refreshGame();
            this.buildGame(++this.idx);
            return false;
        });

        $('#previous').click(() => {
            this.refreshGame();
            this.buildGame(--this.idx);
            return false;
        });

        $('#level').click(() => {
            const $level = $('#level');
            $level.text($level.text() === 'easy' ? 'hard' : 'easy');
            $('#models').toggleClass('hard', $level.text() === 'hard');
            return false;
        });
    }

    // Método que limpa os conteúdos de models e letters
    refreshGame() {
        $('#models').html('');
        $('#letters').html('');
    }

    // Método responsável por construir a lógica do jogo
    buildGame(x) {
        var $container  = $( '#container' ),
            $models     = $( '#models' ),
            $letters    = $( '#letters' );

        if (x > this.games.length - 1) {
            this.idx = 0;
        } 
        else if (x < 0) {
            this.idx = this.games.length - 1;
        }
        var game = this.games[this.idx],
            correctLetter = 0;
        this.playGameSound(game);

        // Esmaece a cor de fundo
        $('body').stop().animate({ backgroundColor: game.color }, 1000);
        $('#header a').stop().animate({ color: game.color }, 1000);

        // Atualiza a imagem
        $('#picture').attr('src', game.img).unbind('click').bind(() => this.playGameSound(game));

        // Constroi o model
        var modelLetters = game.word.split( '' );
        // cria a lista que contem as letras que formam a palavra nome do animal
        for (var i in modelLetters) {
            var letter = modelLetters[i];
            $models.append(`<li>${letter}</li>`);
        }

        var letterWidth = $models.find( 'li' ).outerWidth( true ) // inclui margens, padding e calcula o tamanho de cada letra
        $models.width( letterWidth * $models.find( 'li' ).length ); // calcula o tamanho total do elemento (palavra) para ajustar a largura da models

        var shuffledLetters = game.word.split( '' ).sort(() => Math.random() < 0.5 ? -1 : 1);
        for (var i in shuffledLetters) {
            $letters.append(`<li class="draggable">${shuffledLetters[i]}</li>`); // exibe as letras misturadas, dando o append para vincular na lista (lu)
        }

        $letters.find('li').each((i, el) => {
            var top = ($models.position().top) + (Math.random() * 100) + 80,
                left = ($models.offset().left - $container.offset().left) + (Math.random() * 20) + (i * letterWidth),
                angle = (Math.random() * 30) - 10;

            $(el).css({ top: top + 'px', left: left + 'px' });
            this.rotate(el, angle);

            $(el).mousedown(() => {
                var letter = $(el).text();
                if (this.alphabetSounds[letter]) {
                    this.alphabetSounds[letter].play();
                }
            });
        });

        $letters.find( 'li.draggable' ).draggable({
            zIndex: 9999,
            stack: '#letters li'
        });

        $models.find('li').droppable({
            accept: '.draggable',
            hoverClass: 'hover',
            drop: (e, ui) => {
                const modelLetter = $(e.target).text();
                const droppedLetter = ui.helper.text();

                if (modelLetter == droppedLetter) {
                    ui.draggable.animate({
                        top: $(e.target).position().top,
                        left: $(e.target).position().left
                    }).removeClass('draggable').draggable('option', 'disabled', true);

                    // rotaciona as letras para que fiquem retas dentro das models
                    this.rotate(ui.draggable, 0);
                    correctLetter++; // incremento por letra correta

                    // verifica se a quantidade de letras corretas equivale ao tamnho do array que contém a palavra
                    if (correctLetter == modelLetters.length){
                        this.winWord();
                        this.increasePoints();
                    }
                } else {
                    ui.draggable.draggable('option', 'revert', true);
                    
                    var errorSound = errorSound = new buzz.sound('sounds/error');
                    errorSound.play();

                    setTimeout(() => {
                        ui.draggable.draggable('option', 'revert', false);
                    }, 100);
                }
            }
        });
    }

    // Método para tocar o som dos animais
    playGameSound(game) {
        const gameSound = new buzz.sound(game.sound);
        gameSound.play();
    }

    // Aplica a rotação dos elementos usando CSS
    rotate(el, angle) {
        $(el).css({
            '-webkit-transform': 'rotate(' + angle + 'deg)',
            '-moz-transform': 'rotate(' + angle + 'deg)',
            '-ms-transform': 'rotate(' + angle + 'deg)',
            '-o-transform': 'rotate(' + angle + 'deg)',
            'transform': 'rotate(' + angle + 'deg)'
        });
    }

    // Método para tocar o som de vitória após acertar o nome do animal, em seguida posiciona as letras abaixo das models
    winWord() {
        var winSound = new buzz.sound('sounds/win');
        winSound.play();
        $('#letters li').each((i, el) => {
            setTimeout(() => {
                $(el).animate({ top: '+=60px' });
            }, i * 300);
        });

        setTimeout(() => {
            this.refreshGame();
            this.buildGame(++this.idx);
        }, 3000);
    }

    // Método para aumentar a pontuação por nome de animal acertado
    increasePoints() {
        this.currentPoints += 10;
        this.updatePoints();
        this.checkWin();
    }

    // Método que verifica se o jogador acertou todas as palavras, exibindo uma mensagemd e congratulações ao final do jogo
    checkWin() {
        setTimeout(() => {
            if (this.currentPoints == this.maxPoints) {
                alert('Parabéns! Você acertou todos os nomes de animais em inglês!');
                this.resetPoints();
            }
        }, 2000)
    }

    // Método que reinicia a contagem da pontuação após o término do jogo
    resetPoints() {
        this.currentPoints = 0;
        this.updatePoints();
    }

    // Método que atualiza a pontuação do jogo
    updatePoints() {
        $('#score').text(`Sua pontuação: ${this.currentPoints} / ${this.maxPoints}`);
        this.checkWin();
    }
}

// Inicializar a aplicação
$(function () {
    if (!buzz.isSupported()) {
        $('#warning').show();
    }

    new GameApp();
});
