# Selectors

In Cypress you can get (query) elements by CSS and jQuery selectors. Watch the video [Css And jQuery Selectors In Cypress](https://youtu.be/iQFBKIjAwIM) to see these examples in action.

## Select by id

<!-- fiddle Select an element by id -->

```html
<div id="person">Joe</div>
```

```js
cy.get('#person').should('have.text', 'Joe')
// cy.contains also lets you specify a selector
cy.contains('#person', 'Joe')
```

<!-- fiddle-end -->

## Combine selectors

You can combine selectors, for example to find all elements with class "person" AND class "student", list them together without spaces.

<!-- fiddle Select elements with both classes -->

```html
<div class="person">Joe</div>
<div class="person student">Mary</div>
```

```js
// select any elements that have class "person"
cy.get('.person').should('have.length', 2)
// select any elements that have class "person" AND class "student"
cy.get('.person.student').should('have.text', 'Mary')
```

<!-- fiddle-end -->

## Combine class and attributes

You can select an element by combining ids, class names, attributes. For example, let's find all elements with class name "person" AND data attribute group equal to "a1":

<!-- fiddle Select elements by combination of classes and attributes -->

```html
<div class="person">Joe</div>
<div class="person student">Mary</div>
<div class="person student" data-group="a1">Ann</div>
```

```js
cy.get('.person[data-group="a1"]')
  .should('have.text', 'Ann')
  .and('have.class', 'student')
```

<!-- fiddle-end -->

## Hierarchy

Sometimes you want to find an element inside another element. In this case, separate the selectors using spaces. For example, to find the students somewhere inside the group "b2" we can use:

<!-- fiddle Select elements by hierarchy -->

```html
<ul data-group="a1">
  <li class="student">Joe</li>
</ul>
<ul data-group="b2">
  <li class="student">Mary</li>
  <li class="student" data-rank="junior">Ann</li>
</ul>
```

```js
cy.get('[data-group="b2"] .student')
  .should('have.length', 2)
  // let's find all junior students
  // using https://on.cypress.io/filter
  .filter('[data-rank="junior"]')
  .should('have.text', 'Ann')
```

<!-- fiddle-end -->

## partial attributes

We might not know the precise attribute value, but we can use the selectors `name^=value` to select by the prefix, `name*=value` to select by substring, and `name$=value` to select by the suffix

<!-- fiddle Partial attribute -->

```html
<div data-id="ABC-student-123">Mary</div>
<div data-id="ABC-student-456">Ann</div>
<div data-id="XYZ-student-789">Joe</div>
```

Let's select all `DIV` elements with the `data-id` attribute starting with the string "ABC-"

```js
cy.get('div[data-id^="ABC-"]').should('have.length', 2)
```

Let's select all `DIV` elements with the `data-id` attribute having the string "student" somewhere

```js
cy.get('div[data-id*="student"]').should('have.length', 3)
```

Let's select all `DIV` elements with the `data-id` attribute ending with `-456`

```js
cy.get('div[data-id$="-456"]').should('have.text', 'Ann')
```

<!-- fiddle-end -->

## partial class name

<!-- fiddle Partial class name -->

```html
<ul class="students">
  <li class="student-1">Mary</li>
  <li class="student-2">Ann</li>
  <li class="student-3">Joe</li>
</ul>
```

Inside the element with class "students", let's find all children that have classes "student-..." prefix. We can treat the class as simply another attribute and use the selector `[class=...]`.

```js
cy.get('.students [class^=student-]').should('have.length', 3)
```

If we don't know the prefix or suffix, we can simply use partial text match

```js
cy.get('.students [class*=student-]').should('have.length', 3)
```

Let's select all students that end with `-3` class name

```js
cy.get('.students [class$="-3"]').should('have.text', 'Joe')
```

<!-- fiddle-end -->

## jQuery selectors

jQuery selectors extend the CSS selectors with some powerful features. For example, to find _visible_ elements, we can use `:visible` jQuery selector. Similarly, there is `:hidden` jQuery selector.

<!-- fiddle Select visible or hidden elements using jQuery -->

```html
<ul class="university">
  <li class="student" style="display:none">Joe</li>
  <li class="student">Mary</li>
  <li class="student">Ann</li>
</ul>
```

```js
// select using hierarchy of classes
cy.get('.university .student').should('have.length', 3)
// select only the visible student elements
cy.get('.university .student:visible').should('have.length', 2)
// select only the hidden elements
cy.get('.university .student:hidden')
  .should('have.length', 1)
  .and('have.text', 'Joe')
  .and('have.css', 'display', 'none')
```

<!-- fiddle-end -->
