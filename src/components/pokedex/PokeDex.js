import React, {useState, useRef, useEffect} from 'react';
import PokeSearch from '../pokesearch/PokeSearch';
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

    const { ref, isSearchVisible, setIsSearchVisible} = useSearchToggle(false);

    const handleAddPokemon = (pokemon) => {
        setPokemonList([...pokemonList, pokemon]);
    }

    const handleToggleSearch = () => {
        setIsSearchVisible(true)
    }

    return (
        <div>
            {pokemonList.map(p => <span>{p.name}</span>)}
            <button onClick={handleToggleSearch}>Search</button>
            {isSearchVisible && <PokeSearch modalRef={ref} onAddPokemon={handleAddPokemon} />}
        </div>
    )
}

export default PokeDex;