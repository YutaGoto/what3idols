#!/bin/bash

echo $VERCEL_GIT_COMMIT_REF

# Does the branch name start with "dependabot/"
if [[ "$VERCEL_GIT_COMMIT_REF" =~ ^(dependabot)/.*$ ]] ; then
  echo "Skipping deploy!"
  exit 0;
else
  echo "Proceeding with deploy."
  exit 1;
fi
