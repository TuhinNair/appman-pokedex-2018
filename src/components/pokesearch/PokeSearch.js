import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Pokemon } from '../../data/pokemon';
import PokeCard from '../pokecard/PokeCard';
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

const COLORS = {
    psychic: "#f8a5c2",
    fighting: "#f0932b",
    fairy: "#c44569",
    normal: "#f6e58d",
    grass: "#badc58",
    metal: "#95afc0",
    water: "#3dc1d3",
    lightning: "#f9ca24",
    darkness: "#574b90",
    colorless: "#FFF",
    fire: "#eb4d4b"
}

const useDidMount = () => {
    const mountRef = useRef(true);
    useEffect(() => { mountRef.current = false }, []);
    return () => mountRef.current;
}




const PokeSearch = ({ modalRef, onAddPokemon, pokemonIdsInPokeDex }) => {
    const [search, setSearch] = useState({ term: '', type: POKEMON_TYPES.psychic });
    const [notFound, setNotFound] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const didMount = useDidMount();

    useEffect(() => {
        const fetchPokemonLists = ({ term, type, handlePokemonList, setNotFound }) => {
            axios.get('http://localhost:3030/api/cards', {
                params: {
                    limit: 20,
                    name: term,
                    type: type
                }
            }).then(r => {
                let pokemons = r.data.cards.map(c => new Pokemon(c))
                handlePokemonList(pokemons);
            }).catch(e => {
                if (e.response) {
                    if (e.response.status === 404) {
                        setNotFound(true);
                    }
                } else {
                    console.log(e)
                }
            })

        }

        const handleUpdatePokemonList = (pokemons) => {
            setPokemonList(pokemons.filter(pk => !pokemonIdsInPokeDex.includes(pk.id)));
        }

        if (!didMount() && search.term) {
            setTimeout(() => {
                fetchPokemonLists({
                    term: search.term,
                    type: search.type,
                    handlePokemonList: handleUpdatePokemonList,
                    setNotFound: setNotFound,
                })
            }, 500);
        }

    }, [search])

    useEffect(() => {
        setPokemonList(pokemonList.filter(pk => !pokemonIdsInPokeDex.includes(pk.id)));
    }, [pokemonIdsInPokeDex])


    const handleUpdateSearchTerm = ({ target: { value } }) => {
        setSearch({ ...search, term: value });
    }

    const handleUpdateSearchType = (type) => {
        setSearch({ ...search, type: type })
    }

    return (
        <div className="modal">
            <div ref={modalRef} className="modal_content">
                <><div className="search_input">
                    <input
                        type="text"
                        value={search.term}
                        onChange={handleUpdateSearchTerm}
                        placeholder="Enter Pokemon Name.."
                    ></input>
                    <div className="type_button_pills">
                        {Object.entries(POKEMON_TYPES).map(([_, v]) => {
                            return <button key={v} style={typeStyles(v, search.type)} className="type_pill" onClick={() => handleUpdateSearchType(v)}>{v}</button>
                        })}
                    </div>
                </div>
                    <div className="card_container">
                        {notFound
                            ? <div>No pokemons found.</div>
                            : pokemonList.map(pk => <PokeCard key={pk.id} pokemon={pk} cardWidth={'100%'} onSelect={onAddPokemon} selectionText={"Add"} />)}
                    </div></>
            </div>
        </div>

    )
}


const typeStyles = (type, selected) => {
    let colorCode = COLORS[type];
    let isSelected = type === selected;
    let baseStyle = {
        borderColor: colorCode,
        color: 'black'
    }

    return { ...baseStyle, ...(isSelected && { color: colorCode, backgroundColor: '#3b3b3b' }) }
}


export default PokeSearch;