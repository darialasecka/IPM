const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const button = document.getElementById('button');


canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

const width = canvas.width;
const height = canvas.height;

var blocks = [];

function drawPlatform(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, width, height);

    ctx.fillStyle = "black";
    ctx.fillRect(0, height - 0.2*height, 0.8*width, 0.2*height);

}

function generateBlock()
{
    console.log("klocek");
}


function update(){
    drawPlatform();
}

function drawCanvas() {
    drawPlatform();
}

drawCanvas();