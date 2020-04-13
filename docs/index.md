---
sidebar: false
---

# Cypress Examples

> Static site with Cypress examples tested right from the Markdown sources

## Commands

Commands drive your tests in the browser like a real user would. They let you perform actions like typing, clicking, xhr requests, and can also assert things like "my button should be disabled".

- [Querying](./commands/querying.md)
  - [get](./commands/querying.md#cy-get)
  - [contains](./commands/querying.md#cy-contains)
  - [within](./commands/querying.md#within)
  - [root](./commands/querying.md#root)
  - [Best Practices: Selecting elements](./commands/querying.md#best-practices-selecting-elements)
- [Traversal](./commands/traversal.md)
  - [children](./commands/traversal.md#children)
  - [closest](./commands/traversal.md#closest)
  - [eq](./commands/traversal.md#eq)
  - [filter](./commands/traversal.md#filter)
  - [find](./commands/traversal.md#find)
  - [first](./commands/traversal.md#first)
  - [last](./commands/traversal.md#last)
- [Actions](./commands/actions.md)
  - [type](./commands/actions.md#type)
  - [focus](./commands/actions.md#focus)
- [Connectors](./commands/connectors.md)
  - [then](./commands/connectors.md#then)

## Utilities

Utilities give you access to methods from other commonly used libraries.

- [\_](./utilities/index.md#cypress)
- [\$](./utilities/index.md#cypress-2)
- [Blob](./utilities/index.md#cypress-blob)
- [minimatch](./utilities/index.md#cypress-minimatch)
- [moment](./utilities/index.md#cypress-moment)
- [Promise](./utilities/index.md#cypress-promise)

## Cypress API

The Cypress API enables you to configure the behavior of how Cypress works internally. You can do things like access Environment Variables, change configuration, create custom commands, and more.

- [Commands](./cypress-api/index.md#cypress-commands-add)
- [Cookies](./cypress-api/index.md#cypress-cookies-debug)
- [Server](./cypress-api/index.md#cypress-server-default)
- [arch](./cypress-api/index.md#cypress-arch)
