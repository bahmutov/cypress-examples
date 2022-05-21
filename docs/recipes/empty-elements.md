# Empty elements before comparing text

<!-- fiddle Empty elements -->

```html
<div _ngcontent-osh-c143="" class="col-3 ng-star-inserted">
  <button
    _ngcontent-osh-c143=""
    mat-flat-button=""
    class="mat-focus-indicator mat-tooltip-trigger mktp-columns-panel-textleft mat-flat-button mat-button-base button secondary default"
    id="ads_campaigns_button_active_products"
    aria-describedby="cdk-describedby-message-32"
    cdk-describedby-host=""
  >
    <span class="mat-button-wrapper"
      ><mat-icon
        _ngcontent-osh-c143=""
        role="img"
        class="mat-icon notranslate material-icons mat-icon-no-color ng-star-inserted"
        aria-hidden="true"
        data-mat-icon-type="font"
      >
        done
      </mat-icon>

      <!---->

      Active products
    </span>

    <span
      matripple=""
      class="mat-ripple mat-button-ripple"
    ></span>
    <span class="mat-button-focus-overlay"></span>
  </button>
  <!---->
</div>
```

```js
cy.get('button').should('include.text', 'Active products')
// "have.text" fails because the button
// includes newline characters and "done" word
// .and('have.text', 'Active products')
```

If we want to ignore the extra elements before checking the text of the buttons, we can empty them by calling the jQuery [empty](https://api.jquery.com/empty/) method.

```js
cy.get('button mat-icon').invoke('empty')
// with the "mat-icon" elements empty
// we can grab the text, remove new lines
// and match it exactly
cy.get('button')
  .invoke('text')
  .invoke('trim')
  .should('equal', 'Active products')
```

<!-- fiddle-end -->
