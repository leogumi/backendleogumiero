function generateId() {
    //Generar un número aleatorio entre 1 y 100000
    const randomNumber = Math.floor(Math.random() * 100000) + 1;
    //Convertir el número a string y agregar ceros a la izquierda para que tenga 5 dígitos
    const paddedNumber = randomNumber.toString().padStart(5, '0');
    //Crear el id concatenando la fecha actual en formato ISO y el número generado
    const id = new Date().toISOString().slice(0, 10).replace(/-/g, '') + paddedNumber;
    return id;
}

module.exports = { generateId };
