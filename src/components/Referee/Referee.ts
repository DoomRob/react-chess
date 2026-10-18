import { PieceType, TeamType, Piece} from "../Chessboard/Chessboard";

export default class Referee {
    titleOccupied(x: number, y: number, boardState: Piece[]): boolean {

        const piece = boardState.find(p => p.x === x && p.y === y);

        if(piece) {
            return true;
        } else {
            return false;
        }
    }

    isInvalidMove(
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

            if(px === x &&py === specialRow && y - py === 2 * pawnDirection) {
               if(!this.titleOccupied(x, y, boardState) && !this.titleOccupied(x, y - pawnDirection, boardState)) {
                    return true;
                }
            } else if(px === x && y - py === 1 * pawnDirection) {
                if(!this.titleOccupied(x, y, boardState)) {
                    return true;
                }
            }
        }
        return false;
    }
}
