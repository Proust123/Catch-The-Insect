const screens = document.querySelectorAll('.screen')
const chooseBtns = document.querySelectorAll('.choose-insect-btn')
const startBtn = document.getElementById('start-btn')
const gameContainer = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
let scores = 0
let seconds = 0
let selectedInsect = {}

startBtn.addEventListener('click', () => {
    screens[0].classList.add('up')
})

chooseBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        let img = btn.querySelector('img')
        let src = btn.querySelector('src')
        let alt = btn.querySelector('alt')
        selectedInsect = {src, alt}
        screens[1].classList.add('up')
        setTimeout(createInsect, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime(){
    let mins = Math.floor(seconds / 60)
    let secs = seconds

    if(secs > 60) {
        secs = seconds % 60
    }

    mins = mins < 10 ? `0${mins}` : mins
    secs = mins < 10 ? `0${secs}` : secs

    timeEl.innerHTML = `Time : ${mins} : ${secs}`
    seconds++
}

function createInsect(){
    const insect = document.createElement('div')
    insect.classList.add('insect')
    let {x, y} = getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML = `<img src = "${selectedInsect.src}" alt = "${selectedInsect.alt}" style = "transform = rotate(${Math.random() * 360}deg)" />`
    insect.addEventListener('click', insectCaught)

    gameContainer.appendChild(insect)

}

function getRandomLocation() {
    let height = window.innerHeight
    let width = window.innerWidth

    let x = Math.random() * (width - 200) + 100
    let y = Math.random() * (height - 200) + 100

    return {x, y}

}

function insectCaught(){
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => {
        this.remove()
    },1000)
    addInsect()
}

function addInsect(){
    setTimeout(createInsect, 1000)
    setTimeout(createInsect, 1500)
}

function increaseScore(){
    scores++
    if(scores > 19){
        message.classList.add('visible')
    }

    scoreEl.innerHTML = `Score : ${scores}`

}