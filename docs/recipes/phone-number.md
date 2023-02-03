# Phone number

Imagine you are validating a phone number, and we know the number will be in the format `123-XXX-XXXX`. Here are a couple of alternatives.

<!-- fiddle Phone number -->

```js
const phoneNumber = '123-760-9001'
```

We can check if the phone number is a string with length 12.

```js
expect(phoneNumber, '12 chars')
  .to.be.a('string')
  .and.to.have.length(12)
```

Unfortunately, the assertion is way too forgiving.

```js
expect('WRONG PHONE!', 'also has 12 chars')
  .to.be.a('string')
  .and.to.have.length(12)
```

Maybe we need to use a regular expression. We know the phone number can only contain digits and `-` characters. Let's use the `match(regex)` assertion. Plus we can use `^` and `$` characters to make sure we match the entire string.

```js
expect(phoneNumber, 'digits and -').to.match(/^[\d-]{12}$/)
```

Ok, this looks better, but it still allows for some funny values.

```js
expect('------------', 'just -').to.match(/^[\d-]{12}$/)
expect('0-0-0-0-0-0-', 'caterpillar').to.match(/^[\d-]{12}$/)
expect('123456789012', 'wrong number of digits').to.match(
  /[\d-]{12}/,
)
```

**My advice** write the strictest regular expression possible enforcing the _type_ and _position_ of each character class. In our case it is the following regular expression:

```js
const phoneRegex = /^\d\d\d-\d\d\d-\d\d\d\d$/
expect(phoneNumber, 'phone #').to.match(phoneRegex)
```

If you want, you can write it differently:

```js skip
const phoneRegex = /^\d{3}-\d{3}-\d{4}$/
```

All previous funny inputs fail our strict regular expression.

```js
expect('WRONG PHONE!', 'also has 12 chars').to.not.match(
  phoneRegex,
)
expect('------------', 'just -').to.not.match(phoneRegex)
expect('0-0-0-0-0-0-', 'caterpillar').to.not.match(phoneRegex)
expect('123456789012', 'wrong number of digits').to.not.match(
  phoneRegex,
)
```

<!-- fiddle-end -->
