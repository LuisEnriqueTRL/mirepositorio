const Companies = require('../models/Companies');

async function getAllCompanies(req, res) {
    try {
        const companies = await Companies.findAll();
        res.json(companies);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ error: 'Error to get companies' });
    }
}

async function createCompany(req, res) {
    const { name, gire, category, direction, long, lat, image } = req.body;

    try {
        const company = await Companies.create({
            name, 
            gire, 
            category, 
            direction, 
            long, 
            lat, 
            image
        });

        res.status(201).json({
            message: 'Company created successfully',
            company
        });
    } catch (error) {
        console.error('Error creating company:', error);
        res.status(500).json({ error: 'Error to create company' });
    }
}

async function getCompany (req, res){
    const id = req.params.id;
    try {

        const company = await Companies.findByPk(id);

        if (company) {
            res.json({
                company_image: company.image,
                company_name: company.name,
                company_gire: company.gire
            });
        } else {
            res.status(404).json({ error: 'Company not found' });
        }
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'SERVER ERROR' });
    }
}

async function updateCompany(req, res) {
    const id = parseInt(req.params.id, 10);
    const { name, gire, category, direction, long, lat, image } = req.body;
    try {
        const company = await Companies.findByPk(id);
        if (company) {
            await company.update({
                name, 
                gire, 
                category, 
                direction, 
                long, 
                lat, 
                image
            });

            res.status(201).json({
                message: 'Company updated successfully',
                company
            });
        }else {
            res.status(404).json({ error: 'Company not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating Company' });
    }
}


async function deleteCompany(req, res) {
    const id = parseInt(req.params.id, 10);
    try {
        const company = await Companies.findByPk(id);
        if (company) {
            await company.destroy();

            res.status(200).json({
                message: 'Company deleted successfully',
                company
            });
        }else {
            res.status(404).json({ error: 'Company not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting Company' });
    }
}

module.exports = {
    getAllCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany
};
