#!/usr/bin/env sh

# abort errors
set -e

# build
npm run build

cd dist

git init
git checkout -B main
git add -A
git commit -m 'deploy'

git push -f git@github.com:LuizPelegrini/pomobreak.git main:gh-pages

cd -
