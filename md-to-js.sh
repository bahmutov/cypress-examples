#!/bin/bash

# converts Markdown fiddle specs into JavaScript specs
BASE_URL=$1
if [ -z $BASE_URL ]
then
  echo "Setting empty BASE_URL to http://localhost:5000/cypress-examples"
  BASE_URL=http://localhost:5000/cypress-examples
fi

echo "Each spec file will visit $BASE_URL before tests in each spec"
npx export-fiddle docs/commands/actions.md --before $BASE_URL/commands/actions
npx export-fiddle docs/commands/aliasing.md --before $BASE_URL/commands/aliasing
npx export-fiddle docs/commands/cookies.md --before $BASE_URL/commands/cookies
npx export-fiddle docs/commands/connectors.md --before $BASE_URL/commands/connectors
npx export-fiddle docs/commands/files.md --before $BASE_URL/commands/files
npx export-fiddle docs/commands/misc.md --before $BASE_URL/commands/misc
npx export-fiddle docs/commands/navigation.md --before $BASE_URL
npx export-fiddle docs/commands/querying.md --before $BASE_URL/commands/querying
npx export-fiddle docs/commands/spies_stubs_clocks.md --before $BASE_URL/commands/spies_stubs_clocks
npx export-fiddle docs/commands/traversal.md --before $BASE_URL/commands/traversal
npx export-fiddle docs/commands/waiting.md --before $BASE_URL/commands/waiting
npx export-fiddle docs/commands/window.md --before $BASE_URL/commands/window
npx export-fiddle docs/cypress-api/index.md --before $BASE_URL/cypress-api
npx export-fiddle docs/utilities/index.md --before $BASE_URL/utilities

ls -laR docs/**/*.js

echo "You can run these specs against $BASE_URL with command"
echo "npx cypress open --config-file cypress-dist.json"
