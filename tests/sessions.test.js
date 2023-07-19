const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

describe('Router de Sesiones', () => {
    it('Debería iniciar sesión exitosamente', (done) => {
        const credenciales = {
            email: 'correo@example.com',
            password: 'contraseña123',
        };

        request(app)
            .post('/api/sessions/login')
            .send(credenciales)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('token');
                done();
            });
    });

    it('No debería iniciar sesión con credenciales inválidas', (done) => {
        const credencialesInvalidas = {
            email: 'correo@example.com',
            password: 'contraseñaIncorrecta',
        };

        request(app)
            .post('/api/sessions/login')
            .send(credencialesInvalidas)
            .expect(401, done);
    });

    it('Debería cerrar sesión exitosamente', (done) => {

        const tokenValido = 'el-token-valido-del-usuario';

        request(app)
            .post('/api/sessions/logout')
            .set('Authorization', `Bearer ${tokenValido}`)
            .expect(200, done);
    });

    it('No debería cerrar sesión con un token inválido', (done) => {

        const tokenInvalido = 'token-invalido';

        request(app)
            .post('/api/sessions/logout')
            .set('Authorization', `Bearer ${tokenInvalido}`)
            .expect(401, done);
    });
});
