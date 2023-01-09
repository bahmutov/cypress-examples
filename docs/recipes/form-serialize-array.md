# jQuery form serializeArray method

jQuery includes [form `serializeArray` method](https://api.jquery.com/serializeArray/) you can use to get all input element's values at once.

<!-- fiddle form serializeArray example -->

📺 Watch the explanation for this recipe in the video [jQuery Form Serialize Array Method](https://youtu.be/Z0OUl4l5YvU).

```html
<form>
  <div><input type="text" name="a" value="1" id="a" /></div>
  <div><input type="text" name="b" value="2" id="b" /></div>
  <div><input type="hidden" name="c" value="3" id="c" /></div>
  <div>
    <textarea name="d" rows="8" cols="40">4</textarea>
  </div>
  <div>
    <select name="e">
      <option value="5" selected="selected">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
    </select>
  </div>
  <div>
    <input type="checkbox" name="f" value="8" id="f" checked />
  </div>
  <div>
    <input type="submit" name="g" value="Submit" id="g" />
  </div>
</form>
```

```js
cy.get('form')
  .invoke('serializeArray')
  .should('deep.equal', [
    {
      name: 'a',
      value: '1',
    },
    {
      name: 'b',
      value: '2',
    },
    {
      name: 'c',
      value: '3',
    },
    {
      name: 'd',
      value: '4',
    },
    {
      name: 'e',
      value: '5',
    },
    {
      name: 'f',
      value: '8',
    },
  ])
```

<!-- fiddle-end -->

**Tip:** for better object validation, take a look at [cy-spok](https://github.com/bahmutov/cy-spok) plugin.

## See also

- [Form values](./form-values.md) recipe.
- [Form validation](./form-validation.md) recipe.
