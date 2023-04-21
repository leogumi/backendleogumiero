// Objeto con algunos usuarios predefinidos (para propósitos de demostración)
const users = [
    { username: 'user1', password: '1234', role: 'user' },
    { username: 'admin', password: 'admin123', role: 'admin' }
];

// Ruta para procesar el formulario de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Buscar al usuario en el objeto "users"
    const user = users.find(u => u.username === username && u.password === password);

    // Si el usuario no existe o la contraseña es incorrecta, redirigir a la página de login con un mensaje de error
    if (!user) {
        res.render('login', { error: 'Nombre de usuario o contraseña incorrecta' });
        return;
    }

    // Si el usuario existe y la contraseña es correcta, crear una sesión y redirigir a la página de productos
    req.session.user = { username: user.username, role: user.role };
    res.redirect('/products');
});
