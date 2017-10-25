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

describe('YEPS router post test', () => {
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

  it('should test post', async () => {
    let isTestFinished = false;

    router.post('/test').then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });
    app.then(router.resolve());

    await chai.request(server)
      .post('/test')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test post with 404', async () => {
    let isTestFinished = false;

    router.post('/test').then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });
    app.then(router.resolve());

    await chai.request(server)
      .post('/test1')
      .send()
      .catch((err) => {
        expect(err).to.have.status(404);
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test post with 404 wrong method', async () => {
    let isTestFinished = false;

    router.post('/test').then(async (ctx) => {
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

  /**
   * to parse body use
   * https://github.com/evheniy/yeps-bodyparser
   */
  it('should test post with data', async () => {
    let isTestFinished1 = false;
    let isTestFinished2 = false;

    router.post('/test').then(async (ctx) => {
      const promise = new Promise((resolve, reject) => {
        const body = [];
        ctx.req.on('data', (chunk) => {
          body.push(chunk);
        }).on('end', () => {
          resolve(Buffer.concat(body).toString());
        }).on('error', reject);
      });

      expect(await promise).to.have.string('test_data');

      isTestFinished1 = true;

      ctx.res.statusCode = 200;
      ctx.res.end('test');
    });
    app.then(router.resolve());

    await chai.request(server)
      .post('/test')
      .field('test', 'test_data')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        isTestFinished2 = true;
      });

    expect(isTestFinished1).is.true;
    expect(isTestFinished2).is.true;
  });
});
