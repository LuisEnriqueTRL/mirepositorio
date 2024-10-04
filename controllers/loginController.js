const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Asegúrate de que la ruta sea correcta
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario en la base de datos
    const user = await User.findOne({ where: { email } });

    // Verificar si el usuario existe y la contraseña es correcta
    if (user && await bcrypt.compare(password, user.password)) {
      const payload = {
        id: user.id,
        email: user.email,
        role: 'super_admin', // O recupera el rol del usuario si lo tienes
      };

      // Generar el token
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Responder con el token
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};
