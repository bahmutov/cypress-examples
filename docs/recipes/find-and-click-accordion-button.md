# Find and click the accordion with a button

<!-- fiddle Find and click the accordion with a button -->

```html
<style>
  .accordion {
    background-color: #eee;
    color: #444;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
    transition: 0.4s;
  }

  .active,
  .accordion:hover {
    background-color: #ccc;
  }

  .panel {
    padding: 0 18px;
    display: none;
    background-color: white;
    overflow: hidden;
  }
</style>
<h2>Accordion</h2>
<button class="accordion">Section 1</button>
<div class="panel">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
    do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
    ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
</div>
<button class="accordion">Section 2</button>
<div class="panel">
  <button onclick="javascript:alert('Clicked!')">
    I'm here
  </button>
</div>
<button class="accordion">Section 3</button>
<div class="panel">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
    do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
    ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
</div>
<script>
  var acc = document.getElementsByClassName('accordion')
  var i

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function () {
      this.classList.toggle('active')
      var panel = this.nextElementSibling
      if (panel.style.display === 'block') {
        panel.style.display = 'none'
      } else {
        panel.style.display = 'block'
      }
    })
  }
</script>
```

```js
cy.get('.panel:has("button")')
  .prev()
  .should('have.class', 'accordion')
  .click()
cy.window().then((win) => cy.stub(win, 'alert').as('alert'))
cy.contains('button', "I'm here").should('be.visible').click()
cy.get('@alert').should('have.been.calledOnceWith', 'Clicked!')
```

Watch the video [Find And Click An Accordion With A Button](https://youtu.be/U6oqiu12rfg).

<!-- fiddle-end -->
