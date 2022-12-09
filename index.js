const canvas = document.querySelector(`canvas`)
const c = canvas.getContext(`2d`)

canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 20) {
   collisionsMap.push(collisions.slice(i, 20 + i))
}

class Boundary {
   static width = 48
   static height = 48
   constructor(position) {
      this.position = position
      this.width = 48
      this.height = 48
   }
   draw() {
      c.fillStyle = `red`
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
   }
}



const boundaries = []
const offset = {
   x: -50,
   y: -300
}

collisionsMap.forEach((row, i) => {
   row.forEach((symbol, j) => {
      if (symbol === 2684355612 || symbol === 1052 || symbol === 993)
      boundaries.push(
         new Boundary({
            position:{
               x:j * Boundary.width + offset.x,
               y:i * Boundary.height + offset.y
            }
         })
      )
   })
})

const image = new Image(`./assets/player-room.png`)
image.src = `./assets/player-room.png`

const playerImage = new Image()
playerImage.src = `./assets/playerDown.png`


class Sprite {
   constructor({ position, velocity, image }) {
      this.position = position
      this.image = image
   }

   draw() {
      c.drawImage(
         this.image,
         this.position.x,
         this.position.y
      )
   }
}

const background = new Sprite({
   position: {
      x: offset.x,
      y: offset.y
   },
   image: image
})

const keys = {
   w: {
      pressed: false
   },
   a: {
      pressed: false
   },
   s: {
      pressed: false
   },
   d: {
      pressed: false
   }
}

function animate() {
   window.requestAnimationFrame(animate)
   background.draw()
   boundaries.forEach(boundary => {
      boundary.draw()
   })
   c.drawImage(
      playerImage,
      0,
      0,
      playerImage.width / 4,
      playerImage.height,
      canvas.width / 2 - playerImage.width / 2,
      canvas.height / 2 - playerImage.height / 2,
      playerImage.width / 4,
      playerImage.height
   )

   if (keys.w.pressed && lastKey === `w`) background.position.y += 3
   else if (keys.a.pressed && lastKey === `a`) background.position.x += 3
   else if (keys.s.pressed && lastKey === `s`) background.position.y -= 3
   else if (keys.d.pressed && lastKey === `d`) background.position.x -= 3
   
}
animate()

let lastKey = ``
window.addEventListener(`keydown`, (e) => {
   switch (e.key) {
      case `w`:
         keys.w.pressed = true
         lastKey = `w`
         break

      case `a`:
         keys.a.pressed = true
         lastKey = `a`
         break

      case `s`:
         keys.s.pressed = true
         lastKey = `s`
         break
         
      case `d`:
         keys.d.pressed = true
         lastKey = `d`
         break
   }
})

window.addEventListener(`keyup`, (e) => {
   switch (e.key) {
      case `w`:
         keys.w.pressed = false
         break
      case `a`:
         keys.a.pressed = false
         break
      case `s`:
         keys.s.pressed = false
         break
      case `d`:
         keys.d.pressed = false
         break
   }
})





let selectedCharPhrase = ``
function selectCharPhrase() {
   let phraseCounter = Math.floor((Math.random() * 4) + 1)
   switch (phraseCounter) {
      case 0:
         selectedCharPhrase = `Hum...`
         break
      case 1:
         selectedCharPhrase = `Quando isso vai passar?`
         break
      case 2:
         selectedCharPhrase = `Precisava ver alguma coisa agora...`
         break
      case 3:
         selectedCharPhrase = `Talvez se eu tentasse dar uma volta...`
         break
      case 4:
         selectedCharPhrase = `...`
         break
   }
}


let selectedAngelPhrase = ``
function selectAngelPhrase() {
   let phraseCounter = Math.floor((Math.random() * 4) + 1)
   switch (phraseCounter) {
      case 0:
         selectedAngelPhrase = `Hum...`
         break
      case 1:
         selectedAngelPhrase = `Talvez nas gavetas haja alguma coisa...`
         break
      case 2:
         selectedAngelPhrase = `Não encontrei nada ainda...`
         break
      case 3:
         selectedAngelPhrase = `Seria bom se eu soubesse quem são os familiares dele...`
         break
      case 4:
         selectedAngelPhrase = `E se eu procurar na estante?`
         break
   }
}


let isAngelDialogOpen
let isCharDialogOpen

const angelDialog = document.querySelector(`.dialog-box-angel`)
const charDialog = document.querySelector(`.dialog-box-char`)

function openAngelDialog() {
   selectAngelPhrase()
   document.querySelector(`.angel-text`).innerHTML = `${selectedAngelPhrase}`
   angelDialog.style.display = `flex`
   isAngelDialogOpen = true
}

function closeAngelDialog() {
   angelDialog.style.display = `none`
   isAngelDialogOpen = false
}

function openCharDialog() {
   selectCharPhrase()
   document.querySelector(`.char-text`).innerHTML = `${selectedCharPhrase}`
   charDialog.style.display = `flex`
   isCharDialogOpen = true
}

function closeCharDialog() {
   charDialog.style.display = `none`
   isCharDialogOpen = false
}

window.addEventListener(`keydown`, (e) => {
   switch (e.key) {
      case `p`:
         isAngelDialogOpen ? closeAngelDialog() : openAngelDialog()
   }
})

window.addEventListener(`keydown`, (e) => {
   switch (e.key) {
      case `l`:
         isCharDialogOpen ? closeCharDialog() : openCharDialog()
   }
})

