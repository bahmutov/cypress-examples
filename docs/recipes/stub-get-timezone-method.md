# Stub Get TimeZone Offset Method

Let's say the application gets the current timezone using the method `new Date().getTimezoneOffset()` call. How do we stub it?

<!-- fiddle Stub getTimezoneOffset -->

```html
<output id="timezone" />
<script>
  setTimeout(() => {
    const tz = (new Date().getTimezoneOffset() / 60) * -1
    document.getElementById(
      'timezone',
    ).innerText = `TZ ${tz} hours`
  }, 100)
</script>
```

The method `getTimezoneOffset` comes from `Date.prototype` object.

```js
cy.window()
  .its('Date.prototype')
  .then((datePrototype) => {
    cy.stub(datePrototype, 'getTimezoneOffset')
      .returns(900)
      .as('getTimezoneOffset')
  })
cy.contains('output', 'TZ -15 hours')
```

Confirm the method stub was called

```js
cy.get('@getTimezoneOffset')
  .should('have.been.calledOnce')
  // optional: reset the stub to restore the original timezone
  .invoke('restore')
```

<!-- fiddle-end -->

## See also

- [Stub `window.print`](./stub-window-print.md)
- [Stub `window.open`](./window-open.md)
- [Stub geolocation](./stub-geolocation.md)
