import { PieceType, TeamType, Piece} from "../Chessboard/Chessboard";

export default class Referee {
    titleOccupied(x: number, y: number, boardState: Piece[]): boolean {

        const piece = boardState.find(p => p.x === x && p.y === y);

        return
        if(piece) {
            return true;
        } else {
            return false;
        }
    }

    TitleIsOccupiedByOpponent(x: number, y: number, team: TeamType, boardState: Piece[]): boolean {
        const piece = boardState.find(p => p.x === x && p.y === y);
        if(piece) {
            return true;
        }
        else {
            return false;
        }
    }

    isEnPassantMove(        
        px: number, 
        py: number, 
        x: number, 
        y: number, 
        type: PieceType, 
        team: TeamType,
        boardState: Piece[]) {

        const pawnDirection = (team === TeamType.PLAYER) ? 1 : -1;

        if(type === PieceType.PAWN) {
            if((x -px === -1 || x - px === 1) && y - py === 1 * pawnDirection) {
                const piece = boardState.find(
                    p => p.x === x && p.y === y + pawnDirection && p.enPassant
                );

                if(piece) {
                    return true;
                }
            }
        }

        return false;
    }

    isValidMove(
        px: number, 
        py: number, 
        x: number, 
        y: number, 
        type: PieceType, 
        team: TeamType,
        boardState: Piece[]
    ) {
        if(type === PieceType.PAWN) {
            const specialRow = (team === TeamType.PLAYER) ? 1 : 6;
            const pawnDirection = (team === TeamType.PLAYER) ? 1 : -1;

            // Movement Logic for Pawn
            if(px === x &&py === specialRow && y - py === 2 * pawnDirection) {
               if(!this.titleOccupied(x, y, boardState) && !this.titleOccupied(x, y - pawnDirection, boardState)) {
                    return true;
                }
            } else if(px === x && y - py === 1 * pawnDirection) {
                if(!this.titleOccupied(x, y, boardState)) {
                    return true;
                }
            }
            // Capture Logic for Pawn
            else if(x -px === -1 && y - py === 1 * pawnDirection) {
                // Attack In Upper Left Diagonal
                if(this.TitleIsOccupiedByOpponent(x, y, team, boardState)) {
                    return true;
                }
            } else if(x - px === 1 && y - py === 1 * pawnDirection) {
                // Attack In Upper or Bottom Right Diagonal
                if(this.TitleIsOccupiedByOpponent(x, y, team, boardState)) {
                    return true;
                }
            }      
        }
        return false;
    }
}
