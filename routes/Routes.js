const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');
const pokemonController = require('../controllers/pokemonController');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const companiesController = require('../controllers/companiesController');
const productsController = require('../controllers/productsContoller');
const userdetailController = require('../controllers/userdetailController');
const authenticateToken = require('../middleware/authMiddleware');

/*
{
  "email": "admin@admin.com",
  "password": "1234",
  "name": "luis enrique san martin espinoza"
}
*/

// Ruta para el login
router.post('/login', loginController.login);
// Ruta para el registro
router.post('/register', userController.register);
// Ruta para obtener usuario
router.get('/user/get/:id', userdetailController.getUser);


//GET
//http://localhost:3000/trainer
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
router.put('/trainer/:id', authenticateToken, trainerController.updateTrainer);
//DELETE
//http://localhost:3000/trainer/2
router.delete('/trainer/:id', authenticateToken, trainerController.deleteTrainer);


//POST
//http://localhost:3000/company/register
/*
{
  "name": "inbursa", 
  "gire": "NA", 
  "category": "Ropa y Accesorios", 
  "direction": "San guillermo 140 coyoacan", 
  "long": "-93.26658", 
  "lat": "-1513.26658", 
  "image": "logo.png"
}
*/
router.post('/company/register', companiesController.createCompany);

//PUT
//http://localhost:3000/company/update/1
/*
{
  "name": "inbursa", 
  "gire": "NA", 
  "category": "Ropa y Accesorios", 
  "direction": "San guillermo 140 coyoacan", 
  "long": "-93.26658", 
  "lat": "-1513.26658", 
  "image": "logo.png"
}
*/
router.post('/company/update/:id', companiesController.updateCompany);

//DELETE
//http://localhost:3000/company/delete/1
router.delete('/company/delete/:id', companiesController.deleteCompany);

//GET
//http://localhost:3000/company/getall
router.get('/company/getall', companiesController.getAllCompanies);

//GET
//http://localhost:3000/company/get/1
router.get('/company/get/:id', companiesController.getCompany);

//POST
//http://localhost:3000/product/register
/*
{
  "id_company": 1, 
  "name": "sueter", 
  "category": "Ropa y Accesorios", 
  "price": 500.00,
  "description": "sueter color rojo",  
  "image": "logo.png"
}
*/
router.post('/product/register', productsController.createProduct);

//PUT
//http://localhost:3000/product/update/1
/*
{
  "id_company": 1, 
  "name": "sueter", 
  "category": "Ropa y Accesorios", 
  "price": 500.00,
  "description": "sueter color rojo",  
  "image": "logo.png"
}
*/
router.post('/product/update/:id', productsController.updateProduct);

//DELETE
//http://localhost:3000/product/delete/1
router.delete('/product/delete/:id', productsController.deleteProduct);

//GET
//http://localhost:3000/product/getall
router.get('/product/getall', productsController.getAllProducts);

//GET
//http://localhost:3000/product/get/1
router.get('/product/get/:id', productsController.getProduct);

module.exports = router;
