class Board {
    grid;

    reset() {
        this.grid = this.getExptyBoard();
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
}
