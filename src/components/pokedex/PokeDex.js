import React, { useState, useRef, useEffect } from 'react';
import PokeSearch from '../pokesearch/PokeSearch';
import PokeCard from '../pokecard/PokeCard';
import './style.css'

const useSearchToggle = (initialState) => {
    const [isSearchVisible, setIsSearchVisible] = useState(initialState);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsSearchVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return { ref, isSearchVisible, setIsSearchVisible };
}


const PokeDex = () => {
    const [pokemonList, setPokemonList] = useState([]);

    const { ref, isSearchVisible, setIsSearchVisible } = useSearchToggle(false);

    const handleAddPokemon = (pokemon) => {
        setPokemonList([...pokemonList, pokemon]);
    }

    const handleToggleSearch = () => {
        setIsSearchVisible(true);
    }

    const handleRemovePokemon = (pokemon) => {
        setPokemonList(pokemonList.filter(pk => pk.id !== pokemon.id));
    }

    return (
        <div className="pokedex">
            <div className="pokedex_list">
                {pokemonList.map(pk => <PokeCard key={pk.id} pokemon={pk} onSelect={handleRemovePokemon} selectionText={'X'} cardWidth={'40%'} />)}
            </div>
            <div className="pokedex_footer">
                <button onClick={handleToggleSearch}>Search</button>
                {isSearchVisible && <PokeSearch modalRef={ref} onAddPokemon={handleAddPokemon} />}
            </div>

        </div>
    )
}

export default PokeDex;