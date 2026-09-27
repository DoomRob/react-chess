import React, { useRef, useState } from 'react';
import Square from '../Squares/Square';
import './Chessboard.css';
import Referee from '../Referee/Referee';

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
  image: string; x: number; y: number; type: PieceType; team: TeamType;
}

export enum TeamType {
  OPPONENT,
  PLAYER
}

export enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING
}

const initialBoardState: Piece[] = []

for(let p = 0; p < 2; p++) {
  const teamType = (p === 0) ? TeamType.OPPONENT : TeamType.PLAYER;
  const type = (teamType === TeamType.OPPONENT) ? "black" : "white";
  const y = (teamType === TeamType.OPPONENT) ? 7 : 0;
  initialBoardState.push({image: `assets/images/rook_${type}.png`, 
    x: 0, 
    y: y, 
    type: PieceType.ROOK,
    team: teamType
  });
  initialBoardState.push({image: `assets/images/rook_${type}.png`, 
    x: 7, 
    y: 
    y, 
    type: PieceType.ROOK,
    team: teamType
  });
  initialBoardState.push({image: `assets/images/knight_${type}.png`, 
    x: 1, 
    y: y, 
    type: PieceType.KNIGHT,
    team: teamType
  });
  initialBoardState.push({image: `assets/images/knight_${type}.png`, 
    x: 6, 
    y: y, 
    type: PieceType.KNIGHT,
    team: teamType
  });
  initialBoardState.push({image: `assets/images/bishop_${type}.png`, 
    x: 2, 
    y: y, 
    type: PieceType.BISHOP,
    team: teamType
  });
  initialBoardState.push({image: `assets/images/bishop_${type}.png`, 
    x: 5, 
    y: y, 
    type: PieceType.BISHOP,
    team: teamType
  });
  initialBoardState.push({image: `assets/images/queen_${type}.png`, 
    x: 3, 
    y: y, 
    type: PieceType.QUEEN,
    team: teamType
  });
  initialBoardState.push({image: `assets/images/king_${type}.png`, 
    x: 4, 
    y: y, 
    type: PieceType.KING,
    team: teamType
  });
}

for(let i = 0; i < 8; i++) {
  initialBoardState.push({image: "assets/images/pawn_black.png", 
    x: i, 
    y: 6, 
    type: PieceType.PAWN,
    team: TeamType.OPPONENT
  });
}

for(let i = 0; i < 8; i++) {
  initialBoardState.push({image: "assets/images/pawn_white.png", 
    x: i, 
    y: 1, 
    type: PieceType.PAWN,
    team: TeamType.PLAYER
  });
}

export default function Chessboard() {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const refChessboard = useRef<HTMLDivElement>(null);
  const referee = new Referee();

function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  const element = e.target as HTMLElement;
  const chessboard = refChessboard.current;
  if(element.classList.contains("chess-piece") && chessboard) {
    setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
    setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)));
    const x = e.clientX - 50;
    const y = e.clientY - 50;
    element.style.position = "absolute";
    element.style.left = `${x - 40}px`;
    element.style.top = `${y - 40}px`;

    setActivePiece(element);
  }
}

function movePiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  const chessboard = refChessboard.current;
  if(activePiece && chessboard) {
    const minX = chessboard.style.offsetLeft -25;
    const minY = chessboard.style.offsetTop - 25;
    const maxX = chessboard.offsetLeft + chessboard.offsetWidth - 25;
    const maxY = chessboard.offsetTop + chessboard.offsetHeight - 25;
    const x = e.clientX - 50;
    const y = e.clientY - 50;
    activePiece.style.position = "absolute";

    // Ensure the piece stays within the bounds of the chessboard
    if(x < minX) {
      activePiece.style.left = `${minX}px`;
    } 
    // Check if the piece is beyond the right edge of the chessboard
    else if(x > maxX) {
      activePiece.style.left = `${maxX}px`;
    }
    // If the piece is within the bounds of the chessboard, set its position to the mouse coordinates
    else {
      activePiece.style.left = `${x}px`;
    }

    // Ensure the piece stays within the bounds of the chessboard
    if(y < minY) {
      activePiece.style.top = `${minY}px`;
    } 
    // Check if the piece is beyond the bottom edge of the chessboard
    else if(y > maxY) {
      activePiece.style.top = `${maxY}px`;
    }
    // If the piece is within the bounds of the chessboard, set its position to the mouse coordinates
    else {
      activePiece.style.top = `${y}px`;
    }
  }
}

function dropPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  const chessboard = refChessboard.current
  if(activePiece && chessboard) {
    const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
    const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100));
    
    // Check if the move is valid using the Referee class
    setPieces((value) => {
      const pieces =value.map(p => {
        if(p.x == gridX && p.y == gridY) {
          const validMove =referee.isInvalidMove(gridX, gridY, x, y, p.type, p.team);

          if(validMove) {
            p.x = gridX;
            p.y = gridY;
          }
          else {
            activePiece.style.position = "relative";
            activePiece.style.removeProperty("top");
            activePiece.style.removeProperty("left");

          }
        }
        return p;
      })
      return pieces;
    });
    setActivePiece(null);
  }
}

let board = [];

  for(let i = verticalAxis.length - 1; i >= 0; i--) {
    for(let j = 0; j < horizontalAxis.length; j++) {
      const number = i + j + 2;
      let image = undefined;

      pieces.forEach(piece => {
        if(piece.x === j && piece.y === i) {
          image = piece.image;
        }
      })

      board.push(<Square key={`${j},${i}`} image={image} number={number}/>);
    }
  }

  return (
    <div onMouseMove={(e) => movePiece(e)} 
      onMouseDown={(e) => grabPiece(e)} 
      onMouseUp={(e) => dropPiece(e)}
      id="chessboard"
      ref={refChessboard}>
      {board}
    </div>
  );
}
