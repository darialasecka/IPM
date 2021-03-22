const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const button = document.getElementById('button');


canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

const width = canvas.width;
const height = canvas.height;

var blocks = [];

function drawPlatform(){

    ctx.fillStyle = "black";
    ctx.fillRect(0, height - 0.2*height, 0.8*width, 0.2*height);
}
drawPlatform();

function generateBlock()
{
    console.log("klocek");
    var color = "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) +")";
    blocks.push({
        w: 100, //width
        h: 100, //height
        color: color,
        x: width - 200,
        y: 200,
    });

    drawBlocks();
}

function drawBlocks()
{
    var i, len = blocks.length;
    for(i = 0; i < len; i++)
    {
      ctx.fillStyle = blocks[i].color;
      ctx.fillRect(blocks[i].x, blocks[i].y, blocks[i].w, blocks[i].h);
    }
}

function mouseDown(e)
{
    var i, len = blocks.length;
    var bRect = canvas.getBoundingClientRect();
    mouseX = (e.clientX - bRect.left);
    mouseY = (e.clientY - bRect.top);
    for (i=0; i < len; i++) {
      if(inBlock(blocks[i], mouseX, mouseY))
      {
        drag = true;
        dragHoldX = mouseX - blocks[i].x;
        dragHoldY = mouseY - blocks[i].y;
        dragIndex = i;
      }
    }
    if (drag)
    {
      window.addEventListener("mousemove", mouseMove, false);
    }
    canvas.removeEventListener("mousedown", mouseDown, false);
    window.addEventListener("mouseup", mouseUp, false);
  return false;
}

function mouseMove(e)
{
    var posX, posY;
    var minX = 0;
    var maxX = canvas.width - 100;
    var minY = 0;
    var maxY = canvas.height - 100;

    var bRect = canvas.getBoundingClientRect();
    mouseX = (e.clientX - bRect.left);
    mouseY = (e.clientY - bRect.top);

    var platformW = width - 0.8*width - 100;
    var platformH = height - 0.2*height - 100;

    //screen border
    posX = mouseX - dragHoldX;
    posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
    posY = mouseY - dragHoldY;
    posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);
    //platform
    posY = (posY < platformH) ? posY : platformH;
    //blocks
    



    blocks[dragIndex].x = posX;
    blocks[dragIndex].y = posY;

    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawPlatform();
    drawBlocks();
}

function mouseUp()
{
    canvas.addEventListener("mousedown", mouseDown, false);
    window.removeEventListener("mouseup", mouseUp, false);
    if (drag)
    {
      drag = false;
      window.removeEventListener("mousemove", mouseMove, false);
    }
}
canvas.addEventListener("mousedown", mouseDown, false);

function inBlock(block,mx,my)
{
    var imageData = ctx.getImageData(mx, my, 1, 1), index = (mx + my * imageData.width) * 4;
    if (imageData.data[3] > 0 && block.color=="rgb(" + imageData.data[0] + "," + imageData.data[1] + "," + imageData.data[2] +")") {
      return true;
    }
    else {
      return false;
    }
}
