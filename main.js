const canvas = document.getElementById("board");
const rightArea = document.querySelector(".right-area");
const ctx = canvas.getContext("2d");
const canvasNext = document.getElementById("next");
const ctxNext = canvasNext.getContext("2d");

//캔버스의 크기 계산
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
rightArea.style.height = ROWS * BLOCK_SIZE + "px";

//블록의 크기 변경
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

let requestId = null;
let time = null;

const moves = {
    [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
    [KEY.SPACE]: (p) => ({ ...p, y: p.y + 1 }),
    [KEY.UP]: (p) => board.rotate(p),
};

let board = new Board(ctx, ctxNext);

initNext();

function initNext() {
    ctxNext.canvas.width = 8 * BLOCK_SIZE;
    ctxNext.canvas.height = 8 * BLOCK_SIZE;
    ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);
}

function addEventListener() {
    document.removeEventListener("keydown", handleKeyPress);
    document.addEventListener("keydown", handleKeyPress);
}

function handleKeyPress(event) {
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
}

function animate(now = 0) {
    time.elapsed = now - time.start;

    if (time.elapsed > time.level) {
        time.start = now;

        board.drop();
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    board.draw();
    requestId = requestAnimationFrame(animate);
}

function resetGame() {
    board.reset();
    time = {
        start: 0,
        elapsed: 0,
        level: 0,
    };
}

function play() {
    addEventListener();
    resetGame();

    if (requestId) {
        cancelAnimationFrame(requestId);
    }
    animate();
}
