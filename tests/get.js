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

describe('YEPS router get test', () => {
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

  it('should test get', async () => {
    let isTestFinished = false;

    router.get('/test').then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });
    app.then(router.resolve());

    await chai.request(server)
      .get('/test')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test get with 404', async () => {
    let isTestFinished = false;

    router.get('/test').then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });
    app.then(router.resolve());

    await chai.request(server)
      .get('/test1')
      .send()
      .catch((err) => {
        expect(err).to.have.status(404);
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test get with 404 wrong method', async () => {
    let isTestFinished = false;

    router.get('/test').then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });
    app.then(router.resolve());

    await chai.request(server)
      .post('/test')
      .send()
      .catch((err) => {
        expect(err).to.have.status(404);
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });
});
