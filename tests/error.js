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

describe('YEPS router catch test', () => {
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

  it('should test catch with error', async () => {
    let isTestFinished = false;

    router.catch().then(async () => {
      throw new Error();
    });
    app.then(router.resolve());

    await chai.request(server)
      .get('/')
      .send()
      .catch((err) => {
        expect(err).to.have.status(500);
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test catch with error and message', async () => {
    let isTestFinished = false;

    router.catch().then(async () => {
      throw new Error('test');
    });
    app.then(router.resolve());

    await chai.request(server)
      .get('/')
      .send()
      .catch((err) => {
        expect(err).to.have.status(500);
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test catch with reject', async () => {
    let isTestFinished = false;

    router.catch().then(async () => Promise.reject());
    app.then(router.resolve());

    app.catch((err, ctx) => {
      ctx.res.statusCode = 500;
      ctx.res.end();
    });

    await chai.request(server)
      .get('/')
      .send()
      .catch((err) => {
        expect(err).to.have.status(500);
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test catch with reject and message', async () => {
    let isTestFinished = false;

    router.catch().then(async () => Promise.reject(new Error('test')));
    app.then(router.resolve());

    app.catch((err, ctx) => {
      ctx.res.statusCode = 500;
      ctx.res.end();
    });

    await chai.request(server)
      .get('/')
      .send()
      .catch((err) => {
        expect(err).to.have.status(500);
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test catch with resolve', async () => {
    let isTestFinished = false;

    router.catch().then(async () => Promise.resolve());
    app.then(router.resolve());

    app.catch((err, ctx) => {
      ctx.res.statusCode = 404;
      ctx.res.end();
    });

    await chai.request(server)
      .get('/')
      .send()
      .catch((err) => {
        expect(err).to.have.status(404);
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test catch with resolve and message', async () => {
    let isTestFinished = false;

    router.catch().then(async () => Promise.resolve(123));
    app.then(router.resolve());

    app.catch((err, ctx) => {
      ctx.res.statusCode = 404;
      ctx.res.end();
    });

    await chai.request(server)
      .get('/')
      .send()
      .catch((err) => {
        expect(err).to.have.status(404);
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test catch with 404', async () => {
    let isTestFinished = false;

    router.catch().then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });
    app.then(router.resolve());

    await chai.request(server)
      .get('/test')
      .send()
      .catch((err) => {
        expect(err).to.have.status(404);
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test catch 404 error with wrong params', async () => {
    let isTestFinished = false;

    router.catch({ url: '/test/:id1/:id2' }).then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });
    app.then(router.resolve());

    await chai.request(server)
      .get('/test/1/2/3')
      .send()
      .catch((err) => {
        expect(err).to.have.status(404);
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });
});
