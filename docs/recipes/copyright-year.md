# Copyright Year

<!-- fiddle Copyright year -->

The application code sets the current year in the copyright message.

```html
<i id="copyright" />
<script>
  const year = new Date().getFullYear()
  document.getElementById(
    'copyright',
  ).innerText = `Copyright @ ${year} Gleb`
</script>
```

The test should not hardcode the year either.

```js
const year = new Date().getFullYear()
cy.contains('#copyright', `${year} Gleb`, { timeout: 0 })
```

<!-- fiddle-end -->
