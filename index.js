const pause = require('promise-pause-timeout');

const Router = class {
    constructor() {
        this.routes = [];
    }

    catch({ method = '*', url = '/'} = {}) {
        const routes = this.routes;
        const that = this;
        return {
            then(fn) {
                routes.push(async ctx => {
                    await pause(10);
                    if ((method === '*' || ctx.method === method) && ctx.url === url) {
                        return Promise.reject(fn);
                    } else {
                        return Promise.resolve();
                    }
                });
                return that;
            }
        };
    }

    all(url) {
        return this.catch({method: '*', url});
    }

    get(url) {
        return this.catch({method: 'GET', url});
    }

    post(url) {
        return this.catch({method: 'POST', url});
    }

    resolve(ctx) {
        return Promise.all(this.routes.map(route => route(ctx))).catch(fn => fn(ctx));
    }

};

const router = new Router();

router.all('123').then(console.log);
router
    .get('456').then(console.log)
    .post('678').then(console.log);
router.catch().then(console.log);

(async () => {
    const start1 = new Date;
    await router.resolve({ method: 'GET', url: '456' });
    const ms1 = new Date - start1;
    console.log(ms1);

    await router.resolve({ method: 'POST', url: '678' });
    await router.resolve({ method: 'POST', url: '123' });

    const start = new Date;
    await router.resolve({ method: 'GET', url: '/' });
    const ms = new Date - start;
    console.log(ms);
})();

/**
 { method: 'GET', url: '456' }
 17
 { method: 'POST', url: '678' }
 { method: 'POST', url: '123' }
 { method: 'GET', url: '/' }
 11
*/