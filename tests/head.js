const App = require('yeps');
const error = require('yeps-error');
const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const expect = chai.expect;
const Router = require('..');

chai.use(chaiHttp);
let app, router;

describe('YEPS router head test', () => {

    beforeEach(() => {
        app = new App();
        app.all([
            error(),
        ]);
        router = new Router();
    });

    it('should test head', async() => {

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

    it('should test head with 404', async() => {

        let isTestFinished = false;

        router.head('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .head('/test1')
            .send()
            .catch(err => {
                expect(err).to.have.status(404);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test head with 404 wrong method', async() => {

        let isTestFinished = false;

        router.head('/test').then(async ctx => {
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

});
