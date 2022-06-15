# Set Form Inputs

<!-- fiddle Set form inputs -->

```html
<form id="personal-info">
  <div>
    <input
      type="text"
      placeholder="First name"
      name="first-name"
    />
    <input
      type="text"
      placeholder="Last name"
      name="last-name"
    />
  </div>
  <div>
    Lives in <input type="text" placeholder="City" name="city" />
  </div>
</form>
```

```js skip
// set one input element via form object
cy.document()
  .its('forms.personal-info.elements.city')
  // yields jQuery object
  // call the jQuery ".val()" method
  // to set the input's value
  .invoke('val', 'Boston')
```

Instead of setting each field one by one, let's get the entire form controls collection and set them all in a single callback function.

```js
cy.document()
  .its('forms.personal-info.elements')
  // yields HTMLFormControlsCollection
  .then((elements) => {
    elements['first-name'].value = 'Joe'
    elements['last-name'].value = 'Smith'
    elements.city.value = 'Cambridge'
  })
```

<!-- fiddle-end -->
