import React, { useRef, useState } from 'react';
import './Chessboard.css';
import Square from '../Squares/Square';
import Referee from '../Referee/Referee';
import {VERTICAL_AXIS, 
  HORIZONTAL_AXIS, 
  GRID_SIZE,
  Piece, 
  TeamType, 
  PieceType, 
  initialBoardState, 
  Position,
  samePosition
} from '../../Contants';

export default function Chessboard() {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [grabPosition, setGrabPosition] = useState<Position>({x: -1, y: -1});
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const refChessboard = useRef<HTMLDivElement>(null);
  const referee = new Referee();

  function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const element = e.target as HTMLElement;
    const chessboard = refChessboard.current;
    if(element.classList.contains("chess-piece") && chessboard) {
      const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const grabY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE));
      setGrabPosition({x: grabX, y: grabY});
      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;
      element.style.position = "absolute";
      element.style.left = `${x - 40}px`;
      element.style.top = `${y - 40}px`;

      setActivePiece(element);
    }
  }

  function movePiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const chessboard = refChessboard.current;
      if(activePiece && chessboard) {
      const minX = chessboard.offsetLeft -25;
      const minY = chessboard.offsetTop - 25;
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
        const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
        const y = Math.abs(
          Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
        );

      const currentPiece = pieces.find(
        (p) => samePosition(p.position, grabPosition)
      );

      if(currentPiece) {
        const validMove = referee.isValidMove(
          grabPosition,
          {x, y},
          currentPiece.type, 
          currentPiece.team!, 
          pieces
        );

        const isEnPassantMove = referee.isEnPassantMove(
          grabPosition,
          {x, y},
          currentPiece.type, 
          currentPiece.team!,
          pieces
        );

        const pawnDirection = currentPiece.team === TeamType.PLAYER ? 1 : -1;

        if(isEnPassantMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if(samePosition(piece.position, grabPosition)){
              piece.enPassant = false;
              piece.position.x = x;
              piece.position.y = y;
              results.push(piece);
            } else if(!(samePosition(piece.position, { x, y: y - pawnDirection }))) {
              if(piece.type === PieceType.PAWN) {
                piece.enPassant = false;
              }
              results.push(piece);
            }
            return results;
          }, [] as Piece[]);

          setPieces(updatedPieces);
        } else if(validMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if(samePosition(piece.position, grabPosition)) {
              piece.enPassant = 
              Math.abs(grabPosition.y - y) === 2 && piece.type === PieceType.PAWN;
                piece.position.x = x;
                piece.position.y = y;
                results.push(piece);
            } else if(!(samePosition(piece.position, { x, y }))) {
              if(piece.type === PieceType.PAWN) {
                piece.enPassant = false;
              }
              results.push(piece);
            }

            return results;
          }, [] as Piece[]);

          setPieces(updatedPieces);

      } else {
          // Resets The Piece position if the move is invalid
          // And if a piece is attacked, it will not reset the position of the piece
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }
      setActivePiece(null);
    }
  }

  let board = [];

  for(let i = VERTICAL_AXIS.length - 1; i >= 0; i--) {
    for(let j = 0; j < HORIZONTAL_AXIS.length; j++) {

      const number = i + j + 2;

      const piece = pieces.find(
        (p) => samePosition(p.position, {x: j, y: i})
      );

      let image = piece ? piece.image : undefined;

      board.push(<Square key={`${j},${i}`} image={image} number={number}/>);
    }
  }

  return (
    <>
    <div onMouseMove={(e) => movePiece(e)} 
      onMouseDown={(e) => grabPiece(e)} 
      onMouseUp={(e) => dropPiece(e)}
      id="chessboard"
      ref={refChessboard}>
      {board}
    </div>
    </>
  );
}
