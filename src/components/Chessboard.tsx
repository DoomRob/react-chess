import './Chessboard.css';
import Square from './Square';

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const pieces: Piece[] = [];

for(let p = 0; p < 2; p++) {
  const type = (p === 0) ? "black" : "white";
  const verticalPosition = p === 0 ? 7 : 0;
  pieces.push({image: `assets/images/rook_${type}.png`, x: 0, y: verticalPosition});
  pieces.push({image: `assets/images/rook_${type}.png`, x: 7, y: verticalPosition});
  pieces.push({image: `assets/images/knight_${type}.png`, x: 1, y: verticalPosition});
  pieces.push({image: `assets/images/knight_${type}.png`, x: 6, y: verticalPosition});
  pieces.push({image: `assets/images/bishop_${type}.png`, x: 2, y: verticalPosition});
  pieces.push({image: `assets/images/bishop_${type}.png`, x: 5, y: verticalPosition});
  pieces.push({image: `assets/images/queen_${type}.png`, x: 3, y: verticalPosition});
  pieces.push({image: `assets/images/king_${type}.png`, x: 4, y: verticalPosition});
}

for(let i = 0; i < 8; i++) {
  pieces.push({image: "assets/images/pawn-black.png", x: i, y: 6});
}

for(let i = 0; i < 8; i++) {
  pieces.push({image: "assets/images/pawn-white.png", x: i, y: 1});
}

export default function Chessboard() {

  let board = [];

  for(let i = 0; i < horizontalAxis.length; i++) {
    for(let j = verticalAxis.length - 1; j >= 0; j--) {
      const number = j + i + 2;
      let image = undefined;

      pieces.forEach((piece) => {
        if(piece.x === i && piece.y === j) {
          image = piece.image;
        }
      })

      board.push(<Square image={image} number={number} />);
    }
  }

  return (<div id="chessboard">{board}</div>);
}