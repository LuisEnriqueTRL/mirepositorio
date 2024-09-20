const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');
const pokemonController = require('../controllers/pokemonController');


router.get('/trainer', trainerController.getAllTrainers);
//GET
//http://localhost:3000/pokemons?page=12
router.get('/pokemons', pokemonController.getPokemonsPage);
//GET
//http://localhost:3000/pokemon/7
router.get('/pokemon/:number', pokemonController.getPokemon);
//GET
//http://localhost:3000/trainer/1
router.get('/trainer/:id', trainerController.getTrainerAndPokemonName);
//POST
//http://localhost:3000/trainer
/*
{
  "trainer_name": "Luis Enrique",
  "trainer_age": 27,
  "num_pokedex": 25
}
*/
router.post('/trainer', trainerController.createTrainer);
//PUT
//http://localhost:3000/trainer/2
/*
{
  "trainer_name": "Luis Enrique",
  "trainer_age": 27,
  "num_pokedex": 25
}
*/
router.put('/trainer/:id', trainerController.updateTrainer);
//DELETE
//http://localhost:3000/trainer/2
router.delete('/trainer/:id', trainerController.deleteTrainer);

module.exports = router;
