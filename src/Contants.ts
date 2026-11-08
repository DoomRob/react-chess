export const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const GRID_SIZE = 100; // Size of each square in pixels

export function samePosition(pos1: Position, pos2: Position) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

export interface Position {
  x: number;
  y: number;
}

export enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING
}

export interface Piece {
  image: string; 
  position: Position;
  type: PieceType; 
  team: TeamType, 
  enPassant?: boolean;
}

export enum TeamType {
  OPPONENT,
  PLAYER
}

export const initialBoardState: Piece[] = [
    {
        // Black pieces
        image: "assets/images/rook_black.png", 
        position: { x: 0, y: 7 },
        type: PieceType.ROOK, 
        team: TeamType.OPPONENT
    },
    {
        image: "assets/images/knight_black.png", 
        position: { x: 1, y: 7 },
        type: PieceType.KNIGHT, 
        team: TeamType.OPPONENT
    },
    {
        image: "assets/images/bishop_black.png", 
        position: { x: 2, y: 7 },
        type: PieceType.BISHOP, 
        team: TeamType.OPPONENT
    },
    {
        image: "assets/images/queen_black.png", 
        position: { x: 3, y: 7 },
        type: PieceType.QUEEN, 
        team: TeamType.OPPONENT
    },
    {
        image: "assets/images/king_black.png", 
        position: { x: 4, y: 7 },
        type: PieceType.KING, 
        team: TeamType.OPPONENT
    },
    {
        image: "assets/images/bishop_black.png", 
        position: { x: 5, y: 7 },
        type: PieceType.BISHOP, 
        team: TeamType.OPPONENT
    },
    {
        image: "assets/images/knight_black.png", 
        position: { x: 6, y: 7 },
        type: PieceType.KNIGHT, 
        team: TeamType.OPPONENT
    },
    {
        image: "assets/images/rook_black.png", 
        position: { x: 7, y: 7 },
        type: PieceType.ROOK, 
        team: TeamType.OPPONENT
    },
    {
        image: "assets/images/pawn_black.png", 
        position: { x: 0, y: 6 },
        type: PieceType.PAWN, 
        team: TeamType.OPPONENT
    },
    {
        image: "assets/images/pawn_black.png", 
        position: { x: 1, y: 6 },
        type: PieceType.PAWN, 
        team: TeamType.OPPONENT
    },
    {
        image: "assets/images/pawn_black.png", 
        position: { x: 2, y: 6 },
        type: PieceType.PAWN, 
        team: TeamType.OPPONENT
    },
    {
        image: "assets/images/pawn_black.png", 
        position: { x: 3, y: 6 },
        type: PieceType.PAWN, 
        team: TeamType.OPPONENT
    },
    {
        image: "assets/images/pawn_black.png", 
        position: { x: 4, y: 6 },
        type: PieceType.PAWN, 
        team: TeamType.OPPONENT
    },
    {
        image: "assets/images/pawn_black.png", 
        position: { x: 5, y: 6 },
        type: PieceType.PAWN, 
        team: TeamType.OPPONENT
    },
    {
        image: "assets/images/pawn_black.png", 
        position: { x: 6, y: 6 },
        type: PieceType.PAWN, 
        team: TeamType.OPPONENT
    },
    {
        image: "assets/images/pawn_black.png", 
        position: { x: 7, y: 6 },
        type: PieceType.PAWN, 
        team: TeamType.OPPONENT
    },
    // White pieces
    {
        image: "assets/images/rook_white.png", 
        position: { x: 0, y: 0 },
        type: PieceType.ROOK, 
        team: TeamType.PLAYER
    },
    {
        image: "assets/images/knight_white.png", 
        position: { x: 1, y: 0 },
        type: PieceType.KNIGHT, 
        team: TeamType.PLAYER
    },
    {
        image: "assets/images/bishop_white.png", 
        position: { x: 2, y: 0 },
        type: PieceType.BISHOP, 
        team: TeamType.PLAYER
    },
    {
        image: "assets/images/queen_white.png", 
        position: { x: 3, y: 0 },
        type: PieceType.QUEEN, 
        team: TeamType.PLAYER
    },
    {
        image: "assets/images/king_white.png", 
        position: { x: 4, y: 0 },
        type: PieceType.KING, 
        team: TeamType.PLAYER
    },
    {
        image: "assets/images/bishop_white.png", 
        position: { x: 5, y: 0 },
        type: PieceType.BISHOP, 
        team: TeamType.PLAYER
    },
    {
        image: "assets/images/knight_white.png", 
        position: { x: 6, y: 0 },
        type: PieceType.KNIGHT, 
        team: TeamType.PLAYER
    },
    {
        image: "assets/images/rook_white.png", 
        position: { x: 7, y: 0 },
        type: PieceType.ROOK, 
        team: TeamType.PLAYER
    },
    {
        image: "assets/images/pawn_white.png", 
        position: { x: 0, y: 1 },
        type: PieceType.PAWN, 
        team: TeamType.PLAYER
    },
    {
        image: "assets/images/pawn_white.png", 
        position: { x: 1, y: 1 },
        type: PieceType.PAWN, 
        team: TeamType.PLAYER
    },
    {
        image: "assets/images/pawn_white.png", 
        position: { x: 2, y: 1 },
        type: PieceType.PAWN, 
        team: TeamType.PLAYER
    },
    {
        image: "assets/images/pawn_white.png", 
        position: { x: 3, y: 1 },
        type: PieceType.PAWN, 
        team: TeamType.PLAYER
    },
    {
        image: "assets/images/pawn_white.png", 
        position: { x: 4, y: 1 },
        type: PieceType.PAWN, 
        team: TeamType.PLAYER
    },
    {
        image: "assets/images/pawn_white.png", 
        position: { x: 5, y: 1 },
        type: PieceType.PAWN, 
        team: TeamType.PLAYER
    },
    {
        image: "assets/images/pawn_white.png", 
        position: { x: 6, y: 1 },
        type: PieceType.PAWN, 
        team: TeamType.PLAYER
    },
    {
        image: "assets/images/pawn_white.png", 
        position: { x: 7, y: 1 },
        type: PieceType.PAWN, 
        team: TeamType.PLAYER
    }
];