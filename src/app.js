const square = document.querySelectorAll('.square')
const blue_devil = document.querySelectorAll('.blue_devil')
const timeLeft = document.querySelector('#seconds-left')
let score = document.querySelector('#score')
let highest_score = document.querySelector('#highest_score')
let player = document.querySelector('#player')


// Connect to a database or create one if it doesn't exist yet.

let result = 0
let currentTime = timeLeft.textContent

function randomSquare() {
    square.forEach(className => {
        className.classList.remove('blue_devil')
    })
    
    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('blue_devil')

    //assin the id of the randomPosition to hitPosition for us to use later
    hitPosition = randomPosition.id
}

square.forEach(id => {
    id.addEventListener('mouseup', () => {
        if(id.id === hitPosition) {
            result++
            score.textContent = result
        }
    })
})

function moveDevil() {
    let timerId = null
    timerId = setInterval(randomSquare, 1000)
}
moveDevil()

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime

    if (currentTime == 0) {
        clearInterval(timerId);
        alert('GAME OVER! Your final score is ' + result);
    }
}

let timerId = setInterval(countDown, 1000)