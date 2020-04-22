#!/bin/bash

# converts Markdown fiddle specs into JavaScript specs
BASE_URL=$1
if [ -z $BASE_URL ]
then
  echo "Provide base url, please"
  script=`basename "$0"`
  echo "For example: $script http://localhost:5000/cypress-examples"
  exit 1
fi

echo "Each spec file will visit $BASE_URL before tests in each spec"
npx export-fiddle docs/commands/actions.md --before $BASE_URL/commands/actions
npx export-fiddle docs/commands/connectors.md --before $BASE_URL/commands/connectors
npx export-fiddle docs/commands/querying.md --before $BASE_URL/commands/querying
npx export-fiddle docs/commands/traversal.md --before $BASE_URL/commands/traversal
npx export-fiddle docs/cypress-api/index.md --before $BASE_URL/cypress-api
npx export-fiddle docs/utilities/index.md --before $BASE_URL/utilities

ls -laR docs/**/*.js
