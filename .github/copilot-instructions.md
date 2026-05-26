# General instructions

This project uses Cypress end-to-end testing tool to run individual tests in the browser. The input files are Markdown and each HTML + JavaScript code snippet is called a "fiddle".

## Instructions for fixing failed tests

When proposing a fix for a failed Cypress test, first match the error message to one of the following categories of errors. If found a close match, report its title and apply the fix. If nothing closely matches, propose a new solution. Only propose changes to the single failed test file.

### Wrong list contents

Error message: Timed out retrying after <n>ms: expected <list A> to read <list B>

Fix: replace the expected list with the actual list. For example, if the error message is "expected ['Kiwi'] to read ['Apple']", change the expected list to ['Kiwi'].
