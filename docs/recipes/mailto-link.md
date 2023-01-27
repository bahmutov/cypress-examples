# Mailto HREF link

<!-- fiddle Test HREF mailto link -->

```html
<a
  id="send"
  href="mailto:nowhere@mozilla.org?subject=The%20subject%20of%20the%20email&body=The%20body%20of%20the%20email"
  >Send an email</a
>
```

Let's use this utility function to parse `mailto:...` string

```js
// string parameter s is like "mailto:...?param1=...&param2=..."
// where each parameter is URL-encoded
function parseMailto(s) {
  const [start, params] = s.split('?')
  const recipient = start.split(':')[1]
  const result = { recipient }
  params.split('&').forEach((param) => {
    const [key, encoded] = param.split('=')
    result[key] = decodeURIComponent(encoded)
  })
  return result
}
```

We cannot click on the link, since in most cases it will launch an external application registered with the operating system that handles sending an email (like Outlook).

```js skip
// 🚨 DOES NOT WORK, THE TEST WILL HANG
cy.get('a#send').click()
```

Instead, trust the operating system and the email standards. If the `mailto` link is correct, the browser and your email program should work with it. The test can confirm the `<A>` HREF attribute is present, parse the attribute value, and confirm each parameter of the email to send has the expected value.

```js
cy.get('a#send')
  .should('have.attr', 'href')
  // yields the value of the "href" attribute
  .should('match', /^mailto:/)
  // parse the URL into recipient, subject, body fields
  .then(parseMailto)
  .should('deep.equal', {
    recipient: 'nowhere@mozilla.org',
    subject: 'The subject of the email',
    body: 'The body of the email',
  })
```

<!-- fiddle-end -->
