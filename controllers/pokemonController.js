const axios = require('axios');

async function getPokemonsPage(req, res) {
    const page = parseInt(req.query.page) || 1;

    try {
        const pokemonData = await fetchPagePokemons(page);
        res.json(pokemonData);
    } catch (error) {
        res.status(500).json({ error: 'Error to get Pokémon' });
    }
}

async function fetchPagePokemons(page = 1) {
    const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
    const PAGE_SIZE = 20; 
    try {
        
        const offset = (page - 1) * PAGE_SIZE;
        const url = `${BASE_URL}?offset=${offset}&limit=${PAGE_SIZE}`;

        const response = await axios.get(url);
        const data = response.data;

        return {
            currentPage: page,
            totalPokemons: data.count,
            totalPages: Math.ceil(data.count / PAGE_SIZE),
            pokemons: data.results
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getPokemon(req, res) {
    const number = req.params.number;

    try {
        const pokemonData = await fetchPokemonByNumber(number);

        res.json(pokemonData);
    } catch (error) {
        res.status(500).json({ error: 'Error to get Pokémon data' });
    }
}

async function fetchPokemonByNumber(number) {
    const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
    try {
        const url = `${BASE_URL}${number}/`;
        const response = await axios.get(url);
        const data = response.data;

        return {
            id: data.id,
            name: data.name,
            height: data.height,
            weight: data.weight,
            types: data.types.map(typeInfo => typeInfo.type.name),
            abilities: data.abilities.map(abilityInfo => abilityInfo.ability.name)
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

module.exports = {
    getPokemonsPage,
    getPokemon
};