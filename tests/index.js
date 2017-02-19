const App = require('yeps');
const error = require('yeps-error');
const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const expect = chai.expect;
const Router = require('..');

chai.use(chaiHttp);
let app, router;

describe('YEPS router test', () => {

    beforeEach(() => {
        app = new App();
        app.all([
            error(),
        ]);
        router = new Router();
    });

    it('should test catch', async() => {

        let isTestFinished = false;

        router.catch().then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .get('/')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('homepage');
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test catch with url', async() => {

        let isTestFinished = false;

        router.catch({ url: '/test' }).then(async ctx => {
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

    it('should test catch with method', async() => {

        let isTestFinished = false;

        router.catch({ method: 'GET' }).then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .get('/')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('homepage');
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test catch with method and url', async() => {

        let isTestFinished = false;

        router.catch({ method: 'GET', url: '/test' }).then(async ctx => {
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

    it('should test catch with head', async() => {

        let isTestFinished = false;

        router.catch().then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .head('/')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });
    it('should test catch with options', async() => {

        let isTestFinished = false;

        router.catch().then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .options('/')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('homepage');
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test catch with post', async() => {

        let isTestFinished = false;

        router.catch().then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .post('/')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('homepage');
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test catch with put', async() => {

        let isTestFinished = false;

        router.catch().then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .put('/')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('homepage');
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test catch with patch', async() => {

        let isTestFinished = false;

        router.catch().then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .patch('/')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('homepage');
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });
    it('should test catch with delete', async() => {

        let isTestFinished = false;

        router.catch().then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .delete('/')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('homepage');
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
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

    it('should head options with 404 wrong method', async() => {

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

    it('should test options', async() => {

        let isTestFinished = false;

        router.options('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .options('/test')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test options with 404', async() => {

        let isTestFinished = false;

        router.options('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .options('/test1')
            .send()
            .catch(err => {
                expect(err).to.have.status(404);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test options with 404 wrong method', async() => {

        let isTestFinished = false;

        router.options('/test').then(async ctx => {
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

    it('should test get', async() => {

        let isTestFinished = false;

        router.get('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .get('/test')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test get with 404', async() => {

        let isTestFinished = false;

        router.get('/test').then(async ctx => {
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

    it('should test get with 404 wrong method', async() => {

        let isTestFinished = false;

        router.get('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .post('/test')
            .send()
            .catch(err => {
                expect(err).to.have.status(404);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test post', async() => {

        let isTestFinished = false;

        router.post('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .post('/test')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test post with 404', async() => {

        let isTestFinished = false;

        router.post('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .post('/test1')
            .send()
            .catch(err => {
                expect(err).to.have.status(404);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test post with 404 wrong method', async() => {

        let isTestFinished = false;

        router.post('/test').then(async ctx => {
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

    it('should test put', async() => {

        let isTestFinished = false;

        router.put('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .put('/test')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test put with 404', async() => {

        let isTestFinished = false;

        router.put('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .put('/test1')
            .send()
            .catch(err => {
                expect(err).to.have.status(404);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test put with 404 wrong method', async() => {

        let isTestFinished = false;

        router.put('/test').then(async ctx => {
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

    it('should test patch', async() => {

        let isTestFinished = false;

        router.patch('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .patch('/test')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test patch with 404', async() => {

        let isTestFinished = false;

        router.patch('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .patch('/test1')
            .send()
            .catch(err => {
                expect(err).to.have.status(404);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test patch with 404 wrong method', async() => {

        let isTestFinished = false;

        router.patch('/test').then(async ctx => {
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

    it('should test delete', async() => {

        let isTestFinished = false;

        router.delete('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .delete('/test')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test delete with 404', async() => {

        let isTestFinished = false;

        router.delete('/test').then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .delete('/test1')
            .send()
            .catch(err => {
                expect(err).to.have.status(404);
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

    it('should test delete with 404 wrong method', async() => {

        let isTestFinished = false;

        router.delete('/test').then(async ctx => {
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

    it('should test catch with params', async() => {

        let isTestFinished1 = false;
        let isTestFinished2 = false;

        router.catch({ url: '/test/:id1/:id2'}).then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
            if (ctx.request.params.id1 === '1' && ctx.request.params.id2 === '2') {
                isTestFinished1 = true;
            }
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .get('/test/1/2')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('homepage');
                isTestFinished2 = true;
            });

        expect(isTestFinished1).is.true;
        expect(isTestFinished2).is.true;
    });

    it('should test catch with query', async() => {

        let isTestFinished1 = false;
        let isTestFinished2 = false;

        router.catch({ url: '/test'}).then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
            if (ctx.request.query.id1 === '1' && ctx.request.query.id2 === '2') {
                isTestFinished1 = true;
            }
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .get('/test?id1=1&id2=2')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('homepage');
                isTestFinished2 = true;
            });

        expect(isTestFinished1).is.true;
        expect(isTestFinished2).is.true;
    });

    it('should test catch with params and query', async() => {

        let isTestFinished1 = false;
        let isTestFinished2 = false;
        let isTestFinished3 = false;

        router.catch({ url: '/test/:id1/:id2'}).then(async ctx => {
            ctx.res.writeHead(200);
            ctx.res.end('homepage');
            if (ctx.request.params.id1 === '1' && ctx.request.params.id2 === '2') {
                isTestFinished1 = true;
            }
            if (ctx.request.query.id1 === '1' && ctx.request.query.id2 === '2') {
                isTestFinished2 = true;
            }
        });
        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .get('/test/1/2?id1=1&id2=2')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('homepage');
                isTestFinished3 = true;
            });

        expect(isTestFinished1).is.true;
        expect(isTestFinished2).is.true;
        expect(isTestFinished3).is.true;
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
