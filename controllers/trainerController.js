const Trainer = require('../models/Trainer');
const axios = require('axios');

async function getAllTrainers(req, res) {
    try {
        const trainers = await Trainer.findAll();
        res.json(trainers);
    } catch (error) {
        console.error('Error fetching trainers:', error);
        res.status(500).json({ error: 'Error to get trainers' });
    }
}

async function createTrainer(req, res) {
    const { trainer_name, trainer_age, num_pokedex } = req.body;

    try {
        const trainer = await Trainer.create({
            trainer_name,
            trainer_age,
            num_pokedex
        });

        res.status(201).json({
            message: 'Trainer created successfully',
            trainer
        });
    } catch (error) {
        console.error('Error creating trainer:', error);
        res.status(500).json({ error: 'Error to create trainer' });
    }
}

async function getTrainerAndPokemonName (req, res){
    const id = req.params.id;
    try {

        const trainer = await Trainer.findByPk(id);

        if (trainer) {
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
    }
}

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



async function updateTrainer(req, res) {
    const id = parseInt(req.params.id, 10);
    const { trainer_name, trainer_age, num_pokedex } = req.body;
    try {
        const trainer = await Trainer.findByPk(id);
        if (trainer) {
            await trainer.update({
                trainer_name,
                trainer_age,
                num_pokedex
            });

            res.status(201).json({
                message: 'Trainer updated successfully',
                trainer
            });
        }else {
            res.status(404).json({ error: 'Trainer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating trainer' });
    }
}


async function deleteTrainer(req, res) {
    const id = parseInt(req.params.id, 10);
    try {
        const trainer = await Trainer.findByPk(id);
        if (trainer) {
            await trainer.destroy();

            res.status(200).json({
                message: 'Trainer deleted successfully',
                trainer
            });
        }else {
            res.status(404).json({ error: 'Trainer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting trainer' });
    }
}

module.exports = {
    getAllTrainers,
    getTrainerAndPokemonName,
    createTrainer,
    updateTrainer,
    deleteTrainer
};
