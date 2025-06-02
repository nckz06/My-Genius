// Variáveis Globais
let order = []
let clickedOrder = []
let score = 0
let maxScore = 0
let level = 1
let spanLevel = document.getElementById('level')
let spanScore = document.getElementById('score')
let spanMaxScore = document.getElementById('max-score')

// 0 - Verde
// 1 - Vermelho
// 2 - Amarelo
// 3 - Azul

const blue = document.querySelector('.blue')
const red = document.querySelector('.red')
const green = document.querySelector('.green')
const yellow = document.querySelector('.yellow')


// Funções de Funcionamento

// Cria ordem aleatória de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4)
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order) {
        let elementColor = createColorElement(order[i])
        lightColor(elementColor, Number(i) + 1)
    }
}

// Retorna a cor clicada
function createColorElement(color) {
    if (color == 0) {
        return green
    } else if (color == 1) {
        return red
    } else if (color == 2) {
        return yellow
    } else if (color == 3) {
        return blue
    }
}

// Acende a próxima cor da order
function lightColor(element, num) {
    num = num * 500
    setTimeout(() => {
        element.classList.add('selected')
    }, num - 250)
    setTimeout(() => {
        element.classList.remove('selected')
    }, num)
}

// Checa a order de click comparado com a ordem gerada pela função
function checkOrder() {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver()
            break
        }
    }

    if (clickedOrder.length == order.length) {
        nextLevel()
    }
}

// Reinicia o jogo e as pontuações, caso o jogador erre a order passada
function gameOver() {
    alert(`Pontuação: ${score}! \nVocê perdeu o jogo! \nClique em OK para iniciar um novo jogo`)
    
    if (score > maxScore) {
        maxScore = score
        spanMaxScore.innerHTML = `Maior Pontuação: ${maxScore}`
        save(maxScore)
    }

    order = []
    clickedOrder = []

    playGame()
}

// Gera um próximo nível para o jogador
function nextLevel() {
    level++;
    score++;
    spanLevel.innerHTML = `Nível: ${level}`
    spanScore.innerHTML = `Pontuação: ${score}`
    shuffleOrder()
}

// Detecta o clique do usuário
function clickHandler(color) {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected')

    setTimeout(() => {
        createColorElement(color).classList.remove('selected')
        checkOrder();
    }, 250)

}

function playGame() {
    alert('Bem-vindo ao Jogo de Cores! \nIniciando novo jogo!')
    score = -1
    level = 0

    nextLevel()
}

green.onclick = () => clickHandler(0);
red.onclick = () => clickHandler(1);
yellow.onclick = () => clickHandler(2);
blue.onclick = () => clickHandler(3);

function save(maxScore) {
    if (window.localStorage) {
        localStorage.genius_maxScore = maxScore
    }
}

window.onload = function() {
    if (window.localStorage && localStorage.genius_maxScore) {
        maxScore = localStorage.genius_maxScore
        spanMaxScore.innerHTML = `Maior Pontuação: ${maxScore}`
    }
}

playGame()