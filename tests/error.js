const App = require('yeps');
const error = require('yeps-error');
const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const expect = chai.expect;
const Router = require('..');

chai.use(chaiHttp);
let app, router;

describe('YEPS router catch test', () => {

    beforeEach(() => {
        app = new App();
        app.all([
            error(),
        ]);
        router = new Router();
    });

    it('should test catch with error', async() => {

        let isTestFinished = false;

        router.catch().then(async () => {
            throw new Error();
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .get('/')
            .send()
            .catch(err => {
                expect(err).to.have.status(500);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test catch with error and message', async() => {

        let isTestFinished = false;

        router.catch().then(async () => {
            throw new Error('test');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .get('/')
            .send()
            .catch(err => {
                expect(err).to.have.status(500);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test catch with reject', async() => {

        let isTestFinished = false;

        router.catch().then(async () => Promise.reject());
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .get('/')
            .send()
            .catch(err => {
                expect(err).to.have.status(500);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test catch with reject and message', async() => {

        let isTestFinished = false;

        router.catch().then(async () => Promise.reject('test'));
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .get('/')
            .send()
            .catch(err => {
                expect(err).to.have.status(500);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test catch with resolve', async() => {

        let isTestFinished = false;

        router.catch().then(async () => Promise.resolve());
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .get('/')
            .send()
            .catch(err => {
                expect(err).to.have.status(500);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test catch with resolve and message', async() => {

        let isTestFinished = false;

        router.catch().then(async () => Promise.resolve());
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .get('/')
            .send()
            .catch(err => {
                expect(err).to.have.status(500);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test catch with 404', async() => {

        let isTestFinished = false;

        router.catch().then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .get('/test')
            .send()
            .catch(err => {
                expect(err).to.have.status(404);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test catch 404 error with wrong params', async() => {

        let isTestFinished = false;

        router.catch({ url: '/test/:id1/:id2'}).then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .get('/test/1/2/3')
            .send()
            .catch(err => {
                expect(err).to.have.status(404);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

});
