# Cypress Examples

> Static site with Cypress examples tested right from the Markdown sources

## Commands

Commands drive your tests in the browser like a real user would. They let you perform actions like typing, clicking, xhr requests, and can also assert things like "my button should be disabled".

### [Querying](./commands/querying.md)

- [get](./commands/querying.md#cy-get)
- [contains](./commands/querying.md#cy-contains)
- [within](./commands/querying.md#within)
- [root](./commands/querying.md#cy-root)
- [Best Practices: Selecting elements](./commands/querying.md#best-practices-selecting-elements)
- [`cy.get` vs `.find`](./commands/querying.md#cy-get-vs-find)
- [Pseudo class selectors](./commands/querying.md#pseudo-class-selectors)

### [Traversal](./commands/traversal.md)

- [children](./commands/traversal.md#children)
- [closest](./commands/traversal.md#closest)
- [eq](./commands/traversal.md#eq)
- [filter](./commands/traversal.md#filter)
- [find](./commands/traversal.md#find)
- [first](./commands/traversal.md#first)
- [last](./commands/traversal.md#last)
- [next](./commands/traversal.md#next)
- [nextAll](./commands/traversal.md#nextAll)
- [nextUntil](./commands/traversal.md#nextUntil)
- [not](./commands/traversal.md#not)
- [parent](./commands/traversal.md#parent)
- [parents](./commands/traversal.md#parents)
- [parentsUntil](./commands/traversal.md#parentsUntil)
- [prev](./commands/traversal.md#prev)
- [prevAll](./commands/traversal.md#prevAll)
- [prevUntil](./commands/traversal.md#prevUntil)
- [siblings](./commands/traversal.md#siblings)
- [Actions](./commands/actions.md)
  - [type](./commands/actions.md#type)
  - [focus](./commands/actions.md#focus)
  - [blur](./commands/actions.md#blur)
  - [clear](./commands/actions.md#clear)
  - [submit](./commands/actions.md#submit)
  - [click](./commands/actions.md#click)
  - [dblclick](./commands/actions.md#dblclick)
  - [rightclick](./commands/actions.md#rightclick)
  - [check](./commands/actions.md#check)
  - [uncheck](./commands/actions.md#uncheck)
  - [select](./commands/actions.md#select)
  - [scrollIntoView](./commands/actions.md#scrollintoview)
  - [scrollTo](./commands/actions.md#scrollto)
  - [trigger](./commands/actions.md#trigger)

### [Viewport](./commands/viewport.md)

- [viewport](./commands/viewport.md#cy-viewport)

### [Location](./commands/location.md)

- [hash](./commands/location.md#cy-hash)
- [location](./commands/location.md#cy-location)
- [url](./commands/location.md#cy-url)

### [Window](./commands/window.md)

- [window](./commands/window.md#cy-window)
- [document](./commands/window.md#cy-document)
- [title](./commands/window.md#cy-title)

### [Assertions](./commands/assertions.md)

- [Implicit Assertions](./commands/assertions.md#implicit-assertions)
  - [should](./commands/assertions.md#should)
  - [and](./commands/assertions.md#and)
- [Explicit Assertions](./commands/assertions.md#explicit-assertions)
  - [expect](./commands/assertions.md#expect)
  - [assert](./commands/assertions.md#assert)
- [Should with callback function](./commands/assertions.md#should-with-callback-function)
- [Multiple assertions](./commands/assertions.md#multiple-assertions)
- [Comparing arrays](./commands/assertions.md#comparing-arrays)
- [Custom assertions](./commands/assertions.md#custom-chai-assertions)

### [Navigation](./commands/navigation.md)

- [go](./commands/navigation.md#cy-go)
- [reload](./commands/navigation.md#cy-reload)
- [visit](./commands/navigation.md#cy-visit)

### [Aliasing](./commands/aliasing.md)

- [as](./commands/aliasing.md#as)

### [Waiting](./commands/waiting.md)

- [wait](./commands/waiting.md#cy-wait)

### [Misc](./commands/misc.md)

- [log](./commands/misc.md#log)
- [end](./commands/misc.md#end)
- [exec](./commands/misc.md#cy-exec)
- [focused](./commands/misc.md#cy-focused)
- [screenshot](./commands/misc.md#cy-screenshot)
- [wrap](./commands/misc.md#cy-wrap)

### [Connectors](./commands/connectors.md)

- [each](./commands/connectors.md#each)
- [its](./commands/connectors.md#its)
- [invoke](./commands/connectors.md#invoke)
- [spread](./commands/connectors.md#spread)
- [then](./commands/connectors.md#then)

### [Network Requests](./commands/network-requests.md)

- [server](./commands/network-requests.md#cy-server)
- [request](./commands/network-requests.md#cy-request)
- [route](./commands/network-requests.md#cy-route)
- [intercept](./commands/network-requests.md#cy-intercept)

### [Local Storage](./commands/local-storage.md)

- [clearLocalStorage](./commands/local-storage.md#cy-clearlocalstorage)

### [Files](./commands/files.md)

- [fixture](./commands/files.md#cy-fixture)
- [fixture or require](./commands/files.md#cy-fixture-or-require)
- [readFile](./commands/files.md#cy-readfile)
- [writeFile](./commands/files.md#cy-writefile)

### [Cookies](./commands/cookies.md)

- [getCookie](./commands/cookies.md#cy-getcookie)
- [getCookies](./commands/cookies.md#cy-getcookies)
- [setCookie](./commands/cookies.md#cy-setcookie)
- [clearCookie](./commands/cookies.md#cy-clearcookie)
- [clearCookies](./commands/cookies.md#cy-clearcookies)

### [Spies, Stubs & Clocks](./commands/spies-stubs-clocks.md)

- [spy](./commands/spies-stubs-clocks.md#cy-spy)
- [stub](./commands/spies-stubs-clocks.md#cy-stub)
- [clock](./commands/spies-stubs-clocks.md#cy-clock)
- [tick](./commands/spies-stubs-clocks.md#cy-tick)

## Utilities

Utilities give you access to methods from other commonly used libraries.

- [\_](./utilities/index.md#cypress)
- [\$](./utilities/index.md#cypress-2)
- [Blob](./utilities/index.md#cypress-blob)
- [minimatch](./utilities/index.md#cypress-minimatch)
- [Promise](./utilities/index.md#cypress-promise)
- [Minimatch unit tests](./recipes/minimatch-unit-tests.md)

## Cypress API

The Cypress API enables you to configure the behavior of how Cypress works internally. You can do things like access Environment Variables, change configuration, create custom commands, and more.

- [Commands](./cypress-api/index.md#cypress-commands-add)
- [Cookies](./cypress-api/index.md#cypress-cookies-debug)
- [Server](./cypress-api/index.md#cypress-server-default)
- [arch](./cypress-api/index.md#cypress-arch)
- [config](./cypress-api/index.md#cypress-config)
- [dom](./cypress-api/index.md#cypress-dom-ishidden)
- [env](./cypress-api/index.md#cypress-env)
- [platform](./cypress-api/index.md#cypress-platform)
- [version](./cypress-api/index.md#cypress-version)
- [spec](./cypress-api/index.md#cypress-spec)
- [currentTest](./cypress-api/index.md#cypress-currenttest)
- [testingType](./cypress-api/index.md#cypress-testingtype)

## Recipes

### Miscellaneous recipes

- [Confirm the text changes after the click](./recipes/text-changes.md)
- [Confirm the counter is incremented after the click](./recipes/counter-increments.md)
- [Checking the length of the list after adding or deleting an item](./recipes/add-list-item.md)
- [CSS class name examples](./recipes/css-examples.md)
- [Iterate over elements using `.each` command](./recipes/each-example.md)
- [Non-breaking space](recipes/non-breaking-space.md)
- [Set nested property inside the environment object](recipes/set-env-prop.md) when using [Cypress.env](https://on.cypress.io/env)
- [Find elements by exact class or text](recipes/find-by-class-or-text.md)
- [Get the inner text of a list of elements](./recipes/get-text-list.md)
- [Retry-ability examples](./recipes/retry-ability.md)
  - [Count retries](./recipes/retry-ability.md#count-retries)
- [Get multiple fields at once](./recipes/get-multiple-fields.md)
- [Find an object in the array](./recipes/find-object.md)
- [Wait for data](./recipes/wait-for-data.md) to be set
- [Return value from .within() command](./recipes/return-value-from-within.md)
- [Confirm an attribute of an element](./recipes/confirm-attribute.md)
- [Click a single random element](./recipes/click-random-element.md) or multiple checkboxes
- [Number of rows matches a number in an element](./recipes/number-of-rows.md)
- [Find elements with subelements](./recipes/find-elements-with-subelements.md)
- [Confirm the sorted lists](./recipes/sorted-list.md)
  - static list
  - a table is sorted by column
- [Confirm the sorted attributes](./recipes/sorted-attributes.md)
- [Overlapping elements on the page](./recipes/overlapping-elements.md)
- [Search part of the list](./recipes/search-part-of-the-list.md)
- [Add a custom data-... attribute assertion](./recipes/add-data-assertion.md)
- [Pseudo CSS selectors](./recipes/pseudo-selectors.md) like `:link`, `:empty`, `::before`
- [Create long text](./recipes/create-long-text.md) using `Cypress._.repeat` function
- [Detect duplicate values](./recipes/duplicates.md) by text or by attribute
- Save multiple elements under [aliases](./recipes/aliases.md)
- [Type characters one by one into separate input elements](./recipes/type-one-by-one.md)
- [Sibling elements](./recipes/sibling-element.md) using `.next` and CSS selector `+`
- [Collect headings from the page](./recipes/collect-headings.md) and save as a JSON file
- Querying [SVG example](./recipes/svg-example.md)
- [SVG Loader goes away example](./recipes/svg-loader.md)
- Find and confirm the list of [labels for checked checkboxes](./recipes/labels-for-checkboxes.md)
- Confirm the input element [trims spaces](./recipes/input-trims-spaces.md)
- Completely replace `cy.then` command with [`cy.later` command](./recipes/replace-cy-then-command.md)
- Get the [HTML comment DOM node](./recipes/get-html-comment.md)
- Get the data from `<script type='text/plain'>info</script>` [DOM elements](./recipes/get-text-script.md)
- Check if [an image loads](./recipes/image-loaded.md)
- See the [full assertion message](./recipes/see-more-in-assertions.md) without truncated text
- Use the [match assertion](./recipes/match-assertion.md) correctly
- Find elements with the given [computed style](./recipes/computed-style.md)
- Check the results of [multiplication](./recipes/check-multiplication.md) shown on the page
- [Parse numbers](./recipes/parse-numbers.md) in the text
- Get the value of an [input element](./recipes/input-element-value.md)
- Combine two jQuery objects into one in the recipe [combine lists](./recipes/combine-lists.md)
- Confirm the phone number after [replacing all `-` characters](./recipes/replace-all.md)
- Check if [a list contains the given text](./recipes/contains-text-in-list.md)
- [Hide the entered text and intercept the form submission](./recipes/hide-email.md)
- [Get input elements with the given value](./recipes/get-inputs-with-value.md)
- [Check number format](./recipes/check-number-format.md)
- [Be careful with instanceof checks](./recipes/instanceof.md)
- [Empty child elements](./recipes/empty-elements.md) before comparing the text
- [Empty and non-empty elements](./recipes/empty-divs.md) using `:empty` and `:not(:empty)` selectors
- Get the [own text of an element](./recipes/own-text.md)
- Verify the shown price is [within certain dollar range](./recipes/dollar-range.md)
- [Click each item](./recipes/click-each-item.md)
- [Find duplicates](./recipes/find-duplicates.md)
- HTML [Dialog element examples](./recipes/dialog-element.md)
- [Compare two numbers on the page](./recipes/compare-numbers.md)
- [Compare attribute values](./recipes/compare-attribute.md)
- [Change textContent](./recipes/change-text.md)
- [Check element style](./recipes/check-style.md)
- [Keep it simple](./recipes/keep-it-simple.md)
- [Find and Click The Accordion With A Button](./recipes/find-and-click-accordion-button.md)
- [Check meta tags and page title](./recipes/check-meta-tags.md)
- Confirm the [text from the first element is present in the second element](./recipes/text-in-another-element.md)
- Confirm the [input element clears non-number input](./recipes/input-clears-nan.md) within a certain time limit
- Get [the last item of an array](./recipes/last-item.md)
- Cannot [insert new Cypress commands out-of-band](./recipes/chain-of-commands.md)
- Test the [prefers-color-scheme CSS](./recipes/prefers-color-scheme.md)
- Listen to [Cypress events](./recipes/cy-events.md)
- Grab the [second matching element by text](./recipes/second-text-match.md)
- Check the messages the application logs to the `console` object and [fail if there is an error message](./recipes/check-console-logs.md)
- Confirm the two elements have [equal attribute value](./recipes/attributes-are-equal.md)
- [Pick even, odd, or custom index elements](./recipes/filter-elements.md) using jQuery pseudo-classes like `:even`, `:odd`, `eq()`, `gt()`, and `lt()`
- [Input value matching a regular expression](./recipes/input-value.md)
- [Select by attribute](./recipes/select-by-attribute.md) examples
- Check only the [enabled checkboxes](./recipes/check-enabled-checkboxes.md)
- Confirm the [input element has a value](./recipes/input-has-value.md)
- [Array includes another array](./recipes/array-includes-another-array.md)
- Get the element's text [without text from a child element](./recipes/skip-child.md)
- Get Elements [By Attribute That Starts With String X](./recipes/get-attribute-starts.md)
- How to [escape a selector](./recipes/escape-selector.md)
- A few examples of [CSS and jQuery selectors](./recipes/selectors.md)
- Checking if an element has [either of the two attributes](./recipes/or-attributes.md) or certain values of the attribute
- [Remove elements](./recipes/remove-element.md) using jQuery method `.remove`
- Find the next cell [after the active one](./recipes/next-day.md)
- Overwrite the `should` command and [automatically look up the aliased values](./recipes/overwrite-should.md)
- Examples of ["be.empty" assertion](./recipes/empty-assertion.md)
- Find and [parse the price string](./recipes/parse-price.md)
- Find an element with [maximum number inside its text](./recipes/find-max-number.md)
- Check if the loaded number [is positive](./recipes/positive-number.md)
- [Concatenate text extracted from the page](./recipes/concat-labels.md) while avoiding the pyramid of Doom of callbacks
- stub the [`Date.prototype.getTimezoneOffset` method](./recipes/stub-get-timezone-method.md)
- remove optional child elements before [checking sorted prices](./recipes/sorted-by-discount.md)
- checking a number [input value as a number](./recipes/input-value-as-number.md)
- [paste text into a text area](./recipes/paste-event.md)
- [pick a random 10 digit number](./recipes/pick-random-number.md) that does not have 0 in front
- collect the values from the [DOM using its structure](./recipes/collect-dom.md)
- element is removed from the DOM vs element hides [recipe](./recipes/element-hides.md)
- check the parsed [JSON HTML attribute](./recipes/json-data-attribute.md)
- check the [copyright year](./recipes/copyright-year.md)
- confirm the element's text [ends with two decimals](./recipes/decimals.md)
- waiting for the button to be [enabled before clicking](./recipes/disabled-button.md)
- confirm the [cursor position in the text area](./recipes/text-area-cursor.md)
- verify the phone number string using a [strict regular expression](./recipes/phone-number.md)
- debug [failing cy.get and cy.contains commands](./recipes/debug-cy-get-contains.md)
- check that [each element is visible](./recipes/all-elements-are-visible.md)
- checking the [enabled status of multiple elements](./recipes/enabled-elements.md)
- CSS selector [nth-child examples](./recipes/nth-child.md)
- clear the input field without [race condition with the app](./recipes/clear-input-flake.md)
- [List item with text tag](./recipes/list-item-with-text-tag.md) recipe shows `:has` and `:contains` selectors
- get and set the [attribute value for multiple elements](./recipes/element-attributes.md) using jQuery `attr` and HTML DOM `getAttribute` methos
- checking element's [visibility in 3 different ways](./recipes/is-visible.md)
- checking the input element is a [password input](./recipes/password-is-hidden.md)
- confirm the text [CSS color](./recipes/color.md)
- combine [negative with positive assertions](./recipes/negative-assertions.md)
- accessing `data-*` properties via the [HTML `dataset` property](./recipes/dataset.md)
- lesser known [Chai assertions](./recipes/lesser-known-chai-assertions.md)
- compute SHA-256 from [element's HTML](./recipes/sha-256.md)
- [wrap and wait for promises to resolve](./recipes/wrap-promises.md)
- using [Menu page object](./recipes/menu-page-object.md)
- use different selectors depending on the [Bootstrap version](./recipes/bootstrap-version.md)
- confirm the same text on the page in [two or more places](./recipes/same-text.md)
- get the [sum of numbers](./recipes/sum-of-numbers.md) avoiding pyramid of Doom
- build-in [existence assertion](./recipes/existence-assertion.md)
- [cy.contains and regular expressions](./recipes/contains-regular-expression.md)
- check the [first N checkboxes](./recipes/check-n-boxes.md)
- store intermediate values using [should callback](./recipes/store-values-using-should.md)
- confirm the event handler was [triggered just once](./recipes/event-sent-once.md)
- count [each number](./recipes/count-each-number.md) after clicking a button
- checking [element overflow](./recipes/overflow.md)
- confirm [each element text](./recipes/each-text.md) starts with the given string
- find all table cells that start with "CA" and parse and [sum prices](./recipes/sum-prices.md).
- [remove digits and whitespace](./recipes/remove-numbers.md) from each element's text
- [iterate](./recipes/iterate.md) over DOM elements using Cypress and `cypress-map` commands
- dispatch [custom events](./recipes/custom-events.md)
- catch any [extra elements](./recipes/no-extras.md) appearing between the expected states
- [validate email](./recipes/validate-email.md) using an input element
- check the [number of elements](./recipes/number-of-elements.md) various scenarios
- CSS selectors `:last-of-type` and `:first-of-type` [example](./recipes/last-of-type.md)
- [cy.within does not retry](./recipes/within-does-not-retry.md)

### Working with the window object

- [Checking a dynamic property added to the `window` object](./recipes/window-property.md)
- Controlling the [window.confirm](./recipes/window-confirm.md) dialog
- Stub the `window.print` method [recipe](./recipes/stub-window-print.md)
- Stub the `window.open` method [recipe](./recipes/window-open.md)
- Testing the `mailto` [HREF anchor links](./recipes/mailto-link.md)

### Selecting an option

- [Select value from an `optgroup` element](./recipes/optgroup.md)
- [Select an item by partial text match](./recipes/select-by-index.md)
- [Assert the selected value or multiple values](recipes/selected-value.md) in a `<select>` element
- [Select an item by id](./recipes/select-value-by-id.md)
- [Select an invalid option](./recipes/select-invalid-option.md) to reach the error-handling case

### Working with forms

- [Get input element by its label](recipes/form-input-by-label.md) by writing a custom command
- Confirm the values entered in the [input elements in a form](./recipes/form-values.md)
- [Form input validation](./recipes/form-validation.md)
- Set [multiple form inputs at once](./recipes/set-form-inputs.md)
- [jQuery form serializeArray method](./recipes/form-serialize-array.md)
- [Map input fields to values](./recipes/map-input-values.md)
- [Hide Input Fields Before Taking A Screenshot](./recipes/hide-input-fields.md)

### Cypress secrets

- [Conditional testing](./recipes/conditional-testing.md)
- Avoid "Mixing async and sync code" by controlling the [value the code yields](./recipes/yield-value.md)

### Working with network

- [Request a specific comment](./recipes/request-a-comment.md) using an ID read from the page
- Simulate [Network errors](./recipes/network-errors.md) recipe
- Refactor [Requested resource not found](./recipes/request-not-found.md) code into an utility function
- Send synthetic "offline" and "online" [events](./recipes/offline-event.md)

### Spies and stubs

- confirm the spy was called [with the right object](./recipes/called-with-object.md)
- [Stub Geolocation](./recipes/stub-geolocation.md) to test error handling
- [Stub called with the match](./recipes/stub-called-with-match.md)
- [Stub calls depending on the arguments](./recipes/stub-call-through.md)
- [Prepare to spy](./recipes/prepare-to-spy.md)

### Testing tables

- [Confirm the column index](./recipes/table-cell-index.md)
- [Update table row with retries](./recipes/table-update.md)
- [Table with prices](./recipes/table-with-prices.md) confirms the prices in every table row.
- Check the [table has some columns](./recipes/table-column-order.md) in the expected order
- Find the table row with the [exact table cell text](./recipes/table-cell.md)
- Find the table row [having cells with an attribute](./recipes/has-rows.md)
- Select a table [cell by the column heading](./recipes/table-cell-by-column-heading.md)
- read a value from a table cell and [enter it into a field](./recipes/enter-value.md)
- pick the [first table column of the second table](./recipes/first-column.md)
- find the [table row index with the given text](./recipes/find-row.md)
- [Table has row with randomly picked id](./recipes/has-row.md)

📝 Read the blog post [Test HTML Tables Using cy.table Query Command](https://glebbahmutov.com/blog/cy-table/).

Some of the recipes use [cypress-map](https://github.com/bahmutov/cypress-map) queries to show a better solution to the same exercise.

## Courses

I have several Cypress courses at [cypress.tips/courses](https://cypress.tips/courses)

- I cover the very basics of E2E and Component testing in my free course [Cypress Version 10: Fundamentals](https://cypress.tips/courses)
- You can fully learn E2E and React Component testing in my hands-on course [Testing The Swag Store](https://cypress.tips/courses/swag-store)
- Interested in learning more about `cy.intercept`, `cy.request`, and the related commands? Take my [Cypress Network Testing Exercises](https://cypress.tips/courses) course
- Need to step up your tests and take advantages of the [many Cypress plugins](https://on.cypress.io/plugins)? Take my course [Cypress Plugins](https://cypress.tips/courses/cypress-plugins) that covers 20+ plugins (I wrote most of them)

## Videos

Some of the examples and the recipes listed here are explained through short videos I post on my [YouTube channel](https://www.youtube.com/glebbahmutov). The playlist [Cypress Tips & Tricks](https://www.youtube.com/playlist?list=PLP9o9QNnQuAYYRpJzDNWpeuOVTwxmIxcI) has 600+ videos! You can search them all from my page [cypress.tips/search](https://cypress.tips/search).

## The newsletter

Every month I write and send a newsletter [Cypress Tips & Tricks](https://cypresstips.substack.com/) with a few main news and learning resources. You can subscribe, it is absolutely free.
