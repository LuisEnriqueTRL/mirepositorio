const User = require('../models/User');

async function getUser (req, res){
    const id = req.params.id;
    try {
        const user = await User.findByPk(id);

        if (user) {
            res.json({
                user_name: user.name,
                user_email: user.email
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'SERVER ERROR' });
    }
}

module.exports = {
    getUser
};
