const debug = require('debug')('yeps:router');
const pathToRegexp = require('path-to-regexp');
const parser = require('url');

module.exports = class {

    constructor() {
        debug('Router created');

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
                debug('%s %s', method.toUpperCase(), url);
                return this.catch({ method, url });
            };
        });
        this.del = this.delete;
    }

    all(url) {
        debug('* %s', url);

        return this.catch({ method: '*', url });
    }

    resolve() {
        debug('Router started');

        return ctx => {
            debug(ctx.req.url);

            return Promise.all(this.routes.map(route => route(ctx)))
                .then(() => debug('Router not found'))
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

                        debug('Router found');
                        debug('%s %s', ctx.req.method.toUpperCase(), url);

                        ctx.request = ctx.request || {};
                        ctx.request.query = parsedUrl.query;
                        ctx.request.params = {};

                        const captures = parsedUrl.pathname.match(regexp).slice(1);
                        for (let len = captures.length, i = 0; i < len; i++) {
                            if (paramNames[i]) {
                                let c = captures[i];
                                ctx.request.params[paramNames[i].name] = decodeURIComponent(c);
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
