class Board {
    constructor(ctx, ctxNext) {
        this.ctx = ctx;
        this.ctxNext = ctxNext;
        this.init();
    }

    init() {
        this.ctx.canvas.width = COLS * BLOCK_SIZE;
        this.ctx.canvas.height = ROWS * BLOCK_SIZE;

        this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
    }

    reset() {
        this.grid = this.getExptyBoard();
        this.piece = new Piece(this.ctx);
        this.piece.setStartingPosition();
        this.getNewPiece();
    }

    getNewPiece() {
        const { width, height } = this.ctxNext.canvas;
        this.next = new Piece(this.ctxNext);
        this.ctxNext.clearRect(0, 0, width, height);
        this.next.draw();
    }

    getExptyBoard() {
        return Array.from(
            {
                length: ROWS,
            },
            () => Array(COLS).fill(0)
        );
    }

    isInsideWalls(x, y) {
        return x >= 0 && COLS && y <= ROWS;
    }

    notOccupied(x, y) {
        return this.grid[y] && this.grid[y][x] === 0;
    }

    vaild(p) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return (
                    value === 0 ||
                    (this.isInsideWalls(x, y) && this.notOccupied(x, y))
                );
            });
        });
    }

    rotate(piece) {
        let p = JSON.parse(JSON.stringify(piece));

        for (let y = 0; y < p.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
            }
        }

        p.shape.forEach((row) => row.reverse());

        console.log(p);

        //알고리즘 처리
        return p;
    }
}
