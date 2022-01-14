# Cypress API

Examples of uses of the Cypress API, for a full reference, go to [docs.cypress.io](https://on.cypress.io/custom-commands)

## [Cypress.Commands.add()](https://on.cypress.io/custom-commands)

To add a command, use `Cypress.Commands.add()`.

<!-- fiddle Custom commands / add command -->

```js
Cypress.Commands.add(
  'console',
  {
    prevSubject: true,
  },
  (subject, method) => {
    method = method || 'log'

    // log the subject to the console
    console[method]('The subject is', subject)
    return subject
  },
)
// prints the object to the window console
cy.wrap({ life: 42 }).console('info')
```

<!-- fiddle-end -->

To yield a value from a custom command to the next command or assertion

<!-- fiddle Custom commands / yield a value -->

```js
Cypress.Commands.add(
  'double',
  {
    prevSubject: true,
  },
  (value, method) => {
    return value * 2
  },
)
cy.wrap(21).double().should('equal', 42)
```

You can also wrap a value to be returned - Cypress automatically takes the value of the last command.

```js
Cypress.Commands.add(
  'triple',
  {
    prevSubject: true,
  },
  (value, method) => {
    cy.wrap(value * 3)
  },
)
cy.wrap(21).triple().should('equal', 63)
```

**Note:** you cannot both use `cy.wrap` and `return` in the same code, since it is ambiguous, watch the video [Fix The Cypress Error "You are mixing async and sync code"](https://youtu.be/f_H7EH0n9tE).

<!-- fiddle-end -->

### Calling other custom commands

You can call other custom commands from inside a custom command.

<!-- fiddle Custom commands / calling other commands -->

```js
Cypress.Commands.add('name', () => 'Joe')
Cypress.Commands.add('greeting', () =>
  // call the custom command cy.name
  // then form the full greeting text and yield it
  cy.name().then((n) => `Hello, ${n}`),
)
cy.greeting().should('equal', 'Hello, Joe')
```

<!-- fiddle-end -->

## [Cypress.Cookies.debug()](https://on.cypress.io/cookies)

To enable or disable cookie debugging, use `Cypress.Cookies.debug()`.

<!-- fiddle debug -->

```js
// Cypress will now log in the console when
// cookies are set or removed
Cypress.Cookies.debug(true)

cy.setCookie('fakeCookie', '123ABC')
cy.clearCookie('fakeCookie')
cy.setCookie('fakeCookie', '123ABC')
cy.clearCookie('fakeCookie')
cy.setCookie('fakeCookie', '123ABC')
```

<!-- fiddle-end -->

## [Cypress.Cookies.preserveOnce()](https://on.cypress.io/cookies)

To preserve cookies by its key, use `Cypress.Cookies.preserveOnce()`.

<!-- fiddle preserveOnce -->

```js
cy.getCookie('fakeCookie').should('not.be.ok')

// preserving a cookie will not clear it when
// the next test starts
cy.setCookie('lastCookie', '789XYZ')
Cypress.Cookies.preserveOnce('lastCookie')
```

<!-- fiddle-end -->

## [Cypress.Cookies.default()](https://on.cypress.io/cookies)

To set defaults for all cookies, use `Cypress.Cookies.default()`.

<!-- fiddle cookies defaults -->

```js
Cypress.Cookies.defaults({
  preserve: 'session_id',
})
```

<!-- fiddle-end -->

## [Cypress.Server.default()](https://on.cypress.io/cypress-server)

To change the default configuration for cy.server, use `Cypress.Server.defaults()`.

```js
Cypress.Server.defaults({
  delay: 0,
  force404: true,
  ignore: function (xhr) {
    // handle custom logic for ignoring certain requests
  },
})
```

## [Cypress.arch](https://on.cypress.io/arch)

To get CPU architecture name of underlying OS, use `Cypress.arch`.

<!-- fiddle Cypress.arch / Get the architecture name -->

```js
// https://on.cypress.io/arch
expect(Cypress.arch).to.exist
```

<!-- fiddle-end -->

## [Cypress.config()](https://on.cypress.io/config)

To get or set configuration options, use `Cypress.config()`. Note: the config object should be reserved for Cypress settings, like `baseUrl` and `viewportWidth`. To store your custom values use the `Cypress.env()` approach.

<!-- fiddle Cypress.config -->

```js
const myConfig = Cypress.config()

// the config has a combination of default
// and user values from cypress.json file
expect(myConfig).to.have.property(
  'animationDistanceThreshold',
  5,
)
expect(myConfig).to.have.property('defaultCommandTimeout', 4000)
expect(myConfig).to.have.property('requestTimeout', 5000)
expect(myConfig).to.have.property('responseTimeout', 30000)
expect(myConfig).to.have.property('viewportHeight', 1000)
expect(myConfig).to.have.property('viewportWidth', 600)
expect(myConfig).to.have.property('pageLoadTimeout', 60000)
expect(myConfig).to.have.property('waitForAnimations', true)
// we can check if the property is present without checking its value
expect(myConfig).to.have.property('baseUrl')

// setting and getting an individual property
expect(Cypress.config('pageLoadTimeout')).to.eq(60000)

Cypress.config('pageLoadTimeout', 20000)

expect(Cypress.config('pageLoadTimeout')).to.eq(20000)

Cypress.config('pageLoadTimeout', 60000)
```

<!-- fiddle-end -->

## [Cypress.dom.isHidden()](https://on.cypress.io/dom)

To see whether a DOM element is hidden, use `Cypress.dom.isHidden()`.

<!-- fiddle Cypress.dom.isHidden -->

```html
<div class="dom-p">
  <p class="hidden">I'm hiding!</p>
  <p class="visible">I'm visible!</p>
</div>
```

```js
let hiddenP = Cypress.$('.dom-p p.hidden').get(0)
let visibleP = Cypress.$('.dom-p p.visible').get(0)

// our first paragraph has css class 'hidden'
expect(Cypress.dom.isHidden(hiddenP)).to.be.true
expect(Cypress.dom.isHidden(visibleP)).to.be.false
```

<!-- fiddle-end -->

## [Cypress.env()](https://on.cypress.io/env)

To get or set environment variable, use `Cypress.env()`.

<!-- fiddle Cypress.env -->

```js
// set multiple environment variables
Cypress.env({
  host: 'veronica.dev.local',
  api_server: 'http://localhost:8888/v1/',
})

// get environment variable
expect(Cypress.env('host')).to.eq('veronica.dev.local')

// set environment variable
Cypress.env('api_server', 'http://localhost:8888/v2/')
expect(Cypress.env('api_server')).to.eq(
  'http://localhost:8888/v2/',
)

// get all environment variable
expect(Cypress.env()).to.have.property(
  'host',
  'veronica.dev.local',
)
expect(Cypress.env()).to.have.property(
  'api_server',
  'http://localhost:8888/v2/',
)
```

<!-- fiddle-end -->

## [Cypress.platform](https://on.cypress.io/platform)

To get name of underlying OS, use `Cypress.platform`.

<!-- fiddle Cypress.platform / Get underlying OS name -->

```js
// https://on.cypress.io/platform
expect(Cypress.platform).to.be.exist
```

<!-- fiddle-end -->

## [Cypress.platform](https://on.cypress.io/platform)

To get name of underlying OS, use `Cypress.platform`.

<!-- fiddle Cypress.platform -->

```js
// for example "darwin" on Mac
expect(Cypress.platform).to.exist
```

<!-- fiddle-end -->

## [Cypress.version](https://on.cypress.io/version)

To get version of Cypress being run, use `Cypress.version`.

<!-- fiddle Cypress.version / Get current version of Cypress being run -->

```js
// https://on.cypress.io/version
expect(Cypress.version).to.be.exist
```

<!-- fiddle-end -->

## [Cypress.spec](https://on.cypress.io/spec)

`Cypress.spec` returns you the properties of the spec under test.

<!-- fiddle Cypress.spec / Get current spec information -->

```js
// https://on.cypress.io/spec
// wrap the object so we can inspect it easily by clicking in the command log
cy.wrap(Cypress.spec).should('include.keys', [
  'name',
  'relative',
  'absolute',
])
```

<!-- fiddle-end -->

### Multiple specs

If you are using `cypress open` to run multiple specs at once, you can detect it by using the `Cypress.spec` object. The field `name` will be set to "All Integration Specs" and the fields `absolute` and `relative` will be set to "\_\_all".

<!-- fiddle Cypress.spec / Multiple specs -->

```js
if (Cypress.spec.absolute === '__all') {
  cy.log('Running several specs together')
} else {
  cy.log(`Running a single spec ${Cypress.spec.relative}`)
}
```

<!-- fiddle-end -->

## [Cypress.currentTest](https://docs.cypress.io/api/cypress-api/currenttest)

`Cypress.currentTest` is an object representing the currently executing test instance, with properties to access the title of the test.

<!-- fiddle Cypress.currentTest / Get the current test information -->

```js
// https://on.cypress.io/currenttest
// wrap the object so we can inspect it easily by clicking in the command log
cy.wrap(Cypress.currentTest)
  .should('include.keys', ['title', 'titlePath'])
  .then((currentTest) => {
    expect(currentTest).to.have.property(
      'title',
      'Get the current test information',
    )
    // get the entire full title, including the parent suite titles
    expect(currentTest)
      .to.have.property('titlePath')
      .to.deep.equal([
        'Cypress API', // the top suite
        'Cypress.currentTest', // the parent suite
        'Get the current test information', // the test title
      ])
  })
```

<!-- fiddle-end -->

## [Cypress.testingType](https://docs.cypress.io/api/cypress-api/testing-type)

`Cypress.testingType` returns the current testing type, determined by the Test Runner chosen to run. The `Cypress.testingType` returns "e2e" for Cypress Test Runner integration tests, or "component" for experimental [Component Testing](https://on.cypress.io/component-testing).

<!-- fiddle Cypress.testingType -->

```js
expect(Cypress.testingType)
  .to.be.oneOf(['e2e', 'component'])
  // in this case, we are running e2e spec
  .and.be.equal('e2e')
```

<!-- fiddle-end -->
