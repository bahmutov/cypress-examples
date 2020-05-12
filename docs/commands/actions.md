# Actions

Examples of actions being performed on DOM elements in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [.type()](https://on.cypress.io/type)

To type into a DOM element, use the `.type()` command.

<!-- fiddle .type() - type into a DOM element -->

```html
<form>
  <div class="form-group">
    <label for="email1">Email address</label>
    <input
      type="email"
      class="form-control action-email"
      id="email1"
      placeholder="Email"
    />
  </div>
  <div class="form-group">
    <label>Disabled Textarea</label>
    <textarea
      class="form-control action-disabled"
      disabled="disabled"
    ></textarea>
  </div>
</form>
```

```js
cy.get('.action-email')
  .type('fake@email.com')
  .should('have.value', 'fake@email.com')

  // .type() with special character sequences
  .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
  .type('{del}{selectall}{backspace}')

  // .type() with key modifiers
  .type('{alt}{option}') //these are equivalent
  .type('{ctrl}{control}') //these are equivalent
  .type('{meta}{command}{cmd}') //these are equivalent
  .type('{shift}')

  // Delay each keypress by 0.1 sec
  .type('slow.typing@email.com', { delay: 100 })
  .should('have.value', 'slow.typing@email.com')

cy.get('.action-disabled')
  // Ignore error checking prior to type
  // like whether the input is visible or disabled
  .type('disabled error checking', { force: true })
  .should('have.value', 'disabled error checking')
```

<!-- fiddle-end -->

## [.focus()](https://on.cypress.io/focus)

To focus on a DOM element, use the `.focus()` command.

<!-- fiddle .focus() - focus on a DOM element -->

```html
<form>
  <div class="form-group">
    <label for="password1">Password</label>
    <input
      type="password"
      class="form-control action-focus"
      id="password1"
      placeholder="Password"
    />
  </div>
</form>
<script>
  // listen to focus to demonstrate logic on focus command
  $('.action-focus').on('focus', function (e) {
    $(e.currentTarget).addClass('focus')
    $(e.currentTarget).prev().css('color', 'orange')
  })
</script>
```

```js
cy.get('.action-focus')
  .focus()
  .should('have.class', 'focus')
  .prev()
  .should('have.attr', 'style', 'color: orange;')
```

<!-- fiddle-end -->

## [.blur()](https://on.cypress.io/blur)

To blur on a DOM element, use the `.blur()` command.

<!-- fiddle .blur() - blur off a DOM element -->

```html
<form>
  <div class="form-group">
    <label for="fullName1">Full Name</label>
    <input
      type="text"
      class="form-control action-blur"
      id="fullName1"
      placeholder="Enter your name"
    />
  </div>
</form>
<script>
  // listen to blur to demonstrate logic on blur command
  $('.action-blur').on('blur', function (e) {
    $(e.currentTarget).addClass('error')
    $(e.currentTarget).prev().css('color', 'red')
  })
</script>
```

```js
cy.get('.action-blur')
  .type('About to blur')
  .blur()
  .should('have.class', 'error')
  .prev()
  .should('have.attr', 'style', 'color: red;')
```

<!-- fiddle-end -->

## [.clear()](https://on.cypress.io/clear)

To clear on a DOM element, use the `.clear()` command.

<!-- fiddle .clear() - clears an input or textarea element' -->

```html
<form>
  <div class="form-group">
    <label for="description">Describe:</label>
    <input
      type="text"
      class="form-control action-clear"
      id="description"
    />
  </div>
</form>
```

```js
cy.get('.action-clear')
  .type('Clear this text')
  .should('have.value', 'Clear this text')
  .clear()
  .should('have.value', '')
```

<!-- fiddle-end -->

## [.submit()](https://on.cypress.io/submit)

To submit a form, use the `cy.submit()` command.

<!-- fiddle .submit() - submit a form -->

```html
<form class="action-form">
  <div class="form-group">
    <label for="couponCode1" val="HALFOFF">Coupon Code</label>
    <input type="text" class="form-control" id="couponCode1" />
  </div>
  <button type="submit" class="btn btn-primary">
    Submit
  </button>
</form>
```

```js
cy.get('.action-form').find('[type="text"]').type('HALFOFF')
cy.get('.action-form')
  .submit()
  .next()
  .should('contain', 'Your form has been submitted!')
```

<!-- fiddle-end -->

## [.click()](https://on.cypress.io/click)

To click a DOM element, use the `cy.click()` command.

<!-- fiddle .click() - click on a DOM element' -->

```html
<div class="well">
  <button
    type="button"
    class="btn btn-lg btn-danger action-btn"
    data-toggle="popover"
    title="Popover"
    data-placement="top"
    data-content="This popover shows up on click"
  >
    Click to toggle popover
  </button>

  <hr />

  <h6>Canvas to Illustrate Click Positions</h6>
  <canvas width="250" height="250" id="action-canvas"></canvas>

  <hr />

  <div class="action-labels">
    <span
      class="label label-primary"
      data-toggle="popover"
      data-placement="bottom"
      data-content="clicked"
      >click me</span
    >
    <span
      class="label label-primary"
      data-toggle="popover"
      data-placement="bottom"
      data-content="clicked"
      >and me</span
    >
    <span
      class="label label-primary"
      data-toggle="popover"
      data-placement="bottom"
      data-content="clicked"
      >and me</span
    >
    <span
      class="label label-primary"
      data-toggle="popover"
      data-placement="bottom"
      data-content="clicked"
      >and me</span
    >
    <span
      class="label label-primary"
      data-toggle="popover"
      data-placement="bottom"
      data-content="clicked"
      >and me</span
    >
    <span
      class="label label-primary"
      data-toggle="popover"
      data-placement="bottom"
      data-content="clicked"
      >and me</span
    >
  </div>

  <hr />

  <div class="action-opacity">
    <button
      type="button"
      class="btn btn-lg btn-primary"
      data-toggle="popover"
      data-placement="left"
      data-content="This popover shows up because we forced the click on the button"
    >
      I'm being covered
    </button>
    <div class="opacity-cover"></div>
  </div>
</div>
```

```js
cy.get('.action-btn').click()

// You can click on 9 specific positions of an element:
//  -----------------------------------
// | topLeft        top       topRight |
// |                                   |
// |                                   |
// |                                   |
// | left          center        right |
// |                                   |
// |                                   |
// |                                   |
// | bottomLeft   bottom   bottomRight |
//  -----------------------------------

// clicking in the center of the element is the default
cy.get('#action-canvas').click()
cy.get('#action-canvas').click('topLeft')
cy.get('#action-canvas').click('top')
cy.get('#action-canvas').click('topRight')
cy.get('#action-canvas').click('left')
cy.get('#action-canvas').click('right')
cy.get('#action-canvas').click('bottomLeft')
cy.get('#action-canvas').click('bottom')
cy.get('#action-canvas').click('bottomRight')

// .click() accepts an x and y coordinate
// that controls where the click occurs :)

cy.get('#action-canvas')
  .click(80, 75) // click 80px on x coord and 75px on y coord
  .click(170, 75)
  .click(80, 165)
  .click(100, 185)
  .click(125, 190)
  .click(150, 185)
  .click(170, 165)

// click multiple elements by passing multiple: true
cy.get('.action-labels>.label').click({ multiple: true })

// Ignore error checking prior to clicking
cy.get('.action-opacity>.btn').click({ force: true })
```

<!-- fiddle-end -->

## [.dblclick()](https://on.cypress.io/dblclick)

To double click a DOM element, use the `cy.dblclick()` command.

<!-- fiddle .dblclick() - double click on a DOM element -->

```html
<form>
  <div class="form-group">
    <div class="action-div">Double click to edit</div>
    <input
      type="text"
      class="action-input-hidden hidden form-control"
      value="Double click to edit"
    />
  </div>
</form>
```

```js
// Our app has a listener on 'dblclick' event in our 'scripts.js'
// that hides the div and shows an input on double click
cy.get('.action-div').dblclick().should('not.be.visible')
cy.get('.action-input-hidden').should('be.visible')
```

<!-- fiddle-end -->

## [.rightclick()](https://on.cypress.io/rightclick)

To double click a DOM element, use the `cy.rightclick()` command.

<!-- fiddle .rightclick() - right click on a DOM element -->

```html
<form>
  <div class="form-group">
    <div class="rightclick-action-div">Right click to edit</div>
    <input
      type="text"
      class="rightclick-action-input-hidden hidden form-control"
      value="Right click to edit"
    />
  </div>
</form>
```

```js
// Our app has a listener on 'contextmenu' event in our 'scripts.js'
// that hides the div and shows an input on right click
cy.get('.rightclick-action-div').rightclick().should('not.be.visible')
cy.get('.rightclick-action-input-hidden').should('be.visible')
```

<!-- fiddle-end -->

## [.check()](https://on.cypress.io/check)

To check a checkbox or radio, use the `cy.check()` command.

<!-- fiddle .check() - check a checkbox or radio element -->

```html
<div class="action-checkboxes">
  <div class="checkbox">
    <label>
      <input type="checkbox" value="checkbox1" />
      Checkbox one has value "checkbox1"
    </label>
  </div>
  <div class="checkbox disabled">
    <label>
      <input type="checkbox" value="checkbox2" disabled />
      Checkbox two is disabled
    </label>
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox" value="checkbox3" />
      Checkbox three has value "checkbox3"
    </label>
  </div>
</div>

<hr />

<div class="action-multiple-checkboxes">
  <div class="checkbox">
    <label>
      <input type="checkbox" value="checkbox1" />
      Checkbox one has value "checkbox1"
    </label>
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox" value="checkbox2" />
      Checkbox two has value "checkbox2"
    </label>
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox" value="checkbox3" />
      Checkbox three has value "checkbox3"
    </label>
  </div>
</div>

<hr />

<div class="action-radios">
  <div class="radio">
    <label>
      <input
        type="radio"
        name="optionsRadios"
        id="optionsRadios1"
        value="radio1"
      />
      Radio one has value "radio1"
    </label>
  </div>
  <div class="radio">
    <label>
      <input
        type="radio"
        name="optionsRadios"
        id="optionsRadios2"
        value="radio2"
      />
      Radio two has value "radio2". When checked, it will uncheck
      Radio one.
    </label>
  </div>
  <div class="radio disabled">
    <label>
      <input
        type="radio"
        name="optionsRadios"
        id="optionsRadios3"
        value="radio3"
        disabled
      />
      Radio three is disabled
    </label>
  </div>
</div>
```

```js
// By default, .check() will check all
// matching checkbox or radio elements in succession, one after another
cy.get('.action-checkboxes [type="checkbox"]')
  .not('[disabled]')
  .check()
  .should('be.checked')

cy.get('.action-radios [type="radio"]')
  .not('[disabled]')
  .check()
  .should('be.checked')

// .check() accepts a value argument
cy.get('.action-radios [type="radio"]')
  .check('radio1')
  .should('be.checked')

// .check() accepts an array of values
cy.get('.action-multiple-checkboxes [type="checkbox"]')
  .check(['checkbox1', 'checkbox2'])
  .should('be.checked')

// Ignore error checking prior to checking
cy.get('.action-checkboxes [disabled]')
  .check({ force: true })
  .should('be.checked')

cy.get('.action-radios [type="radio"]')
  .check('radio3', { force: true })
  .should('be.checked')
```

<!-- fiddle-end -->

## [.uncheck()](https://on.cypress.io/uncheck)

To uncheck a checkbox or radio, use the `cy.uncheck()` command.

<!-- fiddle .uncheck() - uncheck a checkbox element -->

```html
<div class="action-check">
  <div class="checkbox">
    <label>
      <input type="checkbox" value="checkbox1" checked />
      Checkbox one has value "checkbox1"
    </label>
  </div>
  <div class="checkbox disabled">
    <label>
      <input type="checkbox" value="checkbox2" disabled checked />
      Checkbox two is disabled
    </label>
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox" value="checkbox3" checked />
      Checkbox three has value "checkbox3"
    </label>
  </div>
</div>
```

```js
// By default, .uncheck() will uncheck all matching
// checkbox elements in succession, one after another
cy.get('.action-check [type="checkbox"]')
  .not('[disabled]')
  .uncheck()
  .should('not.be.checked')

// .uncheck() accepts a value argument
cy.get('.action-check [type="checkbox"]')
  .check('checkbox1')
  .uncheck('checkbox1')
  .should('not.be.checked')

// .uncheck() accepts an array of values
cy.get('.action-check [type="checkbox"]')
  .check(['checkbox1', 'checkbox3'])
  .uncheck(['checkbox1', 'checkbox3'])
  .should('not.be.checked')

// Ignore error checking prior to unchecking
cy.get('.action-check [disabled]')
  .uncheck({ force: true })
  .should('not.be.checked')
```

<!-- fiddle-end -->

## [.select()](https://on.cypress.io/select)

To select an option in a `select`, use the `cy.select()` command.

<!-- fiddle .uncheck() - uncheck a checkbox element -->

```html
<form>
  <select class="form-control action-select">
    <option>--Select a fruit--</option>
    <option value="fr-apples">apples</option>
    <option value="fr-oranges">oranges</option>
    <option value="fr-bananas">bananas</option>
  </select>

  <select class="form-control action-select-multiple" multiple="true">
    <option value="fr-apples">apples</option>
    <option value="fr-oranges">oranges</option>
    <option value="fr-bananas">bananas</option>
  </select>
</form>
```

```js
cy.get('.action-select').select('apples')

cy.get('.action-select-multiple').select([
  'apples',
  'oranges',
  'bananas',
])

// Select option(s) with matching value
cy.get('.action-select').select('fr-bananas')

cy.get('.action-select-multiple').select([
  'fr-apples',
  'fr-oranges',
  'fr-bananas',
])
```

<!-- fiddle-end -->

## [.scrollIntoView()](https://on.cypress.io/scrollintoview)

To scroll an element into view, use the `cy.scrollIntoView()` command.

<!-- fiddle .scrollIntoView() - scroll an element into view -->

```html
<div
  id="scroll-horizontal"
  style="height: 300px; width: 300px; overflow: auto;"
>
  <div style="width: 1000px; position: relative;">
    Horizontal Scroll
    <button
      class="btn btn-danger"
      style="position: absolute; top: 0; left: 500px;"
    >
      I'm Here
    </button>
  </div>
</div>

<div
  id="scroll-vertical"
  style="height: 300px; width: 300px; overflow: auto;"
>
  <div style="height: 1000px; position: relative;">
    Vertical Scroll
    <button
      class="btn btn-danger"
      style="position: absolute; top: 500px; left: 0"
    >
      I'm Here
    </button>
  </div>
</div>

<div
  id="scroll-both"
  style="height: 300px; width: 300px; overflow: auto;"
>
  <div style="width: 1000px; height: 1000px; position: relative;">
    Both Scroll
    <button
      class="btn btn-danger"
      style="position: absolute; top: 500px; left: 500px"
    >
      I'm Here
    </button>
  </div>
</div>
```

```js
// normally all of these buttons are hidden,
// because they're not within
// the viewable area of their parent
// (we need to scroll to see them)
cy.get('#scroll-horizontal button').should('not.be.visible')

// scroll the button into view, as if the user had scrolled
cy.get('#scroll-horizontal button')
  .scrollIntoView()
  .should('be.visible')

cy.get('#scroll-vertical button').should('not.be.visible')

// Cypress handles the scroll direction needed
cy.get('#scroll-vertical button')
  .scrollIntoView()
  .should('be.visible')

cy.get('#scroll-both button').should('not.be.visible')

// Cypress knows to scroll to the right and down
cy.get('#scroll-both button').scrollIntoView().should('be.visible')
```

<!-- fiddle-end -->

## [.scrollTo()](https://on.cypress.io/scrollto)

To scroll the window or a scrollable element to a specific position, use the `cy.scrollTo()` command.

<!-- fiddle .scrollTo() - scroll the window or element to a position -->

```html
<div
  id="scrollable-horizontal"
  style="height: 150px; width: 300px; overflow: auto;"
>
  <div style="width: 3000px">
    Horizontal Scroll
    <ul>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
    </ul>
  </div>
</div>

<div
  id="scrollable-vertical"
  style="height: 150px; width: 300px; overflow: auto;"
>
  <div style="height: 1000px">
    Vertical Scroll
    <ul>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
      <li>
        <img src="https://placehold.it/100x100" />
      </li>
    </ul>
  </div>
</div>

<div
  id="scrollable-both"
  style="height: 150px; width: 300px; overflow: auto;"
>
  <div style="width: 1000px; height: 1000px; position: relative;">
    Both Scroll
    <button
      class="btn btn-danger"
      style="position: absolute; top: 500px; left: 500px"
    >
      I'm Here
    </button>
  </div>
</div>
```

```js
// You can scroll to 9 specific positions of an element:
//  -----------------------------------
// | topLeft        top       topRight |
// |                                   |
// |                                   |
// |                                   |
// | left          center        right |
// |                                   |
// |                                   |
// |                                   |
// | bottomLeft   bottom   bottomRight |
//  -----------------------------------
// if you chain .scrollTo() off of cy, we will
// scroll the entire window
cy.scrollTo('bottom')

cy.get('#scrollable-horizontal').scrollTo('right')

// or you can scroll to a specific coordinate:
// (x axis, y axis) in pixels
cy.get('#scrollable-vertical').scrollTo(250, 250)

// or you can scroll to a specific percentage
// of the (width, height) of the element
cy.get('#scrollable-both').scrollTo('75%', '25%')

// control the easing of the scroll (default is 'swing')
cy.get('#scrollable-vertical').scrollTo('center', {
  easing: 'linear',
})

// control the duration of the scroll (in ms)
cy.get('#scrollable-both').scrollTo('center', { duration: 2000 })
```

<!-- fiddle-end -->

## [.trigger()](https://on.cypress.io/trigger)

To trigger an event on a DOM element, use the `cy.trigger()` command.

<!-- fiddle .trigger() - trigger an event on a DOM element -->

```html
<form>
  <fieldset>
    <label for="range-input">Range Input</label>
    <input
      class="trigger-input-range"
      name="range-input"
      type="range"
      value="0"
    />
    <p>0</p>
  </fieldset>
</form>
```

```js
// To interact with a range input (slider)
// we need to set its value & trigger the
// event to signal it changed

// Here, we invoke jQuery's val() method to set
// the value and trigger the 'change' event
cy.get('.trigger-input-range')
  .invoke('val', 25)
  .trigger('change')
  .get('input[type=range]')
  .siblings('p')
  .should('have.text', '25')
```

<!-- fiddle-end -->
