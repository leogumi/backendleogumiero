const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

describe('Router de Productos', () => {
    it('Debería obtener todos los productos', (done) => {
        request(app)
            .get('/api/products')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('Debería agregar un nuevo producto', (done) => {
        const nuevoProducto = {
            name: 'Pelota de Fútbol',
            price: 19.99,
            stock: 20,
        };

        request(app)
            .post('/api/products')
            .send(nuevoProducto)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('name', nuevoProducto.name);
                done();
            });
    });

    it('No debería agregar un producto con datos inválidos', (done) => {
        const productoInvalido = {
            price: 25.99,
            stock: 'diez',
        };

        request(app)
            .post('/api/products')
            .send(productoInvalido)
            .expect(400, done);
    });

    it('Debería obtener un producto específico', (done) => {

        const idProducto = '1';

        request(app)
            .get(`/api/products/${idProducto}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('_id', idProducto);
                done();
            });
    });

    it('Debería actualizar un producto existente', (done) => {

        const idProducto = '1';
        const datosActualizados = {
            name: 'Pelota de Rugby',
        };

        request(app)
            .put(`/api/products/${idProducto}`)
            .send(datosActualizados)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('name', datosActualizados.name);
                done();
            });
    });

    it('No debería actualizar un producto inexistente', (done) => {

        const idProductoInexistente = '999';
        const datosActualizados = {
            name: 'Pelota de Rugby',
        };

        request(app)
            .put(`/api/products/${idProductoInexistente}`)
            .send(datosActualizados)
            .expect(404, done);
    });

    it('Debería eliminar un producto existente'), (done)
})
