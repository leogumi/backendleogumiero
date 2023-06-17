

const errorHandler = (err, req, res, next) => {
    // Manejar los errores específicos
    if (err.name === 'ValidationError') {
        const errors = [];
        for (let field in err.errors) {
            errors.push({
                field: field,
                message: err.errors[field].message
            });
        }
        res.status(400).json({ errors });
    } else {
        // Manejar otros errores
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = errorHandler;
