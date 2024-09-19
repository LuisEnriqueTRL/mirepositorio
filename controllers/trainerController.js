const Trainer = require('../models/Trainer');

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

        res.status(201).json(trainer);
    } catch (error) {
        console.error('Error creating trainer:', error);
        res.status(500).json({ error: 'Error to create trainer' });
    }
}

module.exports = {
    getAllTrainers,
    createTrainer
};
