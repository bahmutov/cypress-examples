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

```js
expect(Cypress.arch).to.exist
```
