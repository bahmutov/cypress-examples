# cypress-examples [![ci status][ci image]][ci url] [![prettier status][prettier image]][prettier url] [![deployed status][deployed image]][deployed url]

> Static site with Cypress examples tested right from the Markdown sources

Live site [glebbahmutov.com/cypress-examples/](https://glebbahmutov.com/cypress-examples/)

## Benefits

- single source of truth for tests and HTML pages. No more copy / pasting
  - Cypress runs tests using Markdown source files via [cypress-fiddle](https://github.com/cypress-io/cypress-fiddle)
- great development experience with live reload and optimized static build thanks to [Vuepress][vuepress] and Prettier formatting
- excellent text and code comment search thanks to Algolia
  - [Scrape Static Site with Algolia](https://glebbahmutov.com/blog/scrape-static-site-with-algolia/) blog post
  - scrape happens after deploying the docs to GitHub Pages in [.github/workflows/deployed.yml](.github/workflows/deployed.yml) workflow

## Notes

- use "function" syntax in `<script>` tags that need to be live, otherwise Markdown escapes `=>` arrows?!

## Still to do

- generate output spec files to be published to NPM as [cypress-example-kitchensink](https://github.com/cypress-io/cypress-example-kitchensink#readme) [#3](https://github.com/bahmutov/cypress-examples/issues/3) is blocked by [#89](https://github.com/cypress-io/cypress-fiddle/issues/89)
- ✅ need to figure out better styles for live HTML [#4](https://github.com/bahmutov/cypress-examples/issues/4)
- deploy to GitHub pages under a version
  - need to avoid breaking existing published versions

[ci image]: https://github.com/bahmutov/cypress-examples/workflows/ci/badge.svg?branch=master
[ci url]: https://github.com/bahmutov/cypress-examples/actions?query=workflow%3Aci
[prettier image]: https://github.com/bahmutov/cypress-examples/workflows/prettier/badge.svg?branch=master
[prettier url]: https://github.com/bahmutov/cypress-examples/actions?query=workflow%3Aprettier
[deployed image]: https://github.com/bahmutov/cypress-examples/workflows/deployed/badge.svg?branch=master
[deployed url]: https://github.com/bahmutov/cypress-examples/actions?query=workflow%3Adeployed
[vuepress]: https://vuepress.vuejs.org/
