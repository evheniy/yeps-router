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

  it('should test catch', async () => {
    let isTestFinished = false;

    router.catch().then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });
    app.then(router.resolve());

    await chai.request(server)
      .get('/')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('homepage');
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test catch with url', async () => {
    let isTestFinished = false;

    router.catch({ url: '/test' }).then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });
    app.then(router.resolve());

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

  it('should test catch with method', async () => {
    let isTestFinished = false;

    router.catch({ method: 'GET' }).then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });
    app.then(router.resolve());

    await chai.request(server)
      .get('/')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('homepage');
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test catch with method and url', async () => {
    let isTestFinished = false;

    router.catch({ method: 'GET', url: '/test' }).then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });
    app.then(router.resolve());

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

  it('should test catch with head', async () => {
    let isTestFinished = false;

    router.catch().then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });
    app.then(router.resolve());

    await chai.request(server)
      .head('/')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test catch with options', async () => {
    let isTestFinished = false;

    router.catch().then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });
    app.then(router.resolve());

    await chai.request(server)
      .options('/')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('homepage');
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test catch with post', async () => {
    let isTestFinished = false;

    router.catch().then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });
    app.then(router.resolve());

    await chai.request(server)
      .post('/')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('homepage');
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test catch with put', async () => {
    let isTestFinished = false;

    router.catch().then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });
    app.then(router.resolve());

    await chai.request(server)
      .put('/')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('homepage');
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test catch with patch', async () => {
    let isTestFinished = false;

    router.catch().then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });
    app.then(router.resolve());

    await chai.request(server)
      .patch('/')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('homepage');
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test catch with delete', async () => {
    let isTestFinished = false;

    router.catch().then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
    });
    app.then(router.resolve());

    await chai.request(server)
      .delete('/')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('homepage');
        isTestFinished = true;
      });

    expect(isTestFinished).is.true;
  });

  it('should test catch with params', async () => {
    let isTestFinished1 = false;
    let isTestFinished2 = false;

    router.catch({ url: '/test/:id1/:id2' }).then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
      if (ctx.request.params.id1 === '1' && ctx.request.params.id2 === '2') {
        isTestFinished1 = true;
      }
    });
    app.then(router.resolve());

    await chai.request(server)
      .get('/test/1/2')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('homepage');
        isTestFinished2 = true;
      });

    expect(isTestFinished1).is.true;
    expect(isTestFinished2).is.true;
  });

  it('should test catch with query', async () => {
    let isTestFinished1 = false;
    let isTestFinished2 = false;

    router.catch({ url: '/test' }).then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
      if (ctx.request.query.id1 === '1' && ctx.request.query.id2 === '2') {
        isTestFinished1 = true;
      }
    });
    app.then(router.resolve());

    await chai.request(server)
      .get('/test?id1=1&id2=2')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('homepage');
        isTestFinished2 = true;
      });

    expect(isTestFinished1).is.true;
    expect(isTestFinished2).is.true;
  });

  it('should test catch with params and query', async () => {
    let isTestFinished1 = false;
    let isTestFinished2 = false;
    let isTestFinished3 = false;

    router.catch({ url: '/test/:id1/:id2' }).then(async (ctx) => {
      ctx.res.statusCode = 200;
      ctx.res.end('homepage');
      if (ctx.request.params.id1 === '1' && ctx.request.params.id2 === '2') {
        isTestFinished1 = true;
      }
      if (ctx.request.query.id1 === '1' && ctx.request.query.id2 === '2') {
        isTestFinished2 = true;
      }
    });
    app.then(router.resolve());

    await chai.request(server)
      .get('/test/1/2?id1=1&id2=2')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('homepage');
        isTestFinished3 = true;
      });

    expect(isTestFinished1).is.true;
    expect(isTestFinished2).is.true;
    expect(isTestFinished3).is.true;
  });
});
