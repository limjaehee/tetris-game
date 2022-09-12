const canvas = document.getElementById("board");
const rightArea = document.querySelector(".right-area");
const ctx = canvas.getContext("2d");

//캔버스의 크기 계산
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
rightArea.style.height = ROWS * BLOCK_SIZE + "px";

//블록의 크기 변경
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

let board = new Board();

function play() {
    board.reset();
    let piece = new Piece(ctx);
    piece.draw();

    board.piece = piece;
}

const moves = {
    [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
    [KEY.SPACE]: (p) => ({ ...p, y: p.y + 1 }),
};

document.addEventListener("keydown", (event) => {
    if (moves[event.keyCode]) {
        //이벤트 버블링 막기
        event.preventDefault();

        //조각의 새 상태 얻기
        let p = moves[event.keyCode](board.piece);

        if (event.keyCode === KEY.SPACE) {
            while (board.vaild(p)) {
                board.piece.move(p);
                p = moves[KEY.DOWN](board.piece);
            }
            //그리기 전에 이전 좌표를 지운다.
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            board.piece.draw();
        } else if (board.vaild(p)) {
            //이동이 가능한 상태라면 조각을 이동한다.
            board.piece.move(p);

            //그리기 전에 이전 좌표를 지운다.
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            board.piece.draw();
        }
    }
});
