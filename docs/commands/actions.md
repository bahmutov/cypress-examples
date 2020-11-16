# Actions

Examples of actions being performed on DOM elements in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [.type()](https://on.cypress.io/type)

To type into a DOM element, use the `.type()` command.

<!-- fiddle type -->

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

<!-- fiddle click -->
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

<!-- fiddle click on canvas -->

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

You can click on multiple elements by passing an option `multiple: true`

<!-- fiddle click on multiple elements -->
<!-- fiddle-markup
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
-->

```html
<div class="action-labels">
  <span
    class="badge badge-pill badge-primary"
    data-toggle="popover"
    data-placement="bottom"
    data-content="clicked"
    >click me</span
  >
  <span
    class="badge badge-pill badge-primary"
    data-toggle="popover"
    data-placement="bottom"
    data-content="clicked"
    >and me</span
  >
  <span
    class="badge badge-pill badge-primary"
    data-toggle="popover"
    data-placement="bottom"
    data-content="clicked"
    >and me</span
  >
  <span
    class="badge badge-pill badge-primary"
    data-toggle="popover"
    data-placement="bottom"
    data-content="clicked"
    >and me</span
  >
  <span
    class="badge badge-pill badge-primary"
    data-toggle="popover"
    data-placement="bottom"
    data-content="clicked"
    >and me</span
  >
  <span
    class="badge badge-pill badge-primary"
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
cy.get('.action-labels>.badge').click({ multiple: true })
```

<!-- fiddle-end -->

You can override Cypress' built-in checks and click on the disable element.

<!-- fiddle click on disabled element -->
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
    $('.rightclick-action-input-hidden').removeClass('hidden').focus()
    $(e.currentTarget).addClass('hidden')
  })
</script>
```

```js
cy.get('.rightclick-action-div').rightclick().should('not.be.visible')
cy.get('.rightclick-action-input-hidden').should('be.visible')
```

<!-- fiddle-end -->
