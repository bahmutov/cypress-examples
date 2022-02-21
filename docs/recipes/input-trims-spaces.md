# Input Element Trims Spaces

Let's have an input box that automatically removes any trailing white space characters. Let's test that.

<!-- fiddle Input trims spaces -->

```html
<input id="name" placeholder="Enter your name" />
<script>
  setInterval(function () {
    const input = document.getElementById('name')
    input.value = input.value.trim()
    // trim the space every two seconds for test clarity
  }, 2000)
</script>
```

```js
cy.get('#name').type('Joe      ')
// confirm the input trims the value
cy.get('#name').should('have.value', 'Joe')
```

Watch the video [Check Input Element Trimming Spaces From The Entered Values](https://youtu.be/o6hRLV6a9Hc).

<!-- fiddle-end -->
