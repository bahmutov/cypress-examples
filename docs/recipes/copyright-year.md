# Copyright Year

<!-- fiddle Copyright year -->

The application code sets the current year in the copyright message. How does the test know the current year to check? Watch the video 📺 [Copyright Year Cypress Test](https://youtu.be/M_AZdsf_bQw) to see this recipe in action.

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
