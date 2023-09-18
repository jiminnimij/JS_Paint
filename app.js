const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");

const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const saveBtn = document.getElementById("save");
//const colorOptions = document.getElementsByClassName("color-option");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;




// part 1) 선을 만든다.
//ctx.rect(50, 50, 100, 100);
// stroke or fill 선택
//ctx.fill();

/*ctx.fillStyle = "red";
*ctx.fill();
* >> 다 red로 변경됨 | 이유: 하나의 패스이기 때문에 설정이 변하면 전체가 다 변하게 됨
*/
// 새 경로 설정
// ctx.beginPath();
// ctx.rect(150, 150, 100, 100);
// ctx.fillStyle = "red";
// ctx.fill();
// ctx.strokeRectRect(50, 50, 100, 200);
// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(150, 150);
// ctx.lineTo(50, 150);
// ctx.fill();


// 집 만들기
// ctx.fillRect(200, 200, 50, 200);
// ctx.fillRect(400, 200, 50, 200);
// ctx.lineWidth= 20;
// ctx.fillRect(300, 300, 50, 100);
// ctx.fillRect(200, 200, 200, 20);
// ctx.moveTo(200, 200);
// ctx.lineTo(325, 100);
// ctx.stroke();
// ctx.lineTo(450, 200);
// ctx.fill();

// 사람 그리기
// ctx.fillRect(210 - 4 , 200 - 3, 15,100);
// ctx.fillRect(350 - 4 , 200 - 3, 15,100);
// ctx.fillRect(260 - 4 , 200 - 3, 60, 200);

// ctx.arc(250, 100, 50, 0, 2 *Math.PI);
// ctx.fill();

// ctx.beginPath(); // 색을 바꾸려면 새로운 패스를 만들어주어야 함
// ctx.fillStyle = "white"; 
// ctx.arc(260 + 10, 80, 8, Math.PI, 2 *Math.PI);
// ctx.arc(240 + 10, 80, 8, Math.PI, 2 *Math.PI);
// ctx.fill();

ctx.lineWidth = lineWidth.value;

// const colors = [
//   "#ff3838",
//   "#ffb8b8",
//   "#c56cf0",
//   "#ff9f1a",
//   "#fff200",
//   "#32ff7e",
//   "#7efff5"
// ];


// function onclick(event){
//   ctx.beginPath();
//   ctx.moveTo(400 , 400);
//   const color = colors[Math.floor(Math.random() * colors.length)];
//   ctx.strokeStyle = color;
//   ctx.lineTo(event.offsetX, event.offsetY);
//   ctx.stroke();
// }

// // canvas.addEventListener("click", onclick);
// canvas.addEventListener("mousemove", onclick);

let isPainting =false;
let isFilling = false;


function onMove(event){
  if(isPainting){
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function onMouseDown(){
  isPainting = true;
}

function cancelPainting(){
  isPainting = false;
}

function onLineWidthChange(event){
  ctx.lineWidth = event.target.value;
}

function onColorChange(event){
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onCanvasClick(event){
  if(isFilling){
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDoubleClick(event){
  const text = textInput.value;
  if(text !== ""){
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "68px serif"
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseLeave", cancelPainting);

canvas.addEventListener("click", onCanvasClick);

canvas.addEventListener("dblclick", onDoubleClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

function onColorClick(event){
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value =colorValue;
}

function onModeClick(event){
  if(isFilling){
    isFilling = false;
    modeBtn.innerText = "🩸 Fill";
  } else{
    isFilling = true;
    modeBtn.innerText = "🖌️ Draw";
  }
}

function onDestroyClick(event){
  ctx.save();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.restore();
}

function onEragerClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "🩸 Fill";

}

function onFileChange(event){
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image()
  image.src = url;
  image.onload = function(){
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onSaveClick(event){
  const url = canvas.toDataURL();
   const a = document.createElement("a");
   a.href = url;
   a.download = "myDrawing.png";
   a.click();
}
// colorOptions.array.forEach();
// 오류 발생! => colorOptions는 ArrayLike 객체 (배열 같은 객체), 배열은 아님 !HTML Collection!
colorOptions.forEach(color => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEragerClick);

fileInput.addEventListener("change", onFileChange);

saveBtn.addEventListener("click", onSaveClick);