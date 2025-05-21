//HTML elementes
const board = document.getElementById('board');
const scoreBoard = document.getElementById('scoreBoard');
const startButton = document.getElementById('start');
const gameOverSign = document.getElementById('gameOver');


//Game Settings
const boardSize = 10;
const gameSpeed = 200;
const squareTypes = {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2
}


const directions = {
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1

}


//Game variables
let snake;
let score;
let direction;
let boardSquares;
let emptySquares;
let moveInterval;

//mueve la serpiente
const moveSnake = () => {
   console.log(direction,'1');
    const newSquare = String(
        Number(snake[snake.length - 1]) + directions[direction])
        .padStart(2, '0');


    const [row, column] = newSquare.split('');

    if (newSquare < 0 ||
        newSquare > boardSize * boardSize ||
        (direction === 'ArrowRight' && column == 0) ||
        (direction === 'ArrowLeft' && column == 9 ||
            boardSquares[row][column] === squareTypes.snakeSquare
        )) {
        gameOver();
    }
    else {
        snake.push(newSquare);

        if(boardSquares[row][column] === squareTypes.foodSquare){
            addFood();
        }else{
            const emptySquare = snake.shift();
            drawSquare(emptySquare,'emptySquare');
        } 
        drawSnake();
    }
}


const addFood = () => {
    score++;
    updateScore();
    createRandomFood();
}

const gameOver = () => {
    gameOverSign.style.display = 'block';
    clearInterval(moveInterval);
    startButton.disabled = false;
    activarScroll();
}


//setea la direccion
const setDirection = newDireccion => {
    direction = newDireccion;
}

//evento para agregar la direccion
const directionEvent = key => {
    //alert(key.code);
    switch (key.code) {
        case 'ArrowUp':
            direction != 'ArrowDown' && setDirection(key.code)
            break;
        case 'ArrowDown':
            direction != 'ArrowUp' && setDirection(key.code)
            break;
        case 'ArrowLeft':
            direction != 'ArrowRight' && setDirection(key.code)
            break;
        case 'ArrowRight':
            direction != 'ArrowLeft' && setDirection(key.code)
            break;
        case 'KeyP':
            starGame();
            break;
    }
}


const drawSnake = () => {
    snake.forEach(square => drawSquare(square, 'snakeSquare'));
}



//Rellena cada cuadro del tablero
//@params
//square: posicion el cuadrado
//type: tipo de cuadrado (emptySquare, snakeQuare, foodSquare)
const drawSquare = (square, type) => {
    const [row, column] = square.split('');
    boardSquares[row][column] = squareTypes[type];
    const squareElement = document.getElementById(square);
    squareElement.setAttribute('class', `square ${type}`);

    if (type === 'emptySquare') {
        emptySquares.push(square);
    } else {
        if (emptySquares.indexOf(square) !== -1) {
            emptySquares.splice(emptySquares.indexOf(square), 1);
        }
    }
}

const updateScore = () => {
    scoreBoard.innerText = score;
}

//crea nuestra comida aletoria
const createRandomFood = () => {
    const RandomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    drawSquare(RandomEmptySquare, 'foodSquare');
}


const createBoard = () => {
    boardSquares.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            const squareValue = `${rowIndex}${columnIndex}`;
            const squareElement = document.createElement('div');
            squareElement.setAttribute('class', 'square emptySquare');
            squareElement.setAttribute('id', squareValue);
            board.appendChild(squareElement);
            emptySquares.push(squareValue);
        });
    });
}


const setGame = () => {
    snake = ['00', '01', '02', '03'];
    score = snake.length;
    direction = 'ArrowRight';
    boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare));
    board.innerHTML = '';
    emptySquares = [];

    createBoard();
}

//funcion de inicio de juego
const starGame = () => {
    
    setGame();
    gameOverSign.style.display = 'none';
    startButton.disabled = true;
    drawSnake();
    updateScore();
    createRandomFood();
    desactivarScroll();
    document.addEventListener('keydown', directionEvent);
   
    moveInterval = setInterval( () => moveSnake(), gameSpeed);
   
    
}
    function desactivarScroll() {
        document.body.classList.add('no-scroll');
    }

    function activarScroll() {
        document.body.classList.remove('no-scroll');
    }

document.addEventListener('keydown', directionEvent);
startButton.addEventListener('click', starGame);