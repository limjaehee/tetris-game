const canvas = document.getElementById("board");
const rightArea = document.querySelector(".right-area");
const ctx = canvas.getContext("2d");

//캔버스의 크기 계산
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
rightArea.style.height = ROWS * BLOCK_SIZE + "px";

//블록의 크기 변경
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
