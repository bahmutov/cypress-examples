# Stub calls depending on the arguments

Cypress bundled [Sinon.js](https://sinonjs.org/) that allows one to stub method calls depending on the argument. Here are a few examples, for more see the [Spies, Stubs & Clocks](../commands/spies-stubs-clocks.md).

## Stub all calls

<!-- fiddle stub all calls -->

Imagine we have an object with the method `x` that doubles any value given to it.

```js
const doubler = {
  double(x) {
    return x + x
  },
}
```

We can test its actual behavior

```js
expect(doubler.double(10), '10 x2').to.equal(20)
```

We can stub the method and any call would return the same mocked value

```js
cy.stub(doubler, 'double').returns(42)
expect(doubler.double(10), '10 x2').to.equal(42)
expect(doubler.double('fun'), 'fun x2').to.equal(42)
```

We can confirm the number of times the stubbed method was called

```js
expect(doubler.double).to.have.been.calledTwice
```

And we can confirm the call arguments

```js
expect(doubler.double).to.have.been.calledWith(10)
expect(doubler.double).to.have.been.calledWith('fun')
// an example of a negative assertion
expect(doubler.double).to.not.have.been.calledWith(-5)
```

We can reset the call history

```js
doubler.double.resetHistory()
expect(doubler.double).to.not.be.called
expect(doubler.double(3)).to.equal(42)
expect(doubler.double).to.have.been.calledOnce
```

We can restore the default method behavior

```js
doubler.double.restore()
expect(doubler.double('fun')).to.equal('funfun')
```

<!-- fiddle-end -->

## Stub calls by order

We can respond differently to different method calls. For example, we can return 1 on the first call, 2 on the second

<!-- fiddle stub calls by order -->

```js
const doubler = {
  double(x) {
    return x + x
  },
}

cy.stub(doubler, 'double')
  .onFirstCall()
  .returns(1)
  .onSecondCall()
  .returns(2)
```

```js
expect(doubler.double('first')).to.equal(1)
expect(doubler.double('second')).to.equal(2)
expect(doubler.double).to.have.been.calledTwice
```

All unspecified calls will get `undefined` result

```js
expect(doubler.double('third')).to.equal(undefined)
```

<!-- fiddle-end -->

## Stub plus callThrough

If you want to stub some calls, but call the original method for all other calls, use `callThrough`

<!-- fiddle stub calls by order plus callThrough -->

```js
const doubler = {
  double(x) {
    return x + x
  },
}

cy.stub(doubler, 'double')
  .callThrough()
  .onFirstCall()
  .returns(1)
  .onSecondCall()
  .returns(2)
```

```js
expect(doubler.double('first')).to.equal(1)
expect(doubler.double('second')).to.equal(2)
expect(doubler.double).to.have.been.calledTwice
```

All calls after the first two execute the original `doubler.double` method

```js
expect(doubler.double('third')).to.equal('thirdthird')
expect(doubler.double(4)).to.equal(8)
```

<!-- fiddle-end -->

## Stub by specific argument value

You can returns different mocked responses based on the specific value of the arguments.

<!-- fiddle stub calls by the argument value -->

```js
const doubler = {
  double(x) {
    return x + x
  },
}

cy.stub(doubler, 'double')
  .withArgs('first')
  .returns('11')
  .withArgs('second')
  .returns('22')
```

To add other stub behaviors take the stubbed method and use Sinon helpers.

```js
expect(doubler.double('first')).to.equal('11')
expect(doubler.double('second')).to.equal('22')
expect(doubler.double('first')).to.equal('11')
expect(doubler.double).to.have.been.calledThrice
```

All other called get `undefined`

```js
expect(doubler.double(4)).to.equal(undefined)
```

If you want to call the original method for all unmatched arguments, use `callThrough()`

<!-- fiddle-end -->

## Stub by type of the argument

<!-- fiddle stub calls by the argument type -->

```js
const doubler = {
  double(x) {
    return x + x
  },
}

cy.stub(doubler, 'double')
  .withArgs(Cypress.sinon.match.number)
  .returns(42)
  .withArgs(Cypress.sinon.match.string)
  .returns('hello')
```

All other called get `undefined`

```js
expect(doubler.double('first')).to.equal('hello')
expect(doubler.double(3)).to.equal(42)
expect(doubler.double(true)).to.equal(undefined)
expect(doubler.double).to.have.been.calledThrice
```

<!-- fiddle-end -->

## Stub by your own predicate

Unfortunately, seems in Cypress v12 the Sinon version has broken `withArgs(sinon.match(predicate))` feature. Thus the following test should work, but does not

<!-- fiddle.skip stub calls where argument matches your predicate -->

```js
const doubler = {
  double(x) {
    return x + x
  },
}
```

Let's only stub even number arguments.

```js
const isEven = (n) => n % 2 === 0

cy.stub(doubler, 'double')
  .withArgs(Cypress.sinon.match(isEven, 'even'))
  .returns(42)
  // all other calls go to the original method
  .callThrough()
```

```js
expect(doubler.double('first')).to.equal('firstfirst') // original method
expect(doubler.double(3)).to.equal(42)
```

<!-- fiddle-end -->

**Note:** while stubbing with the predicate match might be broken, the assertion `calledWithMatch` is working, see the recipe [Stub called with the match](./stub-called-with-match.md).
