require('dotenv').config();
const { Client } = require('pg');

const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

//ACTIVIDAD 1 ///////////////////////////////////////////////////////////////////////
async function fetchPokemons(page = 1) {
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

//GET
//http://localhost:3000/pokemons?page=12
app.get('/pokemons', async (req, res) => {
    const page = parseInt(req.query.page) || 1;

    try {
        const pokemonData = await fetchPokemons(page);
        res.json(pokemonData);
    } catch (error) {
        res.status(500).json({ error: 'Error to get Pokémon' });
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ACTIVIDAD 2 ///////////////////////////////////////////////////////////////////////
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

//GET
//http://localhost:3000/pokemon/7
app.get('/pokemon/:number', async (req, res) => {
    const number = req.params.number;

    try {
        const pokemonData = await fetchPokemonByNumber(number);

        res.json(pokemonData);
    } catch (error) {
        res.status(500).json({ error: 'Error to get Pokémon data' });
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ACTIVIDAD 3 ///////////////////////////////////////////////////////////////////////
async function fetchPokemonNameByNumber(number) {
    const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
    try {
        const url = `${BASE_URL}${number}/`;
        const response = await axios.get(url);
        const data = response.data;
        return data.name;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

//GET
//http://localhost:3000/trainer/1
app.get('/trainer/:id', async (req, res) => {
    const id = req.params.id;
    const client = new Client({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
    });
    try {
        await client.connect();

        const result = await client.query('SELECT * FROM trainers WHERE id = $1', [id]);

        if (result.rows.length > 0) {
            const trainer = result.rows[0];
            const num_pokedex = trainer.num_pokedex;
            const pokemonName = await fetchPokemonNameByNumber(num_pokedex);

            res.json({
                trainer_name: trainer.trainer_name,
                trainer_age: trainer.trainer_age,
                num_pokedex: num_pokedex,
                pokemon_name: pokemonName
            });
        } else {
            res.status(404).json({ error: 'Trainer not found' });
        }
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'SERVER ERROR' });
    } finally {
        await client.end();
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ACTIVIDAD 4 ///////////////////////////////////////////////////////////////////////
async function createTrainer(name, age, num_pokedex) {
    const client = new Client({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
    });
    try {
        await client.connect();

        const query = 'INSERT INTO trainers (trainer_name, trainer_age, num_pokedex) VALUES ($1, $2, $3)';
        const values = [name, age, num_pokedex];

        await client.query(query, values);

        console.log(`Trainer ${name} create succesful.`);
        return { message: `Trainer ${name} create succesful.` };
    } catch (error) {
        console.error('Error to create trainer:', error);
        throw new Error('Error to create trainer');
    } finally {
        await client.end();
    }
}

//POST
//http://localhost:3000/trainer

/*
{
  "name": "Luis Enrique",
  "age": 27,
  "num_pokedex": 25
}
*/
app.post('/trainer', async (req, res) => {
    const { name, age, num_pokedex } = req.body;

    try {
        const result = await createTrainer(name, age, num_pokedex);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ACTIVIDAD 5 ///////////////////////////////////////////////////////////////////////
async function updateTrainer(id, name, age, num_pokedex) {
    const client = new Client({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
    });
    try {
        await client.connect();

        const query = `
            UPDATE trainers
            SET trainer_name = $1, trainer_age = $2, num_pokedex = $3
            WHERE id = $4
        `;
        const values = [name, age, num_pokedex, id];

        const res = await client.query(query, values);

        if (res.rowCount > 0) {
            console.log(`Trainer ID ${id} Update successful.`);
            return { message: `Trainer ID ${id} Update successful.` };
        } else {
            console.log(`Trainer ID not found ${id}.`);
            return { message: `Trainer ID not found ${id}.` };
        }
    } catch (error) {
        console.error('Error Trainer Update:', error);
        throw new Error('Error Trainer Update');
    } finally {
        await client.end();
    }
}

//PUT
//http://localhost:3000/trainer/2

/*
{
  "name": "Luis Enrique",
  "age": 27,
  "num_pokedex": 30
}
*/
app.put('/trainer/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, age, num_pokedex } = req.body;

    try {
        const result = await updateTrainer(id, name, age, num_pokedex);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ACTIVIDAD 6 ///////////////////////////////////////////////////////////////////////
async function deleteTrainer(id) {
    const client = new Client({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
    });
    try {
        await client.connect();

        const query = 'DELETE FROM trainers WHERE id = $1';
        const values = [id];

        const res = await client.query(query, values);

        if (res.rowCount > 0) {
            console.log(`Trainer ID ${id} delete successful.`);
            return { message: `Trainer ID ${id} delete successful.` };
        } else {
            console.log(`Trainer ID not found ${id}.`);
            return { message: `Trainer ID not found ${id}.` };
        }
    } catch (error) {
        console.error('Error Delete trainer:', error);
        throw new Error('Error Delete trainer');
    } finally {
        await client.end();
    }
}

//DELETE
//http://localhost:3000/trainer/2
app.delete('/trainer/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        const result = await deleteTrainer(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Iniciar el servidor
app.listen(port, () => {
    console.log(`SERVER STARTING http://localhost:${port}`);
});