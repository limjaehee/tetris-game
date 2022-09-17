class Piece {
    x;
    y;
    color;
    shape;
    ctx;

    constructor(ctx) {
        this.ctx = ctx;
        this.spawn();
    }

    randomizeTetrominoType(noOfTypes) {
        return Math.floor(Math.random() * noOfTypes);
    }

    spawn() {
        const typeId = this.randomizeTetrominoType(COLORS.length);

        this.color = COLORS[typeId];
        this.shape = SHAPES[typeId];
        //Starting position.
        this.x = COLS / 2 - 2;
        this.y = 0;
        this.hardDropped = false;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                //this.x, this.y는 shape의 상단 왼쪽 좌표
                //shape 안에 있는 블록 좌표에 x,y를 더한다
                //보드에서 블록의 자표는 this.x + x가 된다

                if (value > 0) {
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }

    setStartingPosition() {
        this.x = this.typeId === 4 ? 4 : 3;
    }

    move(p) {
        if (!this.hardDropped) {
            this.x = p.x;
            this.y = p.y;
        }
        this.shape = p.shape;
    }
}
