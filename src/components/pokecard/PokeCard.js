import React from 'react'
import './style.css'

export const PokeCard = ({ id, name, type, imageUrl, hp, strength, weakness, damage, happiness }) => {
    return (
        <>
            <div className="container">
                <div className="image_container">
                    <img src={imageUrl} className="card_image" alt={name}/>
                </div>
                <div className="details">
                    <span>Name: &nbsp;{name}</span>
                    <span>Type: &nbsp;{type}</span>
                    <span>HP: &nbsp;{hp}</span>
                    <span>Strength: &nbsp;{strength}</span>
                    <span>Weakness: &nbsp;{weakness}</span>
                    <span>Damage: &nbsp;{damage}</span>
                    <span>Happiness: &nbsp;{happiness}</span>
                </div>
            </div>
        </>
    )
}
