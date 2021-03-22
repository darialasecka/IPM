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
    var color = "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) +")";
    blocks.push({
        w: 100, //width
        h: 100, //height
        color: color,
        posX: width - 200,
        posY:  200,
    });

    drawBlocks();
}

function drawBlocks()
{
  var i, len = blocks.length;
  for(i = 0; i < len;i++)
  {
    ctx.fillStyle = blocks[i].color;
    ctx.fillRect(blocks[i].posX, blocks[i].posY, blocks[i].w, blocks[i].h)
  }
}


function update(){
    drawPlatform();
}

function drawCanvas() {
    drawPlatform();
}

drawCanvas();