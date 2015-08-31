# particleGenerator
Generates particles for website backgrounds. View example at http://dfred.me

# Look at particles.html for an simple example of how to implement this.
# How to use:
1. Create a canvas with the id #space, the particles are going to generate in it. The generator automatically expands it to full page with and height with x-index or -1. 
2. Add script to page after canvas is loaded. ex:
`        <canvas id="space" onload="startCanvas()">
            Error with canvas...
        </canvas>
        <script src="particle.js"></script>`
3. Add the css file to the header.
4. Call the iniBackgroundParticles() method when your sure the canvas is loaded and modify the javascript file for your needs

#### Adding an overlay with opacity and/or blur makes for a really cool background. 

# Values
At the start of the js files, multiple values can be modified
## density
this changes how many particles are present on the canvass proportional to the area of the canvas.
## lineColor
this changes the color of lines that form between points.
## particleColor
this changes the color of particles on the canvas (the round things that move).
