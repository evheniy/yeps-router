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

router.resolve({ method: 'GET', url: '456' });
router.resolve({ method: 'POST', url: '678' });
router.resolve({ method: 'POST', url: '123' });
router.resolve({ method: 'GET', url: '/' });
