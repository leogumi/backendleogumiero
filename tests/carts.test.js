const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

describe('Router de Carritos', () => {
    it('Debería obtener todos los carritos', (done) => {
        request(app)
            .get('/api/carts')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('Debería agregar un nuevo carrito', (done) => {
        const nuevoCarrito = {
            user: 'correo@example.com',
            products: [{ productId: '1', quantity: 2 }, { productId: '2', quantity: 3 }],
        };

        request(app)
            .post('/api/carts')
            .send(nuevoCarrito)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('user', nuevoCarrito.user);
                done();
            });
    });

    it('No debería agregar un carrito con datos inválidos', (done) => {
        const carritoInvalido = {
            user: 'correo@example.com',
            products: [{ productId: '1', quantity: -2 }],
        };

        request(app)
            .post('/api/carts')
            .send(carritoInvalido)
            .expect(400, done);
    });

    it('Debería obtener un carrito específico', (done) => {

        const idCarrito = '1';

        request(app)
            .get(`/api/carts/${idCarrito}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('_id', idCarrito);
                done();
            });
    });

    it('Debería actualizar un carrito existente', (done) => {

        const idCarrito = '1';
        const datosActualizados = {
            products: [{ productId: '3', quantity: 1 }],
        };

        request(app)
            .put(`/api/carts/${idCarrito}`)
            .send(datosActualizados)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('products').that.deep.equals(datosActualizados.products);
                done();
            });
    });

    it('No debería actualizar un carrito inexistente', (done) => {

        const idCarritoInexistente = '999';
        const datosActualizados = {
            products: [{ productId: '3', quantity: 1 }],
        };

        request(app)
            .put(`/api/carts/${idCarritoInexistente}`)
            .send(datosActualizados)
            .expect(404, done);
    });

    it('Debería eliminar un carrito existente', (done) => {

        const idCarrito = '1';

        request(app)
            .delete(`/api/carts/${idCarrito}`)
            .expect(200, done);
    });

    it('No debería eliminar un carrito inexistente', (done) => {

        const idCarritoInexistente = '999';

        request(app)
            .delete(`/api/carts/${idCarritoInexistente}`)
            .expect(404, done);
    });
});
