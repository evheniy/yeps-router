const pathToRegexp = require('path-to-regexp');
const parser = require('url');
const http = require('http');
const App = require('yeps');

const Router = class {

    constructor() {
        this.routes = [];
        this.methods = [
            'HEAD',
            'OPTIONS',
            'GET',
            'PUT',
            'PATCH',
            'POST',
            'DELETE',
        ];
        this.methods.forEach(method => {
            this[method.toLowerCase()] = url => {
                return this.catch({ method, url });
            };
        });
        this.del = this.delete;
    }

    all(url) {
        return this.catch({ method: '*', url });
    }

    resolve() {
        return ctx => {
            return Promise.all(this.routes.map(route => route(ctx)))
                .then(() => console.log(404))
                .catch(async fn => {
                    await fn(ctx);
                    return Promise.reject();
                });
        };
    }

    catch({ method = '*', url = '/' } = {}) {
        const routes = this.routes;
        const that = this;
        return {
            then(fn) {
                routes.push(async ctx => {

                    const paramNames = [];
                    const parsedUrl = parser.parse(ctx.req.url, true);
                    const regexp = pathToRegexp(url, paramNames);


                    if ((method === '*' || ctx.req.method.toUpperCase() === method.toUpperCase()) && regexp.test(parsedUrl.pathname)) {

                        ctx.query = parsedUrl.query;
                        ctx.params = {};
                        const captures = parsedUrl.pathname.match(regexp).slice(1);
                        for (let len = captures.length, i = 0; i < len; i++) {
                            if (paramNames[i]) {
                                let c = captures[i];
                                ctx.params[paramNames[i].name] = decodeURIComponent(c);
                            }
                        }

                        return Promise.reject(fn);
                    } else {
                        return Promise.resolve(ctx);
                    }
                });
                return that;
            }
        };
    }

};


const app = new App();
const router = new Router();


router.catch().then(async ctx => {
    ctx.res.writeHead(200, { 'Content-Type': 'text/plain' });
    ctx.res.end('homepage');
});
router.get('/test/:id/:data').then(async ctx => {
    console.log(ctx.query);
    console.log(ctx.params);
    ctx.res.writeHead(200, { 'Content-Type': 'application/json' });
    ctx.res.write(JSON.stringify(Object.assign({}, ctx.query, ctx.params)));
    ctx.res.end();
});

app.then(router.resolve());

// 404
app.then(async ctx => {
    ctx.res.writeHead(404);
    ctx.res.end('Not Found');
});

app.catch(async (err, ctx) => {
    ctx.res.writeHead(500);
    ctx.res.end(err.message);
});

http.createServer(app.resolve()).listen(3000);
console.log('http://localhost:3000/test/1/2?data=123');
