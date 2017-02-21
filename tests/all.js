const App = require('yeps');
const error = require('yeps-error');
const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const expect = chai.expect;
const Router = require('..');

chai.use(chaiHttp);
let app, router;

describe('YEPS router all test', () => {

    beforeEach(() => {
        app = new App();
        app.all([
            error(),
        ]);
        router = new Router();
    });

    it('should test all', async() => {

        let isTestFinished = false;

        router.all('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .get('/test')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('homepage');
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test all with head', async() => {

        let isTestFinished = false;

        router.all('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .head('/test')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test all with options', async() => {

        let isTestFinished = false;

        router.all('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .options('/test')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('homepage');
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test all with post', async() => {

        let isTestFinished = false;

        router.all('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .post('/test')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('homepage');
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test all with put', async() => {

        let isTestFinished = false;

        router.all('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .put('/test')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('homepage');
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test all with patch', async() => {

        let isTestFinished = false;

        router.all('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .patch('/test')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('homepage');
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test all with delete', async() => {

        let isTestFinished = false;

        router.all('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .delete('/test')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('homepage');
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test all with 404', async() => {

        let isTestFinished = false;

        router.all('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .get('/test1')
            .send()
            .catch(err => {
                expect(err).to.have.status(404);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

});
