import "./Square.css";

interface Props {
    image?: string;
    number: number;
}

export default function Square({number, image}: Props) {
    if(number % 2 === 0) {
        return (<div className="black-square">
            <img src={image} alt="" />
        </div>
        );
    } else {
        return (<div className="white-square">
            <img src={image} alt="" />
        </div>
        );
    }
}