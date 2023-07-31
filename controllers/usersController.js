const User = require('../models/userModel');

exports.actualizarRolPremium = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await User.findById(uid);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (!user.documents.some(doc => doc.name === 'Identificación')
            || !user.documents.some(doc => doc.name === 'Comprobante de domicilio')
            || !user.documents.some(doc => doc.name === 'Comprobante de estado de cuenta')) {
            return res.status(400).json({ message: 'El usuario no ha terminado de procesar su documentación' });
        }
        
        user.role = 'premium';
        await user.save();

        return res.status(200).json({ message: 'Usuario actualizado a premium exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
