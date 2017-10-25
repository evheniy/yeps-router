const App = require('yeps');
const error = require('yeps-error');
const chai = require('chai');
const chaiHttp = require('chai-http');
const srv = require('yeps-server');
const Router = require('..');

const { expect } = chai;

chai.use(chaiHttp);
let app;
let router;
let server;

describe('YEPS router all test', () => {
  beforeEach(() => {
    app = new App();
    app.all([
      error(),
    ]);
    router = new Router();
    app.then(router.resolve());
    server = srv.createHttpServer(app);
  });

  afterEach(() => {
    server.close();
  });

  it('should test all', async () => {
    let isTestFinished = false;

    router.all('/test').then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });

    await chai.request(server)
      .get('/test')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('homepage');
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test all with head', async () => {
    let isTestFinished = false;

    router.all('/test').then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });

    await chai.request(server)
      .head('/test')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test all with options', async () => {
    let isTestFinished = false;

    router.all('/test').then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });

    await chai.request(server)
      .options('/test')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('homepage');
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test all with post', async () => {
    let isTestFinished = false;

    router.all('/test').then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });

    await chai.request(server)
      .post('/test')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('homepage');
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test all with put', async () => {
    let isTestFinished = false;

    router.all('/test').then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });

    await chai.request(server)
      .put('/test')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('homepage');
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test all with patch', async () => {
    let isTestFinished = false;

    router.all('/test').then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });

    await chai.request(server)
      .patch('/test')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('homepage');
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test all with delete', async () => {
    let isTestFinished = false;

    router.all('/test').then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });

    await chai.request(server)
      .delete('/test')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('homepage');
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test all with 404', async () => {
    let isTestFinished = false;

    router.all('/test').then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });

    await chai.request(server)
      .get('/test1')
      .send()
      .catch((err) => {
        expect(err).to.have.status(404);
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });
});
