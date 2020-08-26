import React, { Children } from 'react';
import './style.css';

const PokeCard = ({ pokemon, onSelect, selectionText, cardWidth }) => {
    const { name, type, imageUrl, hp, strength, weakness, damage, happiness } = pokemon;
    return (
        <>
            <div style={{ width: cardWidth }} className="container">
                
                <div className="image_container">
                    <img src={imageUrl} className="card_image" alt={name} />
                </div>
                <div className="details">
                    <Row title={"Name"}>
                        <div className="name_row">
                        <span className="name_title">{name}</span>
                        <span className="select_to_action" onClick={() => onSelect(pokemon)}>{selectionText}</span>
                        </div>
                    </Row>
                    <Row title={"Type"}>{type}</Row>
                    <Row title={"HP"}><DataTube value={hp} /></Row>
                    <Row title={"Strength"}><DataTube value={strength}/></Row>
                    <Row title={"Weakness"}><DataTube value={weakness}/></Row>
                    <Row title={"Damage"}><DataTube value={damage}/></Row>
                    <Row title={"Happiness"}><HappinessBar happiness={happiness}/></Row>

                </div>
            </div>
        </>
    )
}

const Row = ({ title, children }) =>
    <div className="card_row">
        <div className="row_title">
            <span>{title}: &nbsp;</span>
        </div>
        <div className="row_data">
            {children}
        </div>
    </div>


const DataTube = ({value}) => {
    let tube_width = value > 100 ? `100%` : `${value}%`


    return (
    <>
    <div className="data_tube"></div>
    <div style={{width: tube_width}} className="value_tube"></div>
    </>
    )
}

const HappinessBar = ({happiness}) => {
    let blobs = new Array(happiness).fill(<img className="happiness_blob" src="happy.png"/>);

    return (
        <>
        <div className="happiness_bar">
            {blobs.map((b) => b)}
        </div>
        </>
    )
}



export default PokeCard;
