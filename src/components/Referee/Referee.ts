import { PieceType, TeamType} from "../Chessboard/Chessboard";

export default class Referee {
    isInvalidMove(px: number, py: number, x: number, y: number, type: PieceType, team: TeamType) {
        if (type === PieceType.PAWN) {
            if (team === TeamType.PLAYER) {
                if(py === 1) {
                    if(px === x && (py + 1 === y || py + 2 === y)) {
                        return true;
                    }
                } 
                else {
                    if(px === x && y - py === 1) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}