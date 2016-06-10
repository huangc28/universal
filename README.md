## Purpose

Implementing a server side rendering app with **React** + **Redux** + **Koa** + **Webpack**.

## Progress

[x] setup webpack compilation environment.

  - [x] babel-loader for es6.

  - [x] es6 preset, transform ES6 script into browser compatible ES5 script.

  - [x] babel stage-0, this [link](http://babeljs.io/docs/plugins/preset-stage-0/) demonstrates what **stage-0** serves.

[x] add koa router.

  - [x] [koa-router](npm install koa-router) repo.

  - [x] [koa-cors](https://github.com/evert0n/koa-cors) repo.

[x] ORM package.

  - [x] Compare **Sequelize** with **Bookshelf**.

  - [x] will choose [bookshelf](http://bookshelfjs.org/) over **Sequelize**. install it!

[x] add frontend script.

[x] ~~add **webpack-dev-server**.~~ [deprecated](https://medium.com/@dan_abramov/the-death-of-react-hot-loader-765fa791d7c4#.bzedf437z) by Dan Abramov

  - [x] install **webpack-dev-server**.

  - [x] configure webpack configuration.

  - [] add script `npm run start:dev` to start **webpack-dev-server** for front end.

[x] add **react router**.

[x] add **redux**.

  - [x] install **redux**

  - [x] install **react-redux**

  - [x] install **react-thunk**

[] add **mocha** test framework.

  - [x] install **mocha**.

  - [x] install **chai**.

  - [x] install **chai-immutable**.

  - [] React testing framework **jsdom** [link](https://github.com/tmpvar/jsdom).

[] add **SASS** loader.

    - [] **sass-loader**. compiles sass into css.

    - [] **node-sass** one of the dependencies of **sass-loader**.

    - [] **css-loader** turns css into js.

    - [] **style-loader** embeds css into our application.

[] add **react hot loader** for development environment.

[] host up [koa](http://koajs.com/).

[] setup react router for server side rendering.

[] renders React component from server.

## TODO list

[] deprecate Frontend host script, since this is going to be a server side rendering app. All components will be generate from Backend.

```
"build": "webpack",
"start:dev": "webpack-dev-server"
```

## Generator Pattern

ES6 generator pattern helps to control the flow of javascript async execution sequence. Please Consider the following code.

```
const testGen = function * () {
  const obj = {value: 'from inside'}
  const returned = yield obj
  console.log('returned value', returned) // debugger 3
}

const a = testGen()
const aNext = a.next()
console.log(aNext.value) // debugger 1
console.log(aNext.done) // debugger 2
console.log(a.next('from outside'))
```
1.
  When testGen executes `const returned = yield obj`, it hands over the control outside of the function scope.

2.
  The value yield inside of **testGen** function will be passed on to **aNext.value**. Thus,  **debugger 1** will output `{done: false, value: {value: 'from inside'}}`. **debugger 2** will output `false`

3.
  When execute the **next** `a.next('from outside')`, the execution flow will again be passed into `testGen` function. Thus, **debugger 3** will output `{value: 'from outside', done: true}`

## How to retrieve request object ?

```
app.use(function * () {
  console.log(this.request)
})
app.listen(8086)
```

## How to server KOA backend with es6 ?

spins **KOA** with [babel-node](https://babeljs.io/docs/usage/cli/).

## Production Build

Instead of using **babel node** on production(not suggested), we should prebuild production server script and host with **node** command.

```
npm run build
```

```
npm run server
```

## Webpack dev server

Before spinning up **webpack-dev-server** please install by prompting:

```
npm install -g webpack webpack-dev-server
```

## problems

### KOA needs 'babel-polyfill' !!

when building server side code with **koa** implemented, it needs **babel-polyfill** to accommodate es6 **promise** / **await async**.

## References

1. [babel node server example](https://github.com/babel/example-node-server)

2. [react + react-router + redux + koa example](http://blog.joanboixados.com/building-a-boilerplate-for-a-koa-redux-react-application-including-webpack-mocha-and-sass/)

3. [about source map](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)
