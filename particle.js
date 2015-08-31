var canvas;
var context;
//VALUES
var density = 5000;
var lineColor = 'white';
var particleColor = 'yellow';
var stack;

function Particle(ax, ay) {
    this.x = ax;
    this.y = ay;
    this.mx = (Math.random() * 2 - 1) / 2;
    this.my = (Math.random() * 2 - 1) / 2;
    this.update = function () {
        this.x = this.x + this.mx;
        this.y = this.y + this.my;

        if (this.y < 0) this.my = -this.my;
        if (this.x < 0) this.mx = -this.mx;
        if (this.x > canvas.width) this.mx = -this.mx;
        if (this.y > canvas.height) this.my = -this.my;
    }
}

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.strokeStyle = lineColor;
    context.fillStyle = particleColor;
    if (typeof stack !== 'undefined') {
        for (i = 0; i < stack.length; i++) {

            p = stack[i];
            if (p.x > canvas.width || p.y > canvas.height) {
                stack.splice(i, 1);

            }
        }
        checkDensity();
    }
}

function checkDensity() {
    area = canvas.height * canvas.width;

    while ((area / stack.length) < density) {
        stack.pop();

    }
    while ((area / stack.length) > density) {
        stack.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}


function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    stack.forEach(drawParticle);
    var loopTimer = setTimeout('draw()', 20);
}

function drawParticle(p1, index, array) {
    p1.update();
    context.beginPath();
    context.arc(p1.x, p1.y, 3, 0, 2 * Math.PI);

    context.fill();

    for (i = index; i < array.length; i++) {
        p2 = array[i];
        if (Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)) < 30) {
            context.beginPath();
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.stroke();
        }
    }
}

function iniBackgroundParticles() {
    canvas = document.getElementById('space');
    window.addEventListener('resize', resizeCanvas, false);
    context = canvas.getContext('2d');


    stack = new Array();
    resizeCanvas();
    if (context) {

        window.requestAnimationFrame(draw);
    }
}