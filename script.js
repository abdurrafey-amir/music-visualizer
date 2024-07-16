let fft

let img
function preload() {
    img = loadImage('music.png')
}

let Particle = function (position) {
    console.log('called')
    this.position = position
    this.speed = createVector(0, 2)
    this.color = [random(0, 255), random(0, 255), random(0, 255)]

    this.drawcircle = function() {
       
        circle(this.position.x, this.position.y, this.diameter)
        fill(this.color)
    }
    this.drawrect = function() {
        rect(this.position.x, this.position.y, this.diameter, this.diameter)
        fill(this.color)
    }
    this.drawimg = function() {
        background(0, 0, 0, 0)
        image(img, this.position.x, this.position.y, this.diameter, this.diameter)
        
    }
    this.update = function (energy) {
        this.diameter = random(5, 7) + energy * 100
        this.position.y += this.speed.y * energy * 10
        if (this.position.y > height) {
            this.position.y = 0
        }
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight)
    noStroke()

    let mic = new p5.AudioIn()
    mic.start()

    fft = new p5.FFT()
    fft.setInput(mic)

    positionParticles()
}

function draw() {
    background(0, 0, 0)
    let spectrum = fft.analyze()
    updateParticles(spectrum)
   
}