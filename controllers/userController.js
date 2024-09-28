const User = require('../models/User'); // Asegúrate de que la ruta sea correcta
const bcrypt = require('bcrypt'); // Para hashear contraseñas

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    // Responder con el usuario creado (sin el password)
    res.status(201).json({
      id: user.id,
      username: user.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};