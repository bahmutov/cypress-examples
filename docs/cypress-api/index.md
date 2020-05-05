# Cypress API

Examples of uses of the Cypress API, for a full reference, go to [docs.cypress.io](https://on.cypress.io/custom-commands)

## [Cypress.Commands.add()](https://on.cypress.io/custom-commands)

To add a command, use `Cypress.Commands.add()`.

<!-- fiddle add command -->

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
  whitelist: 'session_id',
})
```

<!-- fiddle-end -->

## [Cypress.Server.default()](https://on.cypress.io/cypress-server)

To change the default configuration for cy.server, use `Cypress.Server.defaults()`.

```js
Cypress.Server.defaults({
  delay: 0,
  force404: true,
  whitelist: function (xhr) {
    // handle custom logic for whitelisting
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

## [Cypress.platform](https://on.cypress.io/platform)

To get name of underlying OS, use `Cypress.platform`.

<!-- fiddle Cypress.platform / Get underlying OS name -->

```js
// https://on.cypress.io/platform
expect(Cypress.platform).to.be.exist
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
