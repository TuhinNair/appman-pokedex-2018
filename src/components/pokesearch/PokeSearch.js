import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {Pokemon} from '../../data/pokemon';
import {PokeCard} from '../pokecard/PokeCard';
import './style.css'

const POKEMON_TYPES = {
    psychic: "psychic",
    fighting: "fighting",
    fairy: "fairy",
    grass: "grass",
    metal: "metal",
    water: "water",
    lightning: "lightning",
    darkness: "darkness",
    colorless: "colorless",
    fire: "fire"
}

const useDidMount = () => {
    const mountRef = useRef(true);

    useEffect(() => {mountRef.current = false}, []);

    return () => mountRef.current;
}

const fetchPokemonLists = ({ term, type, setPokemonList, setNotFound }) => {
    axios.get('http://localhost:3030/api/cards', {
        params: {
            limit: 20,
            name: term,
            type: type
        }
    }).then(r => {
        let pokemons = r.data.cards.map(c => new Pokemon(c))
        setPokemonList(pokemons);
    }).catch(e => {
        if (e.response.status === 404) {
            setNotFound(true);
        }
    })
}

const PokeSearch = () => {
    const [search, setSearch] = useState({ term: '', type: POKEMON_TYPES.grass });
    const [notFound, setNotFound] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);

    const didMount = useDidMount();

    useEffect(() => {
        if (!didMount() && search.term) {
            setTimeout(() => {
                fetchPokemonLists({
                    term: search.term,
                    type: search.type,
                    setPokemonList: setPokemonList,
                    setNotFound: setNotFound,
                })
            }, 50);
        }   
    }, [search])

    const handleUpdateSearchTerm = ({ target: { value } }) => {
        setSearch({ ...search, term: value });
    }

    return (
        <div className="modal">
            <div className="modal_content">
            <div>
                <input
                    type="text"
                    value={search.term}
                    onChange={handleUpdateSearchTerm}
                ></input>
            </div>
            <div className="card_container">
                {notFound 
                ? <div>Not Found</div> 
                : pokemonList.map(pk => <PokeCard key={pk.id} {...pk} />)}
                {}
            </div>
            </div>
        </div>
            
    )
}

export default PokeSearch;