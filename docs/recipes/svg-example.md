# SVG Example

<!-- fiddle Select elements in SVG -->

The SVG below comes from [Wikimedia](https://commons.wikimedia.org/wiki/Category:SVG_logos).

```html
<!--
  Author: Yves Baelde
  Aspect ratio  1/1
-->
<svg
  pointer-events="none"
  viewBox="-9 -9 444 444"
  width="90"
  height="90"
  xmlns="http://www.w3.org/2000/svg"
  xml:space="preserve"
  preserveAspectRatio="xMinYMin"
  zoomAndPan="disable"
>
  <path
    d="M0 370q0 56 56 56h314q56 0 56-56V56q0-56-56-56H56q-56 0-56 56"
    fill="#f70"
  />
  <path
    fill="none"
    stroke="#024"
    stroke-width="21"
    stroke-linejoin="bevel"
    d="m154 70-74 276 276-74zm101 101-138 37 101 101z"
  />
</svg>
```

```js
// get the SVG element, just like any DOM element
cy.get('svg')
  .should('have.attr', 'width', '90')
  .and('have.attr', 'height', '90')
  // yields the original SVG element
  // after confirming its attributes, find
  // the child <path fill="none"> element
  // and confirm its attributes
  .find('path[fill=none]')
  .should('have.attr', 'stroke-linejoin', 'bevel')
  .wait(1000) // for clarity
  // change the color of the sibling "path" before it
  .prev()
  .invoke('attr', 'fill', 'red')
```

Watch the video "[Querying SVG From A Cypress Test](https://youtu.be/liFRu0Fu-Gs)".

<!-- fiddle-end -->
