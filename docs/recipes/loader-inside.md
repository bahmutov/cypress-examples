# Loader Inside An Element

<!-- fiddle Loader inside an element -->

The test passes, but it might fail on CI. Even when it passes, it passes accidentally. The element `#person` does not show anything, it is empty. The test accidentally passes while the `#person` element still shows the `#loading` temp element.

**Solution:** always check if the page has finished loading before checking the elements and its contents. You should also use more positive assertions rather than negative assertions.

**Learn more** by reading the blog posts [Negative Assertions And Missing States](https://glebbahmutov.com/blog/negative-assertions-and-missing-states/) and [Be Careful With Negative Assertions](https://glebbahmutov.com/blog/negative-assertions/).

```js skip
// 🚨 BAD PRACTICE
cy.get('#el').should('not.be.empty')
// ✅ RECOMMENDED
cy.get('.loading').should('not.exist')
cy.contains('#el', 'text X')
```

```html
<div id="person">
  <div id="loading" />
</div>
```

```css hide
#loading {
  width: 100px;
  height: 1px;
  background-image: linear-gradient(to right, lightGray, white);
}
```

```html hide
<script>
  setTimeout(() => {
    document.getElementById('loading').remove()
  }, 0)
</script>
```

```js
cy.log('checking')
```

The following commands might pass locally but fail on CI because of the race condition between the app and the test

```js skip
cy.get('#person').should('be.visible').and('not.be.empty')
```

![Failure on CI](./pics/fail-on-ci.png)

<!-- fiddle-end -->
