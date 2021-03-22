const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const button = document.getElementById('button');


canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

const width = canvas.width;
const height = canvas.height;

var size = 100;
var blocks = [];
var platformHeight = 50;

function drawPlatform(){
  ctx.fillStyle = "black";
  ctx.fillRect(0, height - platformHeight, 0.8*width, platformHeight);
}
drawPlatform();

function generateBlock()
{
  //console.log("klocek");
  var color = "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) +")";
  blocks.push({
    size: size,
    color: color,
    x: width - 200,
    y: 200,
  });

  drawBlocks();
}

function drawBlocks()
{
  for(var i = 0; i < blocks.length; i++)
  {
    ctx.fillStyle = blocks[i].color;
    ctx.fillRect(blocks[i].x, blocks[i].y, blocks[i].size, blocks[i].size);
  }
}

function mouseDown(e)
{
  var i, len = blocks.length;
  var bRect = canvas.getBoundingClientRect();
  mouseX = (e.clientX - bRect.left);
  mouseY = (e.clientY - bRect.top);
  for (i=0; i < len; i++) {
    if(inBlock(blocks[i], mouseX, mouseY)) {
      drag = true;
      dragHoldX = mouseX - blocks[i].x;
      dragHoldY = mouseY - blocks[i].y;
      dragIndex = i;
    }
  }
  if (drag) {
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
  var maxX = width - size;
  var minY = 0;
  var maxY = height - platformHeight - size;

  var bRect = canvas.getBoundingClientRect();
  mouseX = (e.clientX - bRect.left);
  mouseY = (e.clientY - bRect.top);

  var platformW = width - 0.8*width - size;
  var platformH = height - platformHeight - size;

  //screen border
  posX = mouseX - dragHoldX;
  posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
  posY = mouseY - dragHoldY;
  posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);

  //other blocks
  for(var i = 0; i < blocks.length; i++){
    if(i == dragIndex) continue; // skip dragged block
    var currX = blocks[i].x;
    var currY = blocks[i].y;
    if (posY > currY - 50 && posY < currY + 50){ //only if hight is of other block
      if(posX < currX) {
        //console.log('left');
        var leftWay = true;
      } else if(posX > currX) {
        //console.log('right');
        var leftWay = false;
      }
      if(leftWay) maxX = currX - size;
      else minX = currX + size;
      posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX)
    }
    if (posX > currX - 50 && posX < currX + 50){ //only if width is of other block
      if(posY < currY) {
        var downWay = true;
      } else if(posY > currY) {
        var downWay = false;
      }
      if(downWay) maxY = currY - size;
      else minY = currY + size;
      posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY)
    }
  }

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


function blockCollision(x, y)
{
  for (let i = 0; i < blocks.length; i++) {
              if (Math.abs(x - blocks[i].x) < 100) {
                  if(Math.abs(y - blocks[i].y) < 100){
                      return false;
                  }
              }
          }
  //        if (Math.abs(x - platformX) < platformWidth) {
  //            if(Math.abs(y - platformY) < platformHeight){
  //                return false;
  //            }
  //        }
          return true;
}
