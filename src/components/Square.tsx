import "./Square.css";

interface Props {
    image?: string;
    number: number;
}

export default function Square({image, number}: Props) {
    if (number % 2 === 0) {
        return <div className="square black-square">
            {image && <div style ={{backgroundImage: `url(${image})`}} className="chess-piece"></div>}
        </div>
    } else {
        return <div className="square white-square">
            {image &&<div style ={{backgroundImage: `url(${image})`}} className="chess-piece"></div>}
        </div>
    }
}
