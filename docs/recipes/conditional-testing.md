# Conditional testing

Conditional testing is [strongly discouraged](https://on.cypress.io/conditional-testing) in Cypress. But if you _must_ do something conditionally in Cypress depending on the page, here are few examples.

## Toggle checkbox

Let's say that you have a checkbox when the page loads. Sometimes the checkbox is checked, sometimes not. How do you toggle the checkbox?

<!-- fiddle Toggle first solution-->

```html
<div>
  <input type="checkbox" id="done" />
  <label for="done">Toggle me!</label>
</div>
<script>
  // sometimes the checkbox is checked
  const dice = Math.random()
  if (dice < 0.5) {
    document.querySelector('input').checked = true
  }
</script>
```

```js
// first solution using jQuery $.prop
cy.get('input').then(($checkbox) => {
  const initial = Boolean($checkbox.prop('checked'))
  // let's toggle
  cy.log(`Initial checkbox: **${initial}**`)
  // toggle the property "checked"
  $checkbox.prop('checked', !initial)
})
```

<!-- fiddle-end -->

Alternative solution

<!-- fiddle Toggle second solution -->

```html
<div>
  <input type="checkbox" id="done" />
  <label for="done">Toggle me!</label>
</div>
<script>
  // sometimes the checkbox is checked
  const dice = Math.random()
  if (dice < 0.5) {
    document.querySelector('input').checked = true
  }
</script>
```

```js
cy.get('input')
  .as('checkbox')
  .invoke('is', ':checked') // use jQuery $.is(...)
  .then((initial) => {
    cy.log(`Initial checkbox: **${initial}**`)
    if (initial) {
      cy.get('@checkbox').uncheck()
    } else {
      cy.get('@checkbox').check()
    }
  })
```

<!-- fiddle-end -->

## Element does not exist or is invisible

Imagine we want to pass the test if the element does not exist or is invisible. We will use [Cypress.dom](../cypress-api/index.md) utility methods and retry the assertion using [.should(cb)](../commands/assertions.md) method.

<!-- fiddle Does not exist or is invisible -->

```html
<div id="either">
  <div id="disappears">Should go away</div>
  <div id="hides">Should not see me</div>
</div>
<script>
  setTimeout(() => {
    const disappears = document.getElementById('disappears')
    disappears.parentNode.removeChild(disappears)
  }, 500)

  setTimeout(() => {
    const hides = document.getElementById('hides')
    hides.style.display = 'none'
  }, 1000)
</script>
```

```js
const isNonExistentOrHidden = ($el) =>
  !Cypress.dom.isElement($el) || !Cypress.dom.isVisible($el)

// let's assert an element does not exist
cy.get('#either #disappears').should(($el) => {
  expect(isNonExistentOrHidden($el)).to.be.true
})
// let's assert an element becomes invisible
cy.get('#either #hides').should(($el) => {
  expect(isNonExistentOrHidden($el)).to.be.true
})
```

<!-- fiddle-end -->

## Click a button if present

Let's say that we want to click a button if it is present on the page. We need to avoid triggering the built-in existence assertion in the `cy.get` or `cy.contains` commands, and click the button only after checking it ourselves.

<!-- fiddle Click a button if present -->

```html
<div>
  <p>The button might appear here</p>
  <div id="output"></div>
</div>
<script>
  if (Math.random() < 0.5) {
    const output = document.getElementById('output')
    const btn = document.createElement('button')
    btn.innerHTML = 'Click Me'
    output.appendChild(btn)
    btn.addEventListener('click', () => {
      console.log('Clicked')
    })
  }
</script>
```

```js
// get the button but disable the built-in cy.contains assertions
// by appending our own dummy .should() assertion
cy.contains('button', 'Click Me')
  .should((_) => {})
  .then(($button) => {
    if (!$button.length) {
      // there is no button
      cy.log('there is no button')
      return
    } else {
      cy.window().then((win) => {
        cy.spy(win.console, 'log').as('log')
      })
      cy.wrap($button).click()
      cy.get('@log').should(
        'have.been.calledOnceWith',
        'Clicked',
      )
    }
  })
```

<!-- fiddle-end -->

## Click a button if not disabled

Let's say that we want to click a button if it not disabled. Otherwise, just print a message to the `console.log`

<!-- fiddle Click a button if it is not disabled -->

```html
<div>
  <p>
    The button might be disabled
    <button id="btn">Click Me</button>
  </p>
</div>
<script>
  const btn = document.getElementById('btn')
  btn.addEventListener('click', function () {
    alert('Clicked')
  })

  if (Math.random() < 0.5) {
    btn.setAttribute('disabled', 'disabled')
  }
</script>
```

Let's prepare a stub around `window.alert` method.

```js hide
// spy on the "window.alert"
cy.window().then((win) => {
  cy.stub(win, 'alert').as('alert')
})
```

```js hide
cy.contains('#btn', 'Click Me')
  // cy.contains has a built-in "existence" assertion
  // thus by now we know the button is there
  .then(($btn) => {
    if ($btn.attr('disabled')) {
      console.log('Cannot click a disabled button')
    } else {
      cy.wrap($btn).click()
      cy.get('@alert')
        .should('have.been.calledOnce')
        // we can immediately reset the stub call history
        .invoke('resetHistory')
    }
  })
```

You can even use the jQuery helper method [is](https://api.jquery.com/is/) to check if the button is currently disabled.

```js
cy.contains('#btn', 'Click Me').then(($btn) => {
  if ($btn.is(':disabled')) {
    cy.log('Button is disabled')
  } else {
    cy.log('Can click it')
  }
})
```

jQuery has `:enabled` check too which you can use. It is the opposite of `:disabled` check.

```js
cy.contains('#btn', 'Click Me').then(($btn) => {
  if ($btn.is(':enabled')) {
    cy.log('Clicking...')
    cy.wrap($btn).click()
    cy.get('@alert').should('have.been.calledOnce')
  } else {
    cy.log('Button is disabled')
  }
})
```

<!-- fiddle-end -->

## Click a button if a class is present

Sometimes you want to click the button, but only if the element has a class

<!-- fiddle Click a button if a class is present -->

```html
<button id="first" class="urgent important" disabled="disabled">
  Click NOW
</button>
<script>
  // notice that at first the button is disabled
  // and we need to use the built-in action checks in cy.click
  const first = document.getElementById('first')
  first.addEventListener('click', () => {
    console.log('first click')
  })
  // remove the disabled property
  setTimeout(() => {
    first.disabled = false
  }, 1000)
</script>
```

```js
// spy on the console.log to make sure it is called
cy.window()
  .its('console')
  .then((console) => cy.spy(console, 'log').as('log'))

cy.get('#first').then(($first) => {
  if ($first.hasClass('important')) {
    // note that we cannot simply use jQuery .click() method
    // since it won't wait for the button to be enabled
    // $first.click()
    // instead we wrap the element and use the cy.click() command
    cy.wrap($first).click()
  }
})
// confirm the button was called correctly
cy.get('@log').should('be.calledOnceWith', 'first click')
```

<!-- fiddle-end -->

## Count elements if they exist

Let's confirm the number of elements is even, if they exist. If the elements do not exist, do nothing.

<!-- fiddle Count elements if they exist -->

```html
<ul id="people">
  <li>Joe</li>
  <li>Anna</li>
</ul>
```

First, let's have a list of elements that do exist.

```js
const isEven = (n) => n % 2 === 0

cy.get('#people li')
  .should(Cypress._.noop)
  .its('length')
  .then((n) => {
    if (n) {
      expect(n).to.satisfy(isEven)
    }
  })
```

The same code works if the elements are not found.

```js
cy.get('#invalid-selector li')
  .should(Cypress._.noop)
  .its('length')
  .then((n) => {
    if (n) {
      expect(n).to.satisfy(isEven)
    }
  })
```

<!-- fiddle-end -->

## Count elements if they exist after delay

📺 Watch this recipe explained in the video [Conditional Count Elements After They Have Been Loaded](https://youtu.be/87yWwGk40Ok).

<!-- fiddle Count elements if they exist after delay -->

```html hide
<ul id="people"></ul>
<script>
  setTimeout(() => {
    const list = document.getElementById('people')
    if (Math.random() < 0.5) {
      list.innerHTML = `
        <li>Joe</li>
        <li>Anna</li>
      `
    }
    list.setAttribute('data-loaded', 'true')
  }, 900)
</script>
```

The list above is initialized after a delay of almost one second. The list might be empty or it might have list items. How do we get the number of list items _if they exist_? The following code will NOT work. Yes, it handles the elements no existing, but the length will _always_ be zero, since we are checking the elements before the list has a chance to appear in the DOM:

```js skip
// 🚨 INCORRECT, the number of elements will always be zero
cy.get('#people li')
  .should(Cypress._.noop)
  .its('length')
  .should('be.oneOf', [0, 2])
```

We could always wait one second and check the elements. This is slow but works when the list items are added or not.

```js skip
// ⚠️ WORKS BUT HAS A BUILT-IN DELAY
cy.wait(1000)
cy.get('#people li')
  .should(Cypress._.noop)
  .its('length')
  .should('be.oneOf', [0, 2])
```

A much better solution is to first retry until the data is loaded, then use conditional testing to get the elements if they exist. We know the data has been loaded when the element `#people` gets the attribute `data-loaded=true`. This attribute is set in all cases, even if there will be no list items inserted.

```js
// ✅ RECOMMENDED
// the top-level CY.GET command uses built-in existence assertion
// to retry until the attribute is set and the element is found
cy.get('#people[data-loaded=true]')
  // the LI elements might be there or not
  // so we disable the built-in existence assertion
  // using the "noop" should callback
  .find('li')
  .should(Cypress._.noop)
  .its('length')
  .should('be.oneOf', [0, 2])
```

<!-- fiddle-end -->

For more, read the blog post [Negative Assertions And Missing States](https://glebbahmutov.com/blog/negative-assertions-and-missing-states/).

## Use a cookie if present

Getting a cookie using [cy.getCookie](https://on.cypress.io/getcookie) command does not retry, thus you can simply work with the yielded value.

<!-- fiddle Print the cookie if it exists -->

```js
function printCookieMaybe(cookie) {
  if (cookie) {
    cy.log(`Found the cookie with value: ${cookie.value}`)
  } else {
    cy.log('No cookie for you')
  }
}
cy.getCookie('my-cookie').then(printCookieMaybe)
cy.setCookie('my-cookie', 'nice')
cy.getCookie('my-cookie').then(printCookieMaybe)
```

<!-- fiddle-end -->

## Perform different actions depending on the URL

As always, when getting something from the page, you get its value in the `.then(callback)`. If you get the current URL using [cy.location](https://on.cypress.io/location) or [cy.url](https://on.cypress.io/url), you can decide what to do next based on its value:

<!-- fiddle Depending on the URL -->

```js
cy.location('pathname').then((pathname) => {
  if (pathname.includes('/about/')) {
    cy.log('At the About page')
  } else {
    cy.log('Another page')
  }
})
```

<!-- fiddle-end -->

## Skip the rest of the test if an element exists

<!-- fiddle Skip the rest if an element exists -->

```html
<output id="app" />
<script>
  // in half of the cases, the element will be there
  if (Math.random() < 0.5) {
    document.getElementById('app').innerHTML = `
      <div data-dynamic="true">Dynamic</div>
    `
  }
</script>
```

Our test first checks the element with id "app". If it has _at that moment_ a child with text "Dynamic", then we confirm that element has an attribute "data-dynamic=true". If the `#app` element does not have a child element with text "Dynamic" then we stop the test by not executing any more Cypress commands

```js
// using the CSS :has selector to find the element
cy.get('#app:has(div)')
  // we don't know if the element exists or not
  // so we bypass the built-in existence assertion
  // using the no-operator should(callback)
  .should(Cypress._.noop)
  .then(($el) => {
    if (!$el.length) {
      cy.log('No element, stopping')
      // note: the test cannot have any more commands
      // _after_ this cy.then command if you really
      // want to stop the test
      return
    }

    // the element exists, let's confirm something about it
    cy.contains('#app div', 'Dynamic').should(
      'have.attr',
      'data-dynamic',
      'true',
    )
    // equivalent assertion without using Cypress chain
    // and just using jQuery and Chai-jQuery combination
    // (no retry-ability, immediate assertion)
    expect($el.find('div'), 'has the attribute').to.have.attr(
      'data-dynamic',
      'true',
    )
  })
```

Note: we only skip the rest of the test commands inside the callback. If you want to really stop the test at run-time, see the [cypress-skip-test](https://github.com/cypress-io/cypress-skip-test) plugin.

<!-- fiddle-end -->

## cypress-if

If you MUST use conditional commands in your tests, check out my [cypress-if](https://github.com/bahmutov/cypress-if) plugin.

```js
import 'cypress-if'

cy.get('#agreed')
  .if('not.checked')
  .click() // IF path
  .else()
  .log('The user already agreed') // ELSE path
```

Read the blog post [Conditional Commands For Cypress](https://glebbahmutov.com/blog/cypress-if/).

## cypress-recurse

You can implement advanced "run Cypress commands until this condition becomes true" flows using my plugin [cypress-recurse](https://github.com/bahmutov/cypress-recurse). For example, let's test a loading element that might never change its text. We still don't want to fail the test, but we want to log a message if so.

<!-- fiddle cypress-recurse / Loading element text -->

```html hide
<div id="loader">Loading ...</div>
<script>
  if (Math.random() < 0.5) {
    const delay = 500 + Math.round(3000 * Math.random())
    setTimeout(() => {
      document.getElementById('loader').innerText =
        'Matches found: ' +
        String(Math.random()).slice(2, 3) +
        ' took ' +
        delay +
        'ms'
    }, delay)
  }
</script>
```

We do not know if the loading finishes quickly or slowly. Thus we want to keep checking, and as soon as it goes away, we want to confirm that `Matches found: <number>` is shown. But if the loading text does not go away in 5 seconds, no big deal. We will just log a message.

```js
// cy.recurse comes from cypress-recurse plugin
cy.recurse(
  () => cy.get('#loader').invoke('text'),
  (text) => !text.includes('Loading'),
  {
    timeout: 5_000,
    doNotFail: true,
    yield: 'value',
    log: 'Loaded',
    // pause between attempts
    delay: 500,
  },
).then((text) => {
  // conditional testing depending on the text
  if (text.includes('Loading')) {
    cy.log('Never showed matches')
  } else {
    cy.contains('#loader', /Matches found: \d/)
  }
})
```

<!-- fiddle-end -->

Related blog posts [Cypress Needs Soft Assertions](https://glebbahmutov.com/blog/cypress-soft-assertions/) and [Negative Assertions And Missing States](https://glebbahmutov.com/blog/negative-assertions-and-missing-states/).

### A better loading test

The above example mixes up loading and error states. A much better application would set something observable to notify us when it finishes loading, even if it does not change the "Loading ..." text. For example, let's set a class when finishing loading in all cases.

<!-- fiddle cypress-recurse / Loading element text refactored -->

```html hide
<style>
  .loaded {
    color: green;
    font-weight: bold;
  }
</style>
<div id="loader">Loading ...</div>
<script>
  const delay = 500 + Math.round(3000 * Math.random())
  setTimeout(() => {
    const el = document.getElementById('loader')
    // always set CSS class name when finished loading
    el.classList.add('loaded')
    if (Math.random() < 0.5) {
      el.innerText =
        'Matches found: ' +
        String(Math.random()).slice(2, 3) +
        ' took ' +
        delay +
        'ms'
    }
  }, delay)
</script>
```

Now the test is _much_ simpler to write and is as fast as possible.

```js
cy.get('#loader')
  .should('have.class', 'loaded')
  .invoke('text')
  .then((text) => {
    // conditional testing depending on the text
    if (text.includes('Loading')) {
      cy.log('Never showed matches')
    } else {
      cy.contains('#loader', /Matches found: \d/)
    }
  })
```

<!-- fiddle-end -->

## More examples

- [Conditional accept](./conditional-accept.md) recipe
- [Add / delete list item recipe](./add-list-item.md)
- [Number of elements](./number-of-elements.md)
