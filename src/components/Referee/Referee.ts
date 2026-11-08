import { PieceType, TeamType, Piece, Position } from "../../Contants";

export default class Referee {
    titleOccupied(x: number, y: number, boardState: Piece[]): boolean {

        const piece = boardState.find(p => p.position.x === x && p.position.y === y);

        if(piece) {
            return true;
        } else {
            return false;
        }
    }

    titleIsOccupiedByOpponent(x: number, y: number, team: TeamType, boardState: Piece[]): boolean {
        const piece = boardState.find(p => p.position.x === x && p.position.y === y);
        if(piece) {
            return true;
        }
        else {
            return false;
        }
    }

    isEnPassantMove(        
        initialPosition: Position, 
        desiredPosition: Position,
        type: PieceType, 
        team: TeamType,
        boardState: Piece[]) {

        const pawnDirection = (team === TeamType.PLAYER) ? 1 : -1;

        if(type === PieceType.PAWN) {
            if((desiredPosition.x - initialPosition.x === -1 || desiredPosition.x - initialPosition.x === 1) && desiredPosition.y - initialPosition.y === pawnDirection) {
                const piece = boardState.find(
                    (p) => p.position.x === desiredPosition.x && 
                    p.position.y === desiredPosition.y - pawnDirection && 
                    p.enPassant
                );

                if(piece) {
                    return true;
                }
            }
        }

        return false;
    }

    isValidMove(
        initialPosition: Position, 
        desiredPosition: Position,
        type: PieceType, 
        team: TeamType,
        boardState: Piece[]
    ) {
        if(type === PieceType.PAWN) {
            const specialRow = (team === TeamType.PLAYER) ? 1 : 6;
            const pawnDirection = (team === TeamType.PLAYER) ? 1 : -1;

            // Movement Logic for Pawn
            if(initialPosition.x === desiredPosition.x && initialPosition.y === specialRow && desiredPosition.y - initialPosition.y === 2 * pawnDirection) {
               if(
                !this.titleOccupied(desiredPosition.x, desiredPosition.y, boardState) && 
                !this.titleOccupied(desiredPosition.x, desiredPosition.y - pawnDirection, boardState)) {
                    return true;
                }
            } else if(initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === 1 * pawnDirection) {
                if(!this.titleOccupied(desiredPosition.x, desiredPosition.y, boardState)) {
                    return true;
                }
            }
            // Capture Logic for Pawn
            else if(desiredPosition.x -initialPosition.x === -1 && desiredPosition.y - initialPosition.y === 1 * pawnDirection) {
                // Attack In Upper Left Diagonal
                if(this.titleIsOccupiedByOpponent(desiredPosition.x, desiredPosition.y, team, boardState)) {
                    return true;
                }
            } else if(desiredPosition.x - initialPosition.x === 1 && desiredPosition.y - initialPosition.y === 1 * pawnDirection) {
                // Attack In Upper or Bottom Right Diagonal
                if(this.titleIsOccupiedByOpponent(desiredPosition.x, 
                    desiredPosition.y, 
                    team, 
                    boardState)) {
                    return true;
                }
            }      
        }
        return false;
    }
}
