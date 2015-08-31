var canvas;
var context;
//VALUES
var density = 5000;
var lineColor = 'white';
var particleColor = 'yellow';
var speed=2.5;

var stack;


var lastScrollTop = 0;

function Particle(ax, ay) {
    this.x = ax;
    this.y = ay;
    this.mx = (Math.random() * (speed + speed)-speed) / 2;
    this.my = (Math.random() * (speed + speed)-speed) / 2;
    this.update = function () {
        if(this.mx>speed)this.my-=0.5;
        if(this.my<-speed)this.my+=0.5;
        this.x = this.x + this.mx;
        this.y = this.y + this.my;
        if(this.mx<0.2 && this.mx>-0.2)this.mx=(Math.random() * (speed + speed)-speed) / 2;
        if(this.my<0.2 && this.my>-0.2)this.my=(Math.random() * (speed + speed)-speed) / 2;
        if (this.y < 0) this.my = -this.my*(Math.random()+0.2)*1.5;
        if (this.x < 0) this.mx = -this.mx*(Math.random()+0.2)*1.5;
        if (this.x > canvas.width) this.mx = -this.mx*(Math.random()+0.2)*1.5;
        if (this.y > canvas.height) this.my = -this.my*(Math.random()+0.2)*1.5;
    }
    this.addMomentum=function(mx1,my1)
    {
        this.mx+=mx1;
        this.my+=my1
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
    }
}

function checkDensity() {
    area = canvas.height * canvas.width;

    if ((area / stack.length) < density-500) {
        stack.pop();

    }
    if ((area / stack.length) > density+500) {
        stack.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
     var loopTimer = setTimeout('checkDensity()', 20);
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
function MouseWheelHandler(e)
{
    	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    for(i=0;i<stack.length;i++)
    {
        stack[i].addMomentum(0,Math.random()*delta/2)  ;
    }
}
function iniBackgroundParticles() {
    canvas = document.getElementById('space');
    window.addEventListener('resize', resizeCanvas, false);
    context = canvas.getContext('2d');

    stack = new Array();
    resizeCanvas();
    if (context) {
        window.addEventListener("mousewheel", MouseWheelHandler, false);
        window.requestAnimationFrame(draw);
        checkDensity();
    }
    

}