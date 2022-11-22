#!/usr/bin/env sh

# abort errors
set -e

# build
npm run build

cp ./404.html dist

cd dist

echo > .nojekyll

git init
git checkout -B main
git add -A
git commit -m 'deploy'

git push -f git@github.com:LuizPelegrini/pomobreak.git main:gh-pages

cd -
