const Products = require('../models/Products');

async function getAllProducts(req, res) {
    try {
        const products = await Products.findAll();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error to get products' });
    }
}

async function createProduct(req, res) {
    const { id_company, name, category, price, description, image } = req.body;

    try {
        const product = await Products.create({
            id_company, 
            name, 
            category, 
            price, 
            description, 
            image
        });

        res.status(201).json({
            message: 'product created successfully',
            product
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Error to create product' });
    }
}

async function getProduct (req, res){
    const id = req.params.id;
    try {

        const product = await Products.findByPk(id);

        if (product) {
            res.json({
                product_image: product.image,
                product_name: product.name,
                product_price: product.price
            });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'SERVER ERROR' });
    }
}

async function updateProduct(req, res) {
    const id = parseInt(req.params.id, 10);
    const { id_company, name, category, price, description, image } = req.body;
    try {
        const product = await Products.findByPk(id);
        if (company) {
            await product.update({
                id_company, 
                name, 
                category, 
                price, 
                description, 
                image
            });

            res.status(201).json({
                message: 'Product updated successfully',
                product
            });
        }else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating Product' });
    }
}


async function deleteProduct(req, res) {
    const id = parseInt(req.params.id, 10);
    try {
        const product = await Products.findByPk(id);
        if (product) {
            await product.destroy();

            res.status(200).json({
                message: 'Product deleted successfully',
                product
            });
        }else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting Product' });
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
