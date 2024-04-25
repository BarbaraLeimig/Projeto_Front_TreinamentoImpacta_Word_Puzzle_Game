buzz.defaults.formats = [ 'ogg', 'mp3' ];
buzz.defaults.preload = 'metadata';

// array de objetos com os conteúdos para as telas dos bichinhos
var games = [
    { img: 'img/koala.png', color:'#176580', word: 'koala', sound: '' },
    { img: 'img/elephant1.png', color:'#a36513', word: 'elephant', sound: 'sounds/elephant' },
    { img: 'img/monkey.png', color:'#ffc48b', word: 'monkey', sound: 'sounds/monkey' },
    { img: 'img/bear.png', color:'#807148', word: 'bear', sound: 'sounds/bear' },
    { img: 'img/horse.png', color:'#bc9e6c', word: 'horse', sound: 'sounds/horse' }
    /* { img: 'img/bull.png', color:'#ff5f09', word: 'bull', sound: 'sounds/bull' },
    { img: 'img/rabbit.png', color:'#c81f27', word: 'rabbit', sound: '' },
    { img: 'img/tiger.png', color:'#b3eef4', word: 'tiger', sound: 'sounds/meow' },
    { img: 'img/turtle.png', color:'#d5ea86', word: 'turtle', sound: '' },
    { img: 'img/dog.png', color:'#fc8404', word: 'dog', sound: 'sounds/dog' },
    { img: 'img/bee.png', color:'#fcc804', word: 'bee', sound: 'sounds/bee' },
    { img: 'img/butterfly.png', color:'#e0388c', word: 'butterfly', sound: '' },
    { img: 'img/cat.png', color:'#505050', word: 'cat', sound: 'sounds/cat' },
    { img: 'img/fox.png', color:'#f78b12', word: 'fox', sound: 'sounds/fox' },
    { img: 'img/frog.png', color:'#4bbc54', word: 'frog', sound: 'sounds/frog' },
    { img: 'img/panda.png', color:'#ececec', word: 'panda', sound: '' },
    { img: 'img/pig.png', color:'#FC649C', word: 'pig', sound: 'sounds/pig' },
    { img: 'img/penguin.png', color:'#cbcbcb', word: 'penguin', sound: '' },
    { img: 'img/sheep.png', color:'#e5ad9e', word: 'sheep', sound: 'sounds/sheep' },
    { img: 'img/ladybug.png', color:'#f22939', word: 'ladybug', sound: '' } */
];

// definição das variáveis
var winSound        = new buzz.sound('sounds/win' ),
    errorSound      = new buzz.sound('sounds/error' ),
    alphabetSounds  = {},
    alphabet        = 'abcdefghijklmnopqrstuvwxyz'.split( '' ); //divide a string em substrings

// laço para percorrer a variável que contém as letras e associar cada letra ao som correspondente
for( var i in alphabet ) {
    var letter = alphabet[ i ];
    alphabetSounds[ letter ] = new buzz.sound('sounds/kid/'+ letter );
}

// Funções principais para o funcionamento da aplicação
$( function() {  
    if ( !buzz.isSupported() ) {
        $('#warning').show();
    }

    var idx = 0,
        $container  = $( '#container' ),
        $picture    = $( '#picture' ),
        $models     = $( '#models' ),
        $letters    = $( '#letters' );
        $score      = $( '#score' );

    $( 'body' ).bind('selectstart', function() { 
        return false 
    });

    // função para passar para o próximo bichinho
    $( '#next' ).click( function() {
        refreshGame();
        buildGame( ++idx ); 
        return false;
    });

    // função para voltar para o bichinho anterior
    $( '#previous' ).click( function() {
       refreshGame();
       buildGame( --idx ); 
       return false;
    });

    // função para definir o leveis do jogo
    $( '#level' ).click( function() {
        if ( $( this ).text() == 'easy' ) {
            $( this ).text( 'hard' );
            $models.addClass( 'hard' );
        } else {
            $( this ).text( 'easy' );
            $models.removeClass( 'hard' );
        }
        return false;
    });

    // função para atualizar o jogo
    function refreshGame() {
        $( '#models' ).html( '' );
        $( '#letters' ).html( '' );
    }

    // função responsável por contruir os processos do jogo
    function buildGame( x ) {
        if ( x > games.length - 1 ) {
            idx = 0;
        }
        if ( x < 0 ) {
            idx = games.length - 1;
        }

        var game  = games[ idx ],
            score = 0;

        var gameSound = new buzz.sound( game.sound );
        gameSound.play();

        // Fade the background color
        $( 'body' ).stop().animate({
            backgroundColor: game.color
        }, 1000);
        $( '#header a' ).stop().animate({
            color: game.color
        }, 1000);

        // Update the picture
        $picture.attr( 'src', game.img )
            .unbind( 'click' )
            .bind( 'click', function() {
                gameSound.play();
            });

        // Build model
        var modelLetters = game.word.split( '' );
        // cria a lista que contem as letras que formam a palavra nome do animal
        for( var i in modelLetters ) {
            var letter = modelLetters[ i ];
            $models.append( '<li>' + letter + '</li>' );
        }

        var letterWidth = $models.find( 'li' ).outerWidth( true ); // inclui margens, padding e calcula o tamanho de cada letra

        $models.width( letterWidth * $models.find( 'li' ).length ); // calcula o tamanho total do elemento (palavra) para ajustar a largura da models

        // Build shuffled letters
        var letters  = game.word.split( '' ),
            shuffled = letters.sort( function() { return Math.random() < 0.5 ? -1 : 1 });

        for( var i in shuffled ) {
            $letters.append( '<li class="draggable">' + shuffled[ i ] + '</li>' ); // exibe as letras arrastáveis misturadas
        }

        $letters.find( 'li' ).each( function( i ) {
            var top   = ( $models.position().top ) + ( Math.random() * 100 ) + 80,
                left  = ( $models.offset().left - $container.offset().left ) + ( Math.random() * 20 ) + ( i * letterWidth ),
                angle = ( Math.random() * 30 ) - 10;

            $( this ).css({
                top:  top  + 'px',
                left: left + 'px'
            });

            rotate( this, angle );

            $( this ).mousedown( function() {
                var letter = $( this ).text();
                if ( alphabetSounds[ letter ] ) {
                    alphabetSounds[ letter ].play();
                }
            });
        });

        $letters.find( 'li.draggable' ).draggable({
            zIndex: 9999,
            stack: '#letters li'
        });

        // responsável por verificar o encaixe das letras na posição correta
        $models.find( 'li' ).droppable( {
            accept:     '.draggable',
            hoverClass: 'hover',
            drop: function( e, ui ) {
                var modelLetter      = $( this ).text(),
                    droppedLetter = ui.helper.text();

                if ( modelLetter == droppedLetter ) {
                    ui.draggable.animate( {
                        top:     $( this ).position().top,
                        left:     $( this ).position().left
                    } ).removeClass( 'draggable' ).draggable( 'option', 'disabled', true );
                    
                    rotate( ui.draggable, 0 );
                    
                    score++;
                    
                    if ( score == modelLetters.length ) {
                        winGame();
                        increasePoints();
                    }    
                } else {
                    ui.draggable.draggable( 'option', 'revert', true );
                    
                    errorSound.play();
                    
                    setTimeout( function() {
                        ui.draggable.draggable( 'option', 'revert', false );
                    }, 100 );
                }
            }
        });
    }

    function winGame() {
        winSound.play();

        $( '#letters li' ).each( function( i ) {
            var $$ = $( this );
            setTimeout( function() {
                $$.animate({
                    top:'+=60px'
                });
            }, i * 300 );
        });

        // passa para a nova model após o usuário acertar a anterior
        setTimeout( function() {
            refreshGame();
            buildGame( ++idx );
        }, 3000);
    }

    function rotate( el, angle ) {
        $( el ).css({
            '-webkit-transform': 'rotate(' + angle + 'deg)',
            '-moz-transform': 'rotate(' + angle + 'deg)',
            '-ms-transform': 'rotate(' + angle + 'deg)',
            '-o-transform': 'rotate(' + angle + 'deg)',
            'transform': 'rotate(' + angle + 'deg)'
        });
    }

    // Sessão para construir a pontuação do usuário dentro do jogo
    var currentPoints = 0;
    var maxPoints = 50;

    function checkWin() {
        if (currentPoints == maxPoints) {
            $score.append(' <li> Parabéns! Você acertou todos os nomes de animais em inglês! </li>');
            resetPoints();
        }
    }

    function updatePoints() {
        $('#score').text(`Sua pontuação: ${currentPoints} / ${maxPoints}`);
        checkWin();
    }

    function increasePoints() {
        currentPoints += 10;
        updatePoints();
        checkWin();
    }

    function resetPoints(){
        currentPoints = 0;
        updatePoints();
    }

    updatePoints();
    
    buildGame( idx );
});
