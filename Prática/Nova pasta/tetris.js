const board = document.getElementById('board');
const ctx = board.getContext('2d');

const blockSize = 20;
const boardWidth = 10;
const boardHeight = 20;

const colors = [
	'#FF0D00',
	'#00E436',
	'#FFF700',
	'#0096FF',
	'#FF00E4',
	'#00FFFC',
	'#000000'
];

class Piece {
	constructor(type, x, y) {
		this.type = type;
		this.x = x;
		this.y = y;
		this.shape = this.getShape();
	}

	getShape() {
		switch (this.type) {
			case 0:
				return [
					[1, 1, 1, 1]
				];
			case 1:
				return [
					[1, 1],
					[1, 1]
				];
			case 2:
				return [
					[1, 1, 1],
					[0, 1, 0]
				];
			case 3:
				return [
					[1, 1],
					[0, 1],
					[0, 1]
				];
			case 4:
				return [
					[1, 1, 1],
					[1, 0, 0]
				];
			case 5:
				return [
					[1, 1, 1],
					[0, 0, 1]
				];
			case 6:
				return [
					[1, 1, 1],
					[0, 1, 0]
				];
		}
	}

	draw() {
		for (let y = 0; y < this.shape.length; y++) {
			for (let x = 0; x < this.shape[y].length; x++) {
				if (this.shape[y][x]) {
					ctx.fillStyle = colors[this.type];
					ctx.fillRect(this.x + x * blockSize, this.y + y * blockSize, blockSize, blockSize);
					ctx.strokeStyle = '#000';
					ctx.strokeRect(this.x + x * blockSize, this.y + y * blockSize, blockSize, blockSize);
				}
			}
		}
	}
}

const pieces = [
	new Piece(0, 4, 0),
	new Piece(1, 3, 0),
	new Piece(2, 4, 0),
	new Piece(3, 3, 0),
	new Piece(4, 4, 0),
	new Piece(5, 4, 0),
	new Piece(6, 4, 0)
];

let currentPiece = pieces[Math.floor(Math.random() * pieces.length)];
let boardGrid = Array(boardHeight).fill().map(() => Array(boardWidth).fill(0));

function drawBoard() {
	ctx.clearRect(0, 0, board.width, board.height);
	for (let y = 0; y < boardGrid.length; y++) {
		for (let x = 0; x < boardGrid[y].length; x++) {
			if (boardGrid[y][x]) {
				ctx.fillStyle = colors[boardGrid[y][x] - 1];
				ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
				ctx.strokeStyle = '#000';
				ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
			}
		}
	}
	currentPiece.draw();
}

function updateBoard() {
	for (let y = 0; y < currentPiece.shape.length; y++) {
		for (let x = 0; x < currentPiece.shape[y].length; x++) {
			if (currentPiece.shape[y][x]) {
				boardGrid[currentPiece.y + y][currentPiece.x + x] = currentPiece.type + 1;
			}
		}
	}
	currentPiece = pieces[Math.floor(Math.random() * pieces.length)];
}

function checkCollision