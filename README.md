# @bahmutov/cypress-examples [![ci status][ci image]][ci url] [![prettier status][prettier image]][prettier url] [![deployed status][deployed image]][deployed url] [![renovate-app badge][renovate-badge]][renovate-app] ![cypress version](https://img.shields.io/badge/cypress-5.5.0-brightgreen)

> Static site with Cypress examples tested right from the Markdown sources

Live site [glebbahmutov.com/cypress-examples/](https://glebbahmutov.com/cypress-examples/)

## Benefits

- single source of truth for tests and HTML pages. No more copy / pasting
  - Cypress runs tests using Markdown source files via [cypress-fiddle](https://github.com/cypress-io/cypress-fiddle)
- great development experience with live reload and optimized static build thanks to [Vuepress][vuepress] and Prettier formatting
- JavaScript specs are extracted and published as NPM package `@bahmutov/cypress-examples` after testing against the deployed site and then published to NPM under `@bahmutov/cypress-examples`
- excellent text and code comment search thanks to Algolia
  - [Scrape Static Site with Algolia](https://glebbahmutov.com/blog/scrape-static-site-with-algolia/) blog post
  - scrape happens after deploying the docs to GitHub Pages in [.github/workflows/deployed.yml](.github/workflows/deployed.yml) workflow

## Notes

- use "function" syntax in `<script>` tags that need to be live, otherwise Markdown escapes `=>` arrows?!

## Try published specs

You can run the exported spec files.

- Start a new project or use an existing project, and add this module as a dev dependency

```shell
$ npm i -D @bahmutov/cypress-examples
```

- Open or run Cypress and point at the folder inside `node_modules`

```shell
$ npx cypress open --project node_modules/\@bahmutov/cypress-examples/
```

![Spec running](images/specs.png)

## Still to do

- deploy to GitHub pages under a version
  - need to avoid breaking existing published versions

[ci image]: https://github.com/bahmutov/cypress-examples/workflows/ci/badge.svg?branch=master
[ci url]: https://github.com/bahmutov/cypress-examples/actions?query=workflow%3Aci
[prettier image]: https://github.com/bahmutov/cypress-examples/workflows/prettier/badge.svg?branch=master
[prettier url]: https://github.com/bahmutov/cypress-examples/actions?query=workflow%3Aprettier
[deployed image]: https://github.com/bahmutov/cypress-examples/workflows/deployed/badge.svg?branch=master
[deployed url]: https://github.com/bahmutov/cypress-examples/actions?query=workflow%3Adeployed
[vuepress]: https://vuepress.vuejs.org/
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
