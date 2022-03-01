# Actions

Examples of actions being performed on DOM elements in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [.type()](https://on.cypress.io/type)

To type into a DOM element, use the `.type()` command.

<!-- fiddle type -->

```html
<form>
  <div class="form-group">
    <label for="name1">Name</label>
    <input
      type="text"
      class="form-control"
      id="name1"
      placeholder="Joe Bravo"
    />
  </div>
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

You can clear the field before typing

```js
cy.get('#name1')
  .type('Joe')
  // use "have.value" assertion to check the input element's value
  .should('have.value', 'Joe')
  .clear()
  .type('Джо Браво')
  .should('have.value', 'Джо Браво')
```

<!-- fiddle-end -->

## [.focus()](https://on.cypress.io/focus)

To focus on a DOM element, use the `.focus()` command.

<!-- fiddle focus -->

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

<!-- fiddle blur -->

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

<!-- fiddle clear -->

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

<!-- fiddle submit -->

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
<script>
  $('.action-form').on('submit', function (e) {
    e.preventDefault()

    const text = document.createElement('p')
    text.innerText = 'Your form has been submitted!'
    $(text).insertAfter(e.currentTarget).css('color', '#20B520')
  })
</script>
```

```js
cy.get('.action-form').find('[type="text"]').type('HALFOFF')
cy.get('.action-form')
  .submit()
  .next()
  .should('contain', 'Your form has been submitted!')
  .and('be.visible')
```

<!-- fiddle-end -->

## [.click()](https://on.cypress.io/click)

To click a DOM element, use the `.click()` command.

<!-- fiddle click / a single button -->
<!-- fiddle-markup
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
-->

```html
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
<script>
  $('[data-toggle=popover]').popover()
</script>
```

```js
cy.get('.action-btn')
  .click()
  // when popover appears it adds an attribute
  .should('have.attr', 'aria-describedby')
// close it
cy.get('.action-btn')
  .click()
  .should('not.have.attr', 'aria-describedby')
```

<!-- fiddle-end -->

### Click on canvas

<!-- fiddle click / on a canvas -->

```html
<h6>Canvas to Illustrate Click Positions</h6>
<canvas width="250" height="250" id="action-canvas"></canvas>
<script>
  // place variable declarations into a closure
  // to avoid accidental name clashes
  ;(function () {
    // begin: draw dots on canvas on mouse click ---
    const canvas = document.getElementById('action-canvas')
    const context = canvas.getContext('2d')

    $('#action-canvas').on('click', function (e) {
      draw(e)
    })

    function draw(e) {
      const pos = getMousePos(canvas, e)
      const posx = pos.x
      const posy = pos.y

      context.fillStyle = 'red'
      context.beginPath()
      context.arc(posx, posy, 5, 0, 2 * Math.PI)
      context.fill()
    }

    function getMousePos(canvas, evt) {
      const rect = canvas.getBoundingClientRect()

      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
      }
    }
  })()
</script>
```

```js
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

// .click() accepts a an x and y coordinate
// that controls where the click occurs :)
cy.get('#action-canvas')
  .click(80, 75)
  .click(170, 75)
  .click(80, 165)
  .click(100, 185)
  .click(125, 190)
  .click(150, 185)
  .click(170, 165)
```

<!-- fiddle-end -->

### Click on multiple elements

You can click on multiple elements by passing an option `multiple: true`

<!-- fiddle click / on multiple elements -->
<!-- fiddle-markup
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
-->

```html
<div class="action-labels">
  <span
    class="badge badge-pill badge-primary label"
    data-toggle="popover"
    data-placement="bottom"
    data-content="clicked"
    >click me</span
  >
  <span
    class="badge badge-pill badge-primary label"
    data-toggle="popover"
    data-placement="bottom"
    data-content="clicked"
    >and me</span
  >
  <span
    class="badge badge-pill badge-primary label"
    data-toggle="popover"
    data-placement="bottom"
    data-content="clicked"
    >and me</span
  >
  <span
    class="badge badge-pill badge-primary label"
    data-toggle="popover"
    data-placement="bottom"
    data-content="clicked"
    >and me</span
  >
  <span
    class="badge badge-pill badge-primary label"
    data-toggle="popover"
    data-placement="bottom"
    data-content="clicked"
    >and me</span
  >
  <span
    class="badge badge-pill badge-primary label"
    data-toggle="popover"
    data-placement="bottom"
    data-content="clicked"
    >and me</span
  >
</div>
<script>
  $('[data-toggle=popover]').popover()
</script>
```

```js
// click multiple elements by passing multiple: true
cy.get('.action-labels>.label').click({ multiple: true })
// confirm the badges got popovers
cy.get('[data-toggle=popover][aria-describedby]').should(
  'have.length',
  6,
)
```

<!-- fiddle-end -->

### Click on disabled element

You can override Cypress' built-in checks and click on the disable element.

<!-- fiddle click / on disabled element -->
<!-- fiddle-markup
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
-->

```html
<style>
  .action-opacity {
    position: relative;
    margin-top: 50px;
  }

  .action-opacity .opacity-cover {
    text-align: center;
    line-height: 50px;
    color: #333;
    font-weight: bold;
    font-size: 25px;
    position: absolute;
    top: -5px;
    left: -5px;
    width: 235px;
    height: 60px;
    background-color: red;
    opacity: 0.7;
    box-shadow: 0 2px 7px #000;
  }
</style>
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
<script>
  $('[data-toggle=popover]').popover()
</script>
```

```js
// Ignore error checking prior to clicking
cy.get('.action-opacity>.btn').click({ force: true })
```

<!-- fiddle-end -->

### Click waits for visible element

The element will need to be visible and actionable for `.click` to work. If the element is invisible for example, the `.click` retries until the element becomes visible or the command times out.

<!-- fiddle click / waits for element to be visible -->

```html
<button id="invisible-at-first" style="display:none">
  Click me
</button>
<script>
  setTimeout(function () {
    document.getElementById('invisible-at-first').style.display =
      'block'
  }, 500)
</script>
```

```js
cy.get('#invisible-at-first').click({ timeout: 1000 })
```

<!-- fiddle-end -->

<!-- fiddle click / after assertion -->

To be explicit about visibility, you might insert an assertion before the `.click` command.

```html
<button id="invisible-at-first2" style="display:none">
  Click me
</button>
<script>
  setTimeout(function () {
    document.getElementById(
      'invisible-at-first2',
    ).style.display = 'block'
  }, 500)
</script>
```

```js
cy.get('#invisible-at-first2')
  .should('be.visible')
  .click({ timeout: 50 })
```

<!-- fiddle-end -->

## [.dblclick()](https://on.cypress.io/dblclick)

To double click a DOM element, use the `.dblclick()` command.

<!-- fiddle dblclick -->

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
<script>
  // listen to dblclick to demonstrate logic on double click command
  $('.action-div').on('dblclick', function (e) {
    $('.action-input-hidden').removeClass('hidden').focus()
    $(e.currentTarget).addClass('hidden')
  })
</script>
```

```js
cy.get('.action-div').dblclick().should('not.be.visible')
cy.get('.action-input-hidden').should('be.visible')
```

<!-- fiddle-end -->

## [.rightclick()](https://on.cypress.io/rightclick)

To right click a DOM element, use the `.rightclick()` command.

<!-- fiddle rightclick -->

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
<script>
  // listen to contextmenu to demonstrate logic on right click command
  $('.rightclick-action-div').on('contextmenu', function (e) {
    $('.rightclick-action-input-hidden')
      .removeClass('hidden')
      .focus()
    $(e.currentTarget).addClass('hidden')
  })
</script>
```

```js
cy.get('.rightclick-action-div')
  .rightclick()
  .should('not.be.visible')
cy.get('.rightclick-action-input-hidden').should('be.visible')
```

<!-- fiddle-end -->

## [.check()](https://on.cypress.io/check)

To check a checkbox or radio, use the `.check()` command.

<!-- fiddle check -->

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

**Tip:** Looking to check [indeterminate checkboxes](https://css-tricks.com/indeterminate-checkboxes/)? Check out the example repo [bahmutov/indeterminate-checkboxes](https://github.com/bahmutov/indeterminate-checkboxes).

### Get checked option

You can get the currently checked option using the jQuery's [:checked selector](https://api.jquery.com/checked-selector/).

<!-- fiddle checked selector / for radio input -->

```html
<form id="pick-fruit">
  <div>
    <input
      type="radio"
      name="fruit"
      value="orange"
      id="orange"
    />
    <label for="orange">orange</label>
  </div>
  <div>
    <input
      type="radio"
      name="fruit"
      value="apple"
      id="apple"
      checked="checked"
    />
    <label for="apple">apple</label>
  </div>
  <div>
    <input
      type="radio"
      name="fruit"
      value="banana"
      id="banana"
    />
    <label for="banana">banana</label>
  </div>
  <div id="log"></div>
</form>
```

```js
cy.get('#pick-fruit :checked')
  .should('be.checked')
  .and('have.value', 'apple')
```

<!-- fiddle-end -->

The same selector works for checkbox elements

<!-- fiddle checked selector / for checkbox elements -->

```html
<form id="newsletter">
  <h3>Newsletter frequency</h3>
  <p>
    <input
      type="checkbox"
      name="newsletter"
      value="Hourly"
      checked="checked"
      title="hourly"
    />

    <input
      type="checkbox"
      name="newsletter"
      value="Daily"
      title="daily"
    />
    <input
      type="checkbox"
      name="newsletter"
      value="Weekly"
      title="weekly"
    />

    <input
      type="checkbox"
      name="newsletter"
      value="Monthly"
      title="monthly"
      checked
    />
    <input
      type="checkbox"
      name="newsletter"
      value="Yearly"
      title="yearly"
    />
  </p>
</form>
```

```js
cy.get('#newsletter :checked')
  .should('have.length', 2)
  .first()
  .should('have.value', 'Hourly')
```

<!-- fiddle-end -->

## [.uncheck()](https://on.cypress.io/uncheck)

To uncheck a checkbox or radio, use the `.uncheck()` command.

<!-- fiddle uncheck -->

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
      <input
        type="checkbox"
        value="checkbox2"
        disabled
        checked
      />
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

To select an option in a select, use the `.select()` command.

<!-- fiddle select -->

```html
<form>
  <select class="form-control action-select">
    <option>--Select a fruit--</option>
    <option value="fr-apples">apples</option>
    <option value="fr-oranges">oranges</option>
    <option value="fr-bananas">bananas</option>
  </select>

  <select
    class="form-control action-select-multiple"
    multiple="true"
  >
    <option value="fr-apples">apples</option>
    <option value="fr-oranges">oranges</option>
    <option value="fr-bananas">bananas</option>
  </select>
</form>
```

```js
// at first, no option should be selected
cy.get('.action-select').should(
  'have.value',
  '--Select a fruit--',
)

// Select option(s) with matching text content
cy.get('.action-select').select('apples')
// confirm the apples were selected
// note that each value starts with "fr-" in our HTML
cy.get('.action-select').should('have.value', 'fr-apples')

cy.get('.action-select-multiple')
  .select(['apples', 'oranges', 'bananas'])
  // when getting multiple values, invoke "val" method first
  .invoke('val')
  // because we are comparing arrays, we need to use "deep.equal" assertion
  .should('deep.equal', [
    'fr-apples',
    'fr-oranges',
    'fr-bananas',
  ])

// Select option(s) with matching value
cy.get('.action-select')
  .select('fr-bananas')
  // can attach an assertion right away to the element
  .should('have.value', 'fr-bananas')

cy.get('.action-select-multiple')
  .select(['fr-apples', 'fr-oranges', 'fr-bananas'])
  .invoke('val')
  // because we are comparing arrays, we need to use "deep.equal" assertion
  .should('deep.equal', [
    'fr-apples',
    'fr-oranges',
    'fr-bananas',
  ])
// assert the selected values include oranges
cy.get('.action-select-multiple')
  .invoke('val')
  .should('include', 'fr-oranges')
```

You can select an option by index.

```js
// select the very first option (the index starts at zero)
cy.get('.action-select')
  .select(0)
  .should('have.value', '--Select a fruit--')
  // select the apple option, which is at index 1
  .select(1)
  .should('have.value', 'fr-apples')
```

Select multiple options by index

```js
cy.get('.action-select-multiple')
  .select([1, 2])
  .invoke('val')
  // because we are comparing arrays, we need to use "deep.equal" assertion
  .should('deep.equal', ['fr-oranges', 'fr-bananas'])
```

<!-- fiddle-end -->

## [.scrollIntoView()](https://on.cypress.io/scrollintoview)

To scroll an element into view, use the `.scrollintoview()` command.

<!-- fiddle scrollIntoView -->
<!-- fiddle-markup
<style>
#scroll-horizontal,
#scroll-vertical,
#scroll-both,
#scrollable-horizontal,
#scrollable-vertical,
#scrollable-both {
  background-color: #ddd;
  border: 1px solid #777;
  border-radius: 4px;
  margin-bottom: 15px;
}

#scrollable-horizontal ul,
#scrollable-vertical ul,
#scrollable-both ul {
  padding: 0;
  overflow: auto;
}

#scrollable-horizontal ul > li,
#scrollable-vertical ul > li,
#scrollable-both ul > li {
  list-style: none;
  margin: 20px;
  float: left;
}

#scrollable-horizontal ul > li {
  display: inline-block;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
</style>
-->

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
  <div
    style="width: 1000px; height: 1000px; position: relative;"
  >
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
// https://on.cypress.io/scrollintoview

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
cy.get('#scroll-both button')
  .scrollIntoView()
  .should('be.visible')
```

<!-- fiddle-end -->

## [.scrollTo()](https://on.cypress.io/scrollto)

To scroll the window or a scrollable element to a specific position, use the `cy.scrollTo()` command.

<!-- fiddle scrollTo -->
<!-- fiddle-markup
<style>
#scroll-horizontal,
#scroll-vertical,
#scroll-both,
#scrollable-horizontal,
#scrollable-vertical,
#scrollable-both {
  background-color: #ddd;
  border: 1px solid #777;
  border-radius: 4px;
  margin-bottom: 15px;
}

#scrollable-horizontal ul,
#scrollable-vertical ul,
#scrollable-both ul {
  padding: 0;
  overflow: auto;
}

#scrollable-horizontal ul > li,
#scrollable-vertical ul > li,
#scrollable-both ul > li {
  list-style: none;
  margin: 20px;
  float: left;
}

#scrollable-horizontal ul > li {
  display: inline-block;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
</style>
-->

```html
<div id="scrollable-horizontal" style="height: 150px; width: 300px; overflow: auto;">
    <div style="width: 3000px">
      Horizontal Scroll
      <ul>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
      </ul>
    </div>
  </div>

  <div id="scrollable-vertical" style="height: 150px; width: 300px; overflow: auto;">
    <div style='height: 1000px'>
      Vertical Scroll
      <ul>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
        <li>
          <img src="https://placehold.it/100x100">
        </li>
      </ul>
    </div>
  </div>

  <div id="scrollable-both" style="height: 150px; width: 300px; overflow: auto;">
    <div style="width: 1000px; height: 1000px; position: relative;">
      Both Scroll
      <button class="btn btn-danger" style="position: absolute; top: 500px; left: 500px">I'm Here</button>
    </div>
  </div>
</div>
```

```js
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

To trigger an event on a DOM element, use the `.trigger()` command.

<!-- fiddle trigger -->

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
<script>
  // listen to input range for trigger command
  $('.trigger-input-range').on('change', function (e) {
    const $range = $(e.target)
    $range.next('p').text($range.val())
  })
</script>
```

```js
cy.get('.trigger-input-range')
  .invoke('val', 25)
  .trigger('change')
  .get('input[type=range]')
  .siblings('p')
  .should('have.text', '25')
```

<!-- fiddle-end -->

### Trigger a click event on a disabled button

<!-- fiddle trigger a click event on a disabled button -->

```html
<div id="click-disabled">
  <button id="a-button" disabled>Click me</button>
  <div id="result"></div>
</div>
<script>
  document
    .querySelector('#click-disabled #a-button')
    .addEventListener('click', function () {
      document.querySelector(
        '#click-disabled #result',
      ).innerText = 'Clicked'
    })
</script>
```

We cannot click on a disabled button using `cy.click` command. We can if we remove the "disabled" attribute first.

```js
cy.get('#click-disabled #a-button')
  .invoke('removeAttr', 'disabled')
  .trigger('click')
cy.contains('#click-disabled #result', 'Clicked')
```

<!-- fiddle-end -->

## Using jQuery click

<!-- fiddle Using jQuery click -->

```html
<div id="jquery-click">
  <button id="a-button">Click me</button>
  <div id="result"></div>
</div>
<script>
  document
    .querySelector('#jquery-click #a-button')
    .addEventListener('click', function () {
      document.querySelector('#jquery-click #result').innerText =
        'Clicked'
    })
</script>
```

```js
cy.get('#jquery-click #a-button').then(($button) => {
  // bypass all built-in Cypress checks
  // by using the jQuery click method
  // https://api.jquery.com/click/
  $button.click()
})
cy.contains('#jquery-click #result', 'Clicked')
```

<!-- fiddle-end -->
